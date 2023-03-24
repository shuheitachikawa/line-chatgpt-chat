type RequestType = "text" | undefined;

/** LINEからのリクエストタイプを返す
 *  @param eventBody LINEからのリクエスト
 *  @returns RequestType
 */
export const requestType = (eventBody): RequestType => {
  if (
    eventBody.events[0].type === "message" &&
    eventBody.events[0].message.type === "text"
  ) {
    return "text";
  }

  return undefined;
};
