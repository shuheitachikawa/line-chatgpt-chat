const { Configuration, OpenAIApi } = require("openai");

/** OPEN AIのAPI叩く(createCompletion)
 * @param inputText 入力テキスト
 * @returns 返答テキスト
 * @see https://platform.openai.com/docs/api-reference/completions/create?lang=node.js
 */
export const createCompletionResponse = async (
  inputText: string
): Promise<string> => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const { data } = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: inputText,
    max_tokens: 1000,
    temperature: 0,
  });

  return data.choices[0].text.trim();
};
