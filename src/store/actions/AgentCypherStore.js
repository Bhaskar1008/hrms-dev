import * as actionTypes from "../actions/actionTypes";

export const GetAgentCypherStore = (payload) => {
    return {
        type: actionTypes.AGENT_CYPHER_STORE,
        AgentCypherStore: payload,
    };
};
