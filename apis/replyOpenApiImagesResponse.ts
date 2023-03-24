import { lineClient } from "../lineClient";
import { openai } from "../openApiConfig";

/** OPEN AIのAPI叩く(Images)
 * @param inputText 入力テキスト
 * @returns 画像URL
 */
const openApiImagesResponse = async (inputText: string): Promise<string> => {
  const { data } = await openai.createImage({
    prompt: inputText,
    n: 2,
    size: "1024x1024",
  });

  return data.data[0].url || "";
};

/** OPEN APIのImages APIを叩いて、画像URLをLINEに返す */
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
    type: "image",
    originalContentUrl: imageUrl,
    previewImageUrl: imageUrl,
  });
};
