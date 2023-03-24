import { replyOpenApiCompletionResponse } from "./apis/replyOpenApiCompletionResponse";

// 実行
exports.handler = async (event: any, _context: any) => {
  try {
    await replyOpenApiCompletionResponse(event);
  } catch (e) {
    console.log(e);
  }
};
