import { ClientConfig, Client } from "@line/bot-sdk";
import { createCompletionResponse } from "./apis/createCompletion";

// LINEアクセストークンとチャンネルシークレットをenvから読み込む
const lineClientConfig: ClientConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || "",
  channelSecret: process.env.LINE_CHANNEL_SECRET || "",
};

// LINE Clientインスタンス化
const lineClient: Client = new Client(lineClientConfig);

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
    const replyText: string = await createCompletionResponse(inputText);

    await lineClient.replyMessage(body.events[0].replyToken, {
      type: "text",
      text: replyText,
    });
  } catch (e) {
    console.log(e);
  }
};
