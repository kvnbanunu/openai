import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { openai } from './modules/openai.js';
import { validatePrompt } from './modules/joi.js';

const app = express();

app.use(cors({
    origin: ['https://kvnbanunu.github.io', 'https://4537api.banunu.dev'],
    methods: 'POST',
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/obfuscate', async (req, res) => {
    let prompt = req.body.prompt;

    if (!validatePrompt(prompt)) {
        res.status(400).json({ error: 'Validation Error' });
        return;
    }
    prompt += '. Also make this code as humanly unreadable as possible. Remove any whitespace if when removed, the program still runs properly. Also respond with only the code and no other messages.'

    try {
        const result = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a developer who only writes obfuscated code" },
                { role: "user", content: prompt },
            ],
        });
        res.status(200).json({output: result.choices[0].message.content});
    } catch (error) {
        console.error("Error with OpenAI API:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(process.env.PORT);
