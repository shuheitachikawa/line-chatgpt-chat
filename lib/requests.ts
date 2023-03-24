/** LINEからの入力がテキストか */
export const isTextRequest = (eventBody): boolean => {
  const body: any = JSON.parse(eventBody);
  if (
    body.events[0].type !== "message" ||
    body.events[0].message.type !== "text"
  ) {
    return false;
  }

  return true;
};
