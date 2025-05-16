
import axios from "axios";
import rootIndex from "../../../../store/root_index";
import apiConfig from "../../../../config/api.config";

const { baseURL } = apiConfig;
const { store } = rootIndex;
const _store = store.getState();
let cypherStore = _store?.GetAgentCypherStore?.Agent_Cypher

export const PostsizePhotoApi =  async () => {
    try {
        const Url = `${baseURL}secure/agent/document/upload`;
        const headers = {
            ciphertext: cypherStore,
            authorization: null,
            "Content-Type": "application/json",
          }
        const response = await axios.post(Url, {headers});
        if (response?.data?.statusCode === -1) {
            return response?.data?.data;
        }
      } catch (error) {
        console.error("Error calling API:", error);
      }
}