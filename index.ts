// module.exports.handler = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: "Go Serverless v3.0! Your function executed successfully!",
//         input: event,
//       },
//       null,
//       2
//     ),
//   };
// };

// import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
// import * as line from '@line/bot-sdk';
// import axios from 'axios';

// const config: line.ClientConfig = {
//   channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!,
//   channelSecret: process.env.LINE_CHANNEL_SECRET!,
// };
// const client = new line.Client(config);

// const gpt3ApiKey = process.env.GPT3_API_KEY!;
// const gpt3Endpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//   const lineEvents = client.parseEventsFromRequestBody(event.body!);
//   const promises: Promise<any>[] = [];

//   for (const lineEvent of lineEvents) {
//     if (lineEvent.type === 'message' && lineEvent.message.type === 'text') {
//       const inputText = lineEvent.message.text;

//       const response = await axios.post(
//         gpt3Endpoint,
//         {
//           prompt: inputText,
//           max_tokens: 50,
//           temperature: 0.7,
//           n: 1,
//           stop: ['\n']
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${gpt3ApiKey}`
//           }
//         }
//       );

//       const replyText = response.data.choices[0].text;
//       promises.push(client.replyMessage(lineEvent.replyToken, { type: 'text', text: replyText }));
//     }
//   }

//   await Promise.all(promises);

//   return { statusCode: 200, body: 'OK' };
// };


import { ClientConfig, Client, WebhookEvent } from '@line/bot-sdk';


// アクセストークンとチャンネルシークレットをenvから読み込む
const clientConfig: ClientConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.LINE_CHANNEL_SECRET || '',
};

// インスタンス化
const client: Client = new Client(clientConfig);

// 実行
exports.handler = async (event: any, context: any) => {
  console.log({ event });
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  
  const body: any = JSON.parse(event.body);
  const response: WebhookEvent = body.events[0];

  try {
    await client.replyMessage(event.replyToken, { type: 'text', text: JSON.stringify(event.body) });
  } catch (err) {
    console.log(err);
  }
};