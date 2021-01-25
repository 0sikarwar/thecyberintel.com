let MESSAGES = {};
export const setMsgJson = async (setIsLoading) => {
  const fetchOptions = {
    cache: "no-cache",
  };
  MESSAGES = await fetch(`${window.FILE_PATH}/msg.json`, fetchOptions).then((resp) => resp.json());
  setIsLoading(false);
};
export const getMsgJson = () => ({ ...MESSAGES });
