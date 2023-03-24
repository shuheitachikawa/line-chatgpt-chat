import { lineClient } from "../lineClient";
import { openai } from "../openApiConfig";

/** OPEN AIのAPI叩く(createCompletion)
 * @param inputText 入力テキスト
 * @returns 返答テキスト
 * @see https://platform.openai.com/docs/api-reference/completions/create?lang=node.js
 */
const openApiImagesResponse = async (inputText: string): Promise<string> => {
  const { data } = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: inputText,
    max_tokens: 1000,
    temperature: 0,
  });

  return (data.choices[0].text || "").trim();
};

/** OPEN APIのcompletion APIを叩いて、LINEに返す */
export const replyOpenApiImagesResponse = async (event) => {
  const body: any = JSON.parse(event.body);

  if (
    body.events[0].type !== "message" ||
    body.events[0].message.type !== "text"
  ) {
    return Promise.resolve(null);
  }

  const inputText = body.events[0].message.text;
  const imageUrl: string = await openApiImagesResponse(inputText);

  await lineClient.replyMessage(body.events[0].replyToken, {
    type: "text",
    text: imageUrl,
  });
};
