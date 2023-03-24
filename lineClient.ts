import { ClientConfig, Client } from "@line/bot-sdk";

// LINEアクセストークンとチャンネルシークレットをenvから読み込む
const lineClientConfig: ClientConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || "",
  channelSecret: process.env.LINE_CHANNEL_SECRET || "",
};

// LINE Clientインスタンス化
export const lineClient: Client = new Client(lineClientConfig);
