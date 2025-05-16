import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import {
  dataFormatting,
  getLabel,
  doSentenceCase,
  idFilter,
  respDetails,
  milisecondToTime,
} from "../../helpers";
import _ from "lodash";
import { ApiOutlined } from "@ant-design/icons";
const initialState = {
  history: [],
  fetchHistoryLoading: false,
  fetchHistoryError: "",
  proposalData: [],
  leadData: [],
  appointmentData: [],
};
const fetchHistoryStart = (state, action) => {
  return updateObject(state, { fetchHistoryLoading: true });
};

const fetchHistorySuccess = (state, action) => {
  const historyDetailsArr = action.history;
  let proposalArr = [];
  let leadArr = [];
  let appointmentArr = [];
  let issuanceArr = [];
  let desc = null;
  const newArr = historyDetailsArr.map((historydetail, index) => {
    if (historydetail.AppointmetData !== undefined) {
      if (historydetail.leadleadDisposition === "callback") {
        desc =
          "Callback date " +
          new Date(
            parseInt(historydetail.AppointmetData.start_date)
          ).toLocaleDateString() +
          "  Callback time " +
          milisecondToTime(historydetail.AppointmetData.start_time);
        if (historydetail.allocated === false) {
          leadArr.push(
            dataFormatting(
              historydetail,
              "Updated - " + getLabel(historydetail.leadDisposition),
              desc +
                " " +
                respDetails(historydetail.Details2) +
                " " +
                respDetails(historydetail.Details3)
            )
          );
        } else {

          leadArr.push(
            dataFormatting(
              historydetail,
              "Lead Allocated",
              desc +
                " " +
                respDetails(historydetail.Details2) +
                " " +
                respDetails(historydetail.Details3)
            )
          );
        }
      } else if (historydetail.leadDisposition === "appointment") {
        // Appointment  10/28/2018
        if (Array.isArray(historydetail.AppointmetData)) {

          // moment(historydetail.AppointmetData[0].start_time).format('LT');
          desc =
            "Appointment date " +
            new Date(
              parseInt(historydetail.AppointmetData[0].start_date)
            ).toLocaleDateString() +
            "  Appointment time " +
            milisecondToTime(historydetail.AppointmetData[0].start_time);
        } else {

          // moment(historydetail.AppointmetData.start_time).format('LT');
          desc =
            "Appointment date " +
            new Date(
              parseInt(historydetail.AppointmetData.start_date)
            ).toLocaleDateString() +
            "  Appointment time " +
            milisecondToTime(historydetail.AppointmetData.start_time);
          appointmentArr.push(
            historydetail.allocated === false
              ? dataFormatting(
                  historydetail,
                  "New Appointment Created",
                  desc +
                    " " +
                    respDetails(historydetail.Details2) +
                    " " +
                    respDetails(historydetail.Details3)
                )
              : dataFormatting(
                  historydetail,
                  "Appointment Allocated",
                  desc +
                    " " +
                    respDetails(historydetail.Details2) +
                    " " +
                    respDetails(historydetail.Details3)
                )
          );
        }
      }
    } else {
      if (historydetail.Status === "newleadentery") {
        desc =
          doSentenceCase(historydetail.Details1) +
          " " +
          historydetail.Details2.split("|")[0];
        historydetail.allocated === true
          ? leadArr.push(dataFormatting(historydetail, "Lead Allocated", desc))
          : leadArr.push(
              dataFormatting(historydetail, "New Lead Created", desc)
            );
      } else if (historydetail.AppointmentStatus !== "") {
        desc =
          doSentenceCase(historydetail.Details1) +
          "  " +
          respDetails(historydetail.Details2);
        historydetail.allocated === false
          ? 
            appointmentArr.push(
              dataFormatting(
                historydetail,
                "Updated - " + getLabel(historydetail.AppointmentStatus),
                desc
              )
            )
          : appointmentArr.push(
              dataFormatting(historydetail, "Lead Allocated", desc)
            );
      } else if (historydetail.Status === "Proposalstarted") {
        /**
         * When proposal is generated then that code is executed
         */
        desc =
          (historydetail.Status === "Proposalstarted"
            ? "Proposal Started"
            : historydetail.Status) +
          " | " +
          idFilter(historydetail.proposal_Id.productId, "P");
        proposalArr.push(dataFormatting(historydetail, "New BI Created", desc));
      } else if (historydetail.Status === "login") {
        if (typeof historydetail.Details1 === "object") {
          let _obj = {};
          _obj["date"] = new Date(
            parseInt(historydetail.created_date)
          ).toLocaleString();
          _obj["owner"] = historydetail.Details1.AdvisorName;
          _obj["desc"] =
            "Type of Life: " +
            historydetail.Details2[0].requestType +
            " | Category of issue :" +
            historydetail.Details2[0].categoryofIssue +
            " | Type of issue: " +
            historydetail.Details2[0].typeofIssue;
          _obj["highlight"] = true;
          _obj["title"] = "Requirement Raised";

          proposalArr.push(_obj);
        } else {
          // desc = self.doSentenceCase(historydetail.Details1)+' | '+this.respDetails(historydetail.Details2);
          // self.historyList[2].data.push(self.dataFormatting(historydetail, 'Document Uploaded', desc));

          desc =
            historydetail.Details1 +
            " | " +
            (historydetail.Status === "login"
              ? "Login"
              : historydetail.Status) +
            " | " +
            idFilter(historydetail.proposal_Id.productId, "P");
          proposalArr.push(
            dataFormatting(historydetail, "Document Uploaded", desc)
          );
        }
      } else if (historydetail.Status === "issued") {
        desc =
          historydetail.Details1 +
          " | " +
          (historydetail.Status === "issued"
            ? "Issued"
            : historydetail.Status) +
          " | " +
          idFilter(historydetail.proposal_Id.productId, "P");
        proposalArr.push(dataFormatting(historydetail, "Policy Issued", desc));
      } else if (historydetail.Status === "rejected") {
        desc =
          historydetail.Details1 +
          " | " +
          (historydetail.Status === "rejected"
            ? "Rejected"
            : historydetail.Status) +
          " | " +
          idFilter(historydetail.proposal_Id.productId, "P");
        proposalArr.push(
          dataFormatting(historydetail, "Policy Rejected", desc)
        );
      } else {
        /**
         * No contact section code eexecuted from here
         */
        desc =
          doSentenceCase(historydetail.Details1) +
          " " +
          respDetails(historydetail.Details2);

        if (historydetail.allocated === false) {
          leadArr.push(
            dataFormatting(
              historydetail,
              "Updated - " + getLabel(historydetail.leadDisposition),
              desc
            )
          );
        } else {
          leadArr.push(dataFormatting(historydetail, "Lead Allocated", desc));
        }
      }
    }
  });
  return updateObject(state, {
    fetchHistoryLoading: false,
    history: action.history,
    leadData: leadArr,
    appointmentData: appointmentArr,
    proposalData: proposalArr,
  });
};
const fetchHistoryFail = (state, action) => {
  return updateObject(state, {
    fetchHistoryLoading: false,
    fetchHistoryError: action.error,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //state
    case actionTypes.FETCH_HISTORY_START:
      return fetchHistoryStart(state, action);
    case actionTypes.FETCH_HISTORY_SUCCESS:
      return fetchHistorySuccess(state, action);
    case actionTypes.FETCH_HISTORY_FAIL:
      return fetchHistoryFail(state, action);

    default:
      return state;
  }
};

export default reducer;
