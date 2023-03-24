import { replyOpenApiCompletionResponse } from "./apis/replyOpenApiCompletionResponse";
import {
  isImageRequest,
  replyOpenApiImagesResponse,
} from "./apis/replyOpenApiImagesResponse";

// 実行
exports.handler = async (event: any, _context: any) => {
  try {
    if (isImageRequest(event)) {
      await replyOpenApiImagesResponse(event);
    } else {
      await replyOpenApiCompletionResponse(event);
    }
  } catch (e) {
    console.log(e);
  }
};
