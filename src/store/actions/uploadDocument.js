import * as actionTypes from "../actions/actionTypes";

export const uploadVehicleCertificate = (formData) => {
    return {
        type: actionTypes.ADD_VEHICAL_CERTIFICATE,
        formData: formData,
    };
};
export const uploadPhotoId = (formData) => {
    return {
        type: actionTypes.ADD_PHOTO_ID,
        formData: formData,
    };
};
export const uploadSign = (formData) => {
    return {
        type: actionTypes.ADD_SIGN,
        formData: formData,
    };
};
