import axiosRequest from '../../axios-request/request.methods'


export const getCoverageTypeApi =  async () => {
    const res = await axiosRequest.get(`user/coverageType`);
    if (res.statusCode === -1) {
      if (res?.data?.data && Array.isArray(res.data.data)) {
        return res.data.data;
      }
      return null
    }else{
        return null
    }
}

export const getAgeRangeApi = async (travelType, travelPackage) => {
    const res = await axiosRequest.get(`user/ageRange?travelType=${travelType}&travelPackage=${travelPackage}`);
    if (res.statusCode === -1) {
      if (res?.data?.data && Array.isArray(res.data.data)) {
        return res.data.data;
      }
      return null
    }else{
        return null
    }
    
}

export const getThirdPartyDetails = (params) => {
  const queryParams = new URLSearchParams(params);
  
  return axiosRequest.get(`user/third-party/detail?${queryParams.toString()}`)
  .then((response) => {
      if (response?.statusCode === -1 && response?.data && response?.data?.customerDetail) {
        return response.data;
      } else {
        return response.data;
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

    export const getPrefix = async () => {
        const res = await axiosRequest.get(`user/lov-options?name=Prefix`);
        if (res.statusCode === -1) {
            return res.data;
        } else {
            return res.data
        }
    }
    export const getSaperator = async () => {
        const res = await axiosRequest.get(`user/lov-options?name=Separator`);
        if (res.statusCode === -1) {
            return res.data;
        } else {
            return res.data
        }
    }