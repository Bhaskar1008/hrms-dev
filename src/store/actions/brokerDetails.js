import { BROKER_DETAILS } from "./actionTypes";

export const brokerDetails = (data) => ({
  type: BROKER_DETAILS,
  payload: data,
});

