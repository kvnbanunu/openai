import OpenAI from 'openai';
import dotenv from 'dotenv/config';

export const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});
