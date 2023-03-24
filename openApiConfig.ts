import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * @see https://platform.openai.com/docs/api-reference/completions/create?lang=node.js
 */
export const openai = new OpenAIApi(configuration);
