import { replyOpenApiCompletionResponse } from "./apis/replyOpenApiCompletionResponse";
import { replyOpenApiImagesResponse } from "./apis/replyOpenApiImagesResponse";

// 実行
exports.handler = async (event: any, _context: any) => {
  try {
    // await replyOpenApiCompletionResponse(event);
    await replyOpenApiImagesResponse(event);
  } catch (e) {
    console.log(e);
  }
};
