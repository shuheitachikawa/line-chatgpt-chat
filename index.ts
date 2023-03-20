import { ClientConfig, Client } from "@line/bot-sdk";
const { Configuration, OpenAIApi } = require("openai");

// LINEアクセストークンとチャンネルシークレットをenvから読み込む
const clientConfig: ClientConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || "",
  channelSecret: process.env.LINE_CHANNEL_SECRET || "",
};

// GPT-3のAPIキーとエンドポイントをenvから読み込む
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
// const gpt3Endpoint = "https://api.openai.com/v1/chat/completions";

// LINE Clientインスタンス化
const client: Client = new Client(clientConfig);

/** chatGPTのAPI叩く
 * @param inputText 入力テキスト
 * @returns 返答テキスト
 */
const chatGptResponse = async (inputText: string): Promise<string> => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: inputText }],
  });

  console.log({ completion });
  return completion.data.choices[0].message;
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
    const replyText: string = await chatGptResponse(inputText);

    await client.replyMessage(body.events[0].replyToken, {
      type: "text",
      text: replyText,
    });
  } catch (e) {
    console.log(e);
  }
};
