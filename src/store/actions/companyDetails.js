import { SAVE_COMPANY_DETAILS } from "./actionTypes";
import { SAVE_REPRESENTATIVE_DETAILS } from "./actionTypes";

export const saveCompanyDetails = (data) => ({
  type: SAVE_COMPANY_DETAILS,
  payload: data,
});

export const saveRepresentativeDetails = (data) => ({
  type: SAVE_REPRESENTATIVE_DETAILS,
  payload: data,
});

