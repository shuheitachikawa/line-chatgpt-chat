import { ClientConfig, Client } from "@line/bot-sdk";
import axios from "axios";

// LINEアクセストークンとチャンネルシークレットをenvから読み込む
const clientConfig: ClientConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || "",
  channelSecret: process.env.LINE_CHANNEL_SECRET || "",
};

// GPT-3のAPIキーとエンドポイントをenvから読み込む
const gpt3ApiKey = process.env.GPT3_API_KEY!;
const gpt3Endpoint =
  "https://api.openai.com/v1/engines/text-davinci-003/completions";

// LINE Clientインスタンス化
const client: Client = new Client(clientConfig);

/** chatGPTのAPI叩く
 * @param inputText 入力テキスト
 * @returns 返答テキスト
 */
const getChatGptResponse = async (inputText: string): Promise<string> => {
  const { data } = await axios.post(
    gpt3Endpoint,
    {
      prompt: inputText,
      max_tokens: 1000,
      temperature: 1.0,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${gpt3ApiKey}`,
      },
    }
  );

  return data.choices[0].text.trimStart();
};

// 実行
exports.handler = async (event: any, _context: any) => {
  try {
    const body: any = JSON.parse(event.body);

    if (
      body.events[0].type !== "message" ||
      body.events[0].message.type !== "text"
    ) {
      return Promise.resolve(null);
    }

    const inputText = body.events[0].message.text;
    const replyText: string = await getChatGptResponse(inputText);

    await client.replyMessage(body.events[0].replyToken, {
      type: "text",
      text: replyText,
    });
  } catch (e) {
    console.log(e);
  }
};
