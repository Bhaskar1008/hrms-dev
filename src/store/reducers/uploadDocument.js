import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
    vehicleCertificate: [],
    photID: [],
    Sign: []

}


const uploadVehicleCertificate = (state, action) => {

    return updateObject(state, { vehicleCertificate: action?.formData });
};
const uploadPhotoId = (state, action) => {

    return updateObject(state, { photID: action?.formData });
};
const uploadSign = (state, action) => {

    return updateObject(state, { Sign: action?.formData });
};





const reducer = (state = initialState, action) => {
    switch (action.type) {
        // leadtchh
        case actionTypes.ADD_VEHICAL_CERTIFICATE:
            return uploadVehicleCertificate(state, action);
        case actionTypes.ADD_PHOTO_ID:
            return uploadPhotoId(state, action);
        case actionTypes.ADD_SIGN:
            return uploadSign(state, action);


        default:
            return state;


    }
};

export default reducer;