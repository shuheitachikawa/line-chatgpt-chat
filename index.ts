import { replyOpenApiCompletionResponse } from "./apis/replyOpenApiCompletionResponse";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";

import {
  isImageResponse,
  replyOpenApiImagesResponse,
} from "./apis/replyOpenApiImagesResponse";
import { requestType } from "./lib/requests";

exports.handler = async (
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const eventBody = JSON.parse(event.body);

    switch (requestType(eventBody)) {
      case "text":
        await textInputOparation(eventBody);
        break;
      default:
        break;
    }
  } catch (e) {
    console.log(e);
  }
};

/** LINEからの入力がテキストの時の処理 */
const textInputOparation = async (eventBody): Promise<void> => {
  // 画像を返してほしいリクエストか
  if (isImageResponse(eventBody)) {
    await replyOpenApiImagesResponse(eventBody);
  } else {
    await replyOpenApiCompletionResponse(eventBody);
  }
};
