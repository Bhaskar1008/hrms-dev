import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    Agent_Cypher: "",
}

const GetAgentCypherStore = (state, action) => {
    return updateObject(state, { Agent_Cypher: action?.AgentCypherStore });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // leadtchh
        case actionTypes.AGENT_CYPHER_STORE:
            return GetAgentCypherStore(state, action);
        default:
            return state;
    }
};

export default reducer;