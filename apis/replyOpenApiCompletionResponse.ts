import { lineClient } from "../lineClient";
import { openai } from "../openApiConfig";

/** OPEN AIのAPI叩く(createCompletion)
 * @param inputText 入力テキスト
 * @returns 返答テキスト
 */
const openApiCompletionResponse = async (
  inputText: string
): Promise<string> => {
  const { data } = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: inputText,
    max_tokens: 1000,
    temperature: 0,
  });

  return (data.choices[0].text || "").trim();
};

/** OPEN APIのcompletion APIを叩いて、LINEに返す */
export const replyOpenApiCompletionResponse = async (eventBody) => {
  const inputText = eventBody.events[0].message.text;
  const replyText: string = await openApiCompletionResponse(inputText);

  await lineClient.replyMessage(eventBody.events[0].replyToken, {
    type: "text",
    text: replyText,
  });
};
