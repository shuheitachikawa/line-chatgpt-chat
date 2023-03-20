import { ClientConfig, Client } from "@line/bot-sdk";
const { Configuration, OpenAIApi } = require("openai");

// LINEアクセストークンとチャンネルシークレットをenvから読み込む
const lineClientConfig: ClientConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || "",
  channelSecret: process.env.LINE_CHANNEL_SECRET || "",
};

// LINE Clientインスタンス化
const lineClient: Client = new Client(lineClientConfig);

/** OPEN AIのAPI叩く
 * @param inputText 入力テキスト
 * @returns 返答テキスト
 * @see https://platform.openai.com/docs/api-reference/completions/create?lang=node.js
 */
const chatGptResponse = async (inputText: string): Promise<string> => {
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

  return data.choices[0].text;
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

    await lineClient.replyMessage(body.events[0].replyToken, {
      type: "text",
      text: replyText,
    });
  } catch (e) {
    console.log(e);
  }
};
