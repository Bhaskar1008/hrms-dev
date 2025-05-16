// import React from "react";
// import axios from "axios";

// // export default TeamTabAPI = () => {

//     // React.useEffect(() => {
//     //     TeamData()
//     // },[])
//     // Team Tab Main Card API 
//     const TeamData = async () => {
//         return await axios.get("https://sdrestnode.iorta.in/secure/sd/user/getleads_team/AG1ZVGTL?leadfilter=all&skip=0");
        
//     }


//     // Team Tab First Dropdown For ALL API
//     const TeamFDropDForALL = async () => {
//         const TDataFDropDForALL = await axios.get("https://sdrestnode.iorta.in/secure/sd/admin/getHierarchy?userId=5b3b4cc28fa96d39870443e3&channelCode=5dbfdfa8e51cd5522249ba70&skip=0&hierarchy_type=1")
//     }


//     // Team Tab First Dropdown For Agent API

//     const TeamFDropDForAgent = async () => {
//         const TDataFDropDForAgent = await axios.get("https://sdrestnode.iorta.in/secure/sd/user/v2/getLead/5dbfdfa8e51cd5522249ba72?leadfilter=all&skip=0")
//     }


//     // Team Tab Second Dropdown Agent -> Saran API 
//     const TeamSDropDForSaran = async () => {
//         const TDataSDropDForSaran = await axios.get("https://sdrestnode.iorta.in/secure/sd/user/v2/getLead/5e96df4bb08f1a77557e5da1?leadfilter=all&skip=0")
//     }


//     // Team Tab Second Dropdown Agent -> Ashraf API
//     const TeamSDropDForAshraf = async () => {
//         const TDataSDropDForAshraf = await axios.get("https://sdrestnode.iorta.in/secure/sd/user/v2/getLead/5df782ab2b5ffa6c72ae1a25?leadfilter=all&skip=0")
//     }


//     // Team Tab First Dropdown For Sales Manager API
//     const TeamFDropDForSalesManager = async () => {
//         const TDataFDropDForSalesManager = await axios.get("https://sdrestnode.iorta.in/secure/sd/user/getteamAuto/5df77d17009e273b39cae811?sortBy=604800000&skip=0")
//     }


//     // Team Tab Second Dropdown Sales Manager -> TCN API 
//     const TeamSDropDForTCN = async () => {
//         const TDataSDropDForTCN = await axios.get("https://sdrestnode.iorta.in/secure/sd/user/v2/getLead/5e147dd2f14d8908c32ce217?leadfilter=all&skip=0")
//     }


//     // Team Tab Second Dropdown Sales Manager -> Imran API
//     const TeamSDropDForImran = async () => {
//         const TDataSDropDForImran = await axios.get("https://sdrestnode.iorta.in/secure/sd/user/v2/getLead/5df781522b5ffa6c72ae1a1d?leadfilter=all&skip=0")
//     }


//     // Team Tab First Dropdown For Branch Manager API 
//     const TeamFDropDForBranchManager = async () => {
//         const TDataFDropDForBranchManager = await axios.get("https://sdrestnode.iorta.in/secure/sd/user/getteamAuto/5df77d17009e273b39cae811?sortBy=604800000&skip=0")
//     }


//     // Team Tab Second Dropdown Branch Manager -> Usama API
//     const TeamSDropDForUsama = async () => {
//         const TDataSDropDForUsama = await axios.get("https://sdrestnode.iorta.in/secure/sd/user/v2/getLead/5df780022b5ffa6c72ae1a15?leadfilter=all&skip=0")
//     }


//     // Team Tab First Dropdown For Regional Manager API
//     const TeamFDropDForRegionalManager = async () => {
//         const TDataFDropDForRegionalManager = await axios.get("https://sdrestnode.iorta.in/secure/sd/user/getteamAuto/5df77d17009e273b39cae811?sortBy=604800000&skip=0")
//     }


//     // Team Tab Second Dropdown Regional Manager -> Abhishek 
//     const TeamSDropDForAbhishek = async () => {
//         const TDataSDropDForAbhishek = await axios.get("https://sdrestnode.iorta.in/secure/sd/user/v2/getLead/5df77e6a2b5ffa6c72ae1a0e?leadfilter=all&skip=0")
//     }
// // }