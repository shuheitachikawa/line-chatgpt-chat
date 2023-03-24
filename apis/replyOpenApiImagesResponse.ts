import { TemplateImageColumn } from "@line/bot-sdk";
import { lineClient } from "../lineClient";
import { openai } from "../openApiConfig";

/** 画像を返してほしいか */
export const isImageResponse = (eventBody): boolean => {
  const inputText = eventBody.events[0].message.text;

  if (inputText.includes("の画像")) return true;

  return false;
};

/** OPEN AIのAPI叩く(Images)
 * @param inputText 入力テキスト
 * @returns 画像URL
 */
const openApiImagesResponse = async (inputText: string): Promise<string[]> => {
  const { data } = await openai.createImage({
    prompt: inputText,
    n: 2,
    size: "1024x1024",
  });

  return data.data.map((i) => i.url || "");
};

/** OPEN APIのImages APIを叩いて、画像URLをLINEに返す */
export const replyOpenApiImagesResponse = async (eventBody) => {
  const inputText = eventBody.events[0].message.text;

  const imageUrls: string[] = await openApiImagesResponse(inputText);

  const columns: TemplateImageColumn[] = imageUrls.map((imageUrl, i) => {
    return {
      imageUrl,
      action: {
        type: "postback",
        label: `${i + 1}`,
        data: "action=buy&itemid=111",
      },
    };
  });

  await lineClient.replyMessage(eventBody.events[0].replyToken, {
    type: "template",
    altText: inputText,
    template: {
      type: "image_carousel",
      columns,
    },
  });
};
