import api from "../services/Axios"


export const getTeamMainTabApi = (id) => {
    // const header = {
    //     headers: { "Authorization" : `Bearer ${token}`}
    // }

    // return api.get(`user/getleads_team/AG1ZVGTL?leadfilter=all&skip=0`)
    //     .then(res => res).catch(err => err)

    return api.get(`getleads_team/62fcdbfc5fb1dc8913ab59f1?skip=0&leadfilter=all`)
        .then(res => res).catch(err => err)

}

export const getFirstDropdownValueApi = (userId) => {
    return api.get(`user_tree?userId=${userId}`)
        .then(res => res).catch(err => err)
}

export const getSecondDropdownValueApi = () => {
    return api.get(`https://sdrestnode.iorta.in/secure/sd/user/getteamAuto/5df77d17009e273b39cae811?sortBy=604800000&skip=0`)
        .then(res => res).catch(err => err)
}

export const getFormByIdApi = ({id}) => {
   
    return api.get(`https://sdrestnode.iorta.in/secure/sd/user/v2/getLead/${id}?leadfilter=all&skip=0`)
        .then(res => res).catch(err => err)
}
export const getOpenTabApi = (id,leadtyp) => {
    
    return api.get(`getleads_team/${id}?skip=0&leadfilter=${leadtyp}`)
        .then(res => res).catch(err => err)
}

export const getDiscardedTabApi = (id,leadtyp) => {
    
    return api.get(`getleads_team/${id}?skip=0&leadfilter=${leadtyp}`)
        .then(res => res).catch(err => err)
}

export const getFortodayTabApi = (id,leadtyp) => {
    return api.get(`getleads_team/${id}?skip=0&leadfilter=${leadtyp}`)
        .then(res => res).catch(err => err)
}

export const getConvertedTabApi = (id,leadtyp) => {
    return api.get(`getleads_team/${id}?skip=0&leadfilter=${leadtyp}`)
        .then(res => res).catch(err => err)
}

export const getFailedTabApi = (id,leadtyp) => {
    return api.get(`getleads_team/${id}?skip=0&leadfilter=${leadtyp}`)
        .then(res => res).catch(err => err)
}


