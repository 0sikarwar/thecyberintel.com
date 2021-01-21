let MESSAGES = {};
export const setMsgJson = async (setIsLoading) => {
  MESSAGES = await fetch(`${window.FILE_PATH}/msg.json`).then((resp) => resp.json());
  setIsLoading(false);
};
export const getMsgJson = () => ({ ...MESSAGES });
