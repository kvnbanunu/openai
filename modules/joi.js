import Joi from "joi";

export function validatePrompt(str) {
    const result = Joi.string().alphanum().min(1).max(100).validate(str);

    if (result.error) {
        return false;
    }
    return true;
}
