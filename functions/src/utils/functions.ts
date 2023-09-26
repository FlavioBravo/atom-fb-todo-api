import constants from "./constants";

const ValidateCorrectStatus = (status: string) => {
  return constants.COMPLETED_TASK === status ||
    constants.PENDING_TASK === status
    ? true
    : false;
};

export default {
  ValidateCorrectStatus,
};
