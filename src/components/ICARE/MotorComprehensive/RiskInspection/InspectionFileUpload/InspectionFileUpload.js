import React, { useState, useEffect } from "react";
import "./InspectionFileUpload.css";
import {
  Row,
  Col,
  Button,
  Radio,
  Card,
  Select,
  Option,
  Form,
  Progress,
  Input,
  DatePicker,
  Upload,
  message,
  Modal,
  Spin,
} from "antd";
//import axiosRequest from "../../../../../axios-request/request.methods";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import {
  UploadOutlined,
  DeleteOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import car1 from "../../../../../images/uploader_image/car1.png";
import car2 from "../../../../../images/uploader_image/car2.png";
import car3 from "../../../../../images/uploader_image/car3.png";
import car4 from "../../../../../images/uploader_image/car4.png";
import car5 from "../../../../../images/uploader_image/car5.png";
import car6 from "../../../../../images/uploader_image/car6.png";
import car7 from "../../../../../images/uploader_image/car7.png";
import car8 from "../../../../../images/uploader_image/car8.png";
import car9 from "../../../../../images/uploader_image/car9.png";
import FullPageLoader from "../../../../FullPageLoader/FullPageLoader";
import apiConfig from "../../../../../config/api.config";

import axiosRequest from "../../../../../axios-request/request.methods";
const InspectionFileUpload = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const { baseURL } = apiConfig;

  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const { id } = useParams();
  const { type } = useParams();
  console.log("uplodadata", id, type);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsSubmitted, setIsDetailsSubmitted] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fileList, setFileList] = useState([]);
  console.log("fileList", fileList);
  const [fileListRear, setFileListRear] = useState([]);
  const [fileListLeft, setFileListLeft] = useState([]);
  const [fileListRight, setFileListRight] = useState([]);
  const [fileListFrontLeftAShort, setFileListFrontLeftAShort] = useState([]);
  const [fileListFrontRightAShort, setFileListFrontRightAShort] = useState([]);
  const [fileListLeftRearAShort, setFileListLeftRearAShort] = useState([]);
  const [fileListRightRearAShort, setFileListRightRearAShort] = useState([]);
  const [fileListInternalShort, setFileListInternalShort] = useState([]);
  const [fileListOtherShort, setFileListOtherShort] = useState([]);

  // preview data
  const [previewImage, setPreviewImage] = useState("");
  const [previewImageRear, setPreviewImageRear] = useState("");
  const [previewImageLeft, setPreviewImageLeft] = useState("");
  const [previewImageRight, setPreviewImageRight] = useState("");
  const [previewImageFrontLeftAShort, setPreviewImageFrontLeftAShort] =
    useState("");
  const [previewImageFrontRightAShort, setPreviewImageFrontRightAShort] =
    useState("");
  const [previewImageLeftRearAShort, setPreviewImageLeftRearAShort] =
    useState("");
  const [previewImageRightRearAShort, setPreviewImageRightRearAShort] =
    useState("");
  const [previewImageInternalShort, setPreviewImageInternalShort] =
    useState("");
  const [previewImageOtherShort, setPreviewImageOtherShort] = useState("");

  // get response data
  const [getImgRes, setGetImgRes] = useState("");
  const [getRearRes, setGetRearRes] = useState("");
  const [getLeftRes, setGetLeftRes] = useState("");
  const [getRightRes, setGetRightRes] = useState("");
  const [getLeftFrontRes, setGetLeftFrontRes] = useState("");
  const [getRightFrontRes, setGetRightFrontRes] = useState("");
  const [getLeftRearRes, setGetLeftRearRes] = useState("");
  const [getRightRearRes, setGetRightRearRes] = useState("");
  const [getInternalRes, setGetInternalRes] = useState("");
  // get status and reason
  const [getImgResStatus, setGetImgResStatus] = useState("");
  const [getRearResStatus, setGetRearResStatus] = useState("");
  const [getLeftResStatus, setGetLeftResStatus] = useState("");
  const [getRightResStatus, setGetRightResStatus] = useState("");
  const [getLeftFrontResStatus, setGetLeftFrontResStatus] = useState("");
  const [getRightFrontResStatus, setGetRightFrontResStatus] = useState("");
  const [getLeftRearResStatus, setGetLeftRearResStatus] = useState("");
  const [getRightRearResStatus, setGetRightRearResStatus] = useState("");
  const [getInternalResStatus, setGetInternalResStatus] = useState("");
  // reason
  const [getImgResReason, setGetImgResReason] = useState("");
  const [getRearResReason, setGetRearResReason] = useState("");
  const [getLeftResReason, setGetLeftResReason] = useState("");
  const [getRightResReason, setGetRightResReason] = useState("");
  const [getLeftFrontResReason, setGetLeftFrontResReason] = useState("");
  const [getRightFrontResReason, setGetRightFrontResReason] = useState("");
  const [getLeftRearResReason, setGetLeftRearResReason] = useState("");
  const [getRightRearResReason, setGetRightRearResReason] = useState("");
  const [getInternalResReason, setGetInternalResReason] = useState("");

  // remove flag
  const [flagRemove, setFlagRemove] = useState(true);
  const [flagRemoveRear, setFlagRemoveRear] = useState(true);
  const [flagRemoveLeftRear, setFlagRemoveLeftRear] = useState(true);
  const [flagRemoveRightRear, setFlagRemoveRightRear] = useState(true);
  const [flagRemoveLeftFrontRes, setFlagRemoveLeftFrontRes] = useState(true);
  const [flagRemoveRightFrontRes, setFlagRemoveRightFrontRes] = useState(true);
  const [flagRemoveLeftRearRes, setFlagRemoveLeftRearRes] = useState(true);
  const [flagRemoveRightRearRes, setFlagRemoveRightRearRes] = useState(true);
  const [flagRemoveInternalRes, setFlagRemoveInternalRes] = useState(true);

  //  on submit form data
  const [updatedData, setupdatedData] = useState({
    QC_status: "Pending",
    //QC_status: "Not Required", "Required", "Pending", "Approved", "Rejected", "Dispute Raised"
    //documentStatus: "Pending", "Approved", "Rejected"
  });

  // get api data ----
  const [getRiskInspentionData, setGetRiskInspentionData] = useState([]);
  const [status, setStatus] = useState(null);
  console.log("msg1", status);
  console.log("getRiskInspentionData", getRiskInspentionData);

  useEffect(() => {
    fetchGetRiskInspectionData();
    // fetchRiskData();
    //setFlagRemoveRightRear(previewImageRight && getRightRes ? true : false)
  }, []);

  const ctplStore = useSelector((state) => state);
  console.log("ctplStore", ctplStore);

  // FRONT
  const beforeUpload = (file) => {
    // Convert the selected image to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setFileList([{ ...file, base64Image }]);
      setPreviewImage(base64Image);
    };
    return false; // Prevent automatic upload
  };

  // REAR COLLECTION
  const beforeUploadRear = (file) => {
    // Convert the selected image to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setFileListRear([{ ...file, base64Image }]);
      setPreviewImageRear(base64Image);
    };
    return false; // Prevent automatic upload
  };

  // LEFT IMG UPLOAD
  const beforeUploadLeft = (file) => {
    // Convert the selected image to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setFileListLeft([{ ...file, base64Image }]);
      setPreviewImageLeft(base64Image);
    };
    return false; // Prevent automatic upload
  };

  // RIGHT IMG UPLOAD
  const beforeUploadRight = (file) => {
    // Convert the selected image to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setFileListRight([{ ...file, base64Image }]);
      setPreviewImageRight(base64Image);
    };
    return false; // Prevent automatic upload
  };

  // FrontLeftAShort
  const beforeUploadFrontLeftAShort = (file) => {
    // Convert the selected image to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setFileListFrontLeftAShort([{ ...file, base64Image }]);
      setPreviewImageFrontLeftAShort(base64Image);
    };
    return false; // Prevent automatic upload
  };

  // FrontRightAShort
  const beforeUploadFrontRightAShort = (file) => {
    // Convert the selected image to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setFileListFrontRightAShort([{ ...file, base64Image }]);
      setPreviewImageFrontRightAShort(base64Image);
    };
    return false; // Prevent automatic upload
  };

  // LeftRear
  const beforeUploadLeftRearAShort = (file) => {
    // Convert the selected image to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setFileListLeftRearAShort([{ ...file, base64Image }]);
      setPreviewImageLeftRearAShort(base64Image);
    };
    return false; // Prevent automatic upload
  };

  const beforeUploadRightRearAShort = (file) => {
    // Convert the selected image to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setFileListRightRearAShort([{ ...file, base64Image }]);
      setPreviewImageRightRearAShort(base64Image);
    };
    return false; // Prevent automatic upload
  };

  const beforeUploadInternalShort = (file) => {
    // Convert the selected image to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setFileListInternalShort([{ ...file, base64Image }]);
      setPreviewImageInternalShort(base64Image);
    };
    return false; // Prevent automatic upload
  };

  const beforeUploadOtherShort = (file) => {
    // Convert the selected image to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setFileListOtherShort([{ ...file, base64Image }]);
      setPreviewImageOtherShort(base64Image);
    };
    return false; // Prevent automatic upload
  };

  const onRemove = () => {
    setFlagRemove(false);
    setGetImgRes("");
    setFileList([]);
  };
  const onRemoveRear = () => {
    setFlagRemoveRear(false);
    setFileListRear([]);
    setGetRearRes("");
  };
  const onRemoveLeft = () => {
    setFlagRemoveLeftRear(false);
    setGetLeftRes("");
    setFileListLeft([]);
  };

  const onRemoveRight = () => {
    setFlagRemoveRightRear(false);
    setGetRightRes("");
    setFileListRight([]);
  };
  const onRemoveFrontLeftAShort = () => {
    setFlagRemoveLeftFrontRes(false);
    setGetLeftFrontRes("");
    setFileListFrontLeftAShort([]);
  };

  const onRemoveFrontRightAShort = () => {
    setFlagRemoveRightFrontRes(false);
    setGetRightFrontRes("");
    setFileListFrontRightAShort([]);
  };

  const onRemoveLeftRearAShort = () => {
    setFlagRemoveLeftRearRes(false);
    setGetLeftRearRes("");
    setFileListLeftRearAShort([]);
  };
  const onRemoveRightRearAShort = () => {
    setFlagRemoveRightRearRes(false);
    setGetRightRearRes("");
    setFileListRightRearAShort([]);
  };

  const onRemoveInternalShort = () => {
    setFlagRemoveInternalRes(false);
    setGetInternalRes("");
    setFileListInternalShort([]);
  };
  const onRemoveOtherShort = () => {
    setFileListOtherShort([]);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const onModalYesClick = () => {
    setIsDetailsSubmitted(true);
    setIsModalOpen(false);
  };

  const onClickYes = () => {
    history.push("/risk-inspection");
  };
  const onchangeProceed = () => {
    history.push("/inspection-file-upload");
  };

  ///  upload img 1

  const handleUpload = async ({ file, onError }) => {
    setFlagRemove(true);
    console.log("File upload", file, onError);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("quotationId", type);
      formData.append("documentType", "Front Shot");
      // Replace with your API endpoint
      const response = await axios.post(
        `${baseURL}riskInspection/document-upload`,
        formData
      );
      if (response.data.statusCode === -1) {
        setShowMsg(true);
        setLoading(false);
        message.success(response?.data?.data);
      }
    } catch (error) {
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
      setLoading(false);
      onError();
    }
  };

  // Upload image 2

  const handleUploadRear = async ({ file, onError }) => {
    setFlagRemoveRear(true);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("quotationId", type);
      formData.append("documentType", "Rear Shot");
      // Replace with your API endpoint
      const response = await axios.post(
        baseURL + "riskInspection/document-upload",
        formData
      );
      if (response.data.statusCode === -1) {
        setShowMsg(true);
        setLoading(false);
        message.success(response.data.data);
      }
    } catch (error) {
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
      setLoading(false);
      onError();
    }
  };
  // Upload image 3
  const handleUploadLeft = async ({ file, onError }) => {
    setFlagRemoveLeftRear(true);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("quotationId", type);
      formData.append("documentType", "Left Shot");
      // Replace with your API endpoint
      const response = await axios.post(
        baseURL + "riskInspection/document-upload",
        formData
      );
      if (response.data.statusCode === -1) {
        setShowMsg(true);
        setLoading(false);
        message.success(response.data.data);
      }
    } catch (error) {
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
      setLoading(false);
      onError();
    }
  };
  // Upload image 4
  const handleUploadRight = async ({ file, onError }) => {
    setFlagRemoveRightRear(true);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("quotationId", type);
      formData.append("documentType", "Right Shot");
      // Replace with your API endpoint
      const response = await axios.post(
        baseURL + "riskInspection/document-upload",
        formData
      );
      if (response.data.statusCode === -1) {
        setShowMsg(true);
        setLoading(false);
        message.success(response.data.data);
      }
    } catch (error) {
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
      setLoading(false);
      onError();
    }
  };

  // Upload image 5
  const handleUploadFrontLeftAShort = async ({ file, onError }) => {
    setFlagRemoveLeftFrontRes(true);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("quotationId", type);
      formData.append("documentType", "Front Left Angle Shot");
      // Replace with your API endpoint
      const response = await axios.post(
        baseURL + "riskInspection/document-upload",
        formData
      );
      if (response.data.statusCode === -1) {
        setShowMsg(true);
        setLoading(false);
        message.success(response.data.data);
      }
    } catch (error) {
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
      setLoading(false);
      onError();
    }
  };

  // Upload image 6
  const handleUploadFrontRightAShort = async ({ file, onError }) => {
    setFlagRemoveRightFrontRes(true);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("quotationId", type);
      formData.append("documentType", "Front Right Angle Shot");
      // Replace with your API endpoint
      const response = await axios.post(
        baseURL + "riskInspection/document-upload",
        formData
      );
      if (response.data.statusCode === -1) {
        setShowMsg(true);
        setLoading(false);
        message.success(response.data.data);
      }
    } catch (error) {
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
      setLoading(false);
      onError();
    }
  };

  //handleUploadLeftRearAShort
  const handleUploadLeftRearAShort = async ({ file, onError }) => {
    setFlagRemoveLeftRearRes(true);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("quotationId", type);
      formData.append("documentType", "Rear Left Angle Shot");
      // Replace with your API endpoint
      const response = await axios.post(
        baseURL + "riskInspection/document-upload",
        formData
      );
      if (response.data.statusCode === -1) {
        setShowMsg(true);
        setLoading(false);
        message.success(response.data.data);
      }
    } catch (error) {
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
      setLoading(false);
      onError();
    }
  };

  // Upload image 8
  const handleUploadRightRearAShort = async ({ file, onError }) => {
    setFlagRemoveRightRearRes(true);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("quotationId", type);
      formData.append("documentType", "Rear Right Angle Shot");
      // Replace with your API endpoint
      const response = await axios.post(
        baseURL + "riskInspection/document-upload",
        formData
      );
      if (response.data.statusCode === -1) {
        setShowMsg(true);
        setLoading(false);
        message.success(response.data.data);
      }
    } catch (error) {
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
      setLoading(false);
      onError();
    }
  };

  // Upload image 9
  const handleUploadInternalShort = async ({ file, onError }) => {
    setFlagRemoveInternalRes(true);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("quotationId", type);
      formData.append("documentType", "Internal Shot");
      // Replace with your API endpoint
      const response = await axios.post(
        baseURL + "riskInspection/document-upload",
        formData
      );
      if (response.data.statusCode === -1) {
        setShowMsg(true);
        setLoading(false);
        message.success(response.data.data);
      }
    } catch (error) {
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
      setLoading(false);
      onError();
    }
  };

  // Upload image 10
  const handleUploadOtherShort = async ({ file, onError }) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("quotationId", type);
      formData.append("documentType", "Others");
      // Replace with your API endpoint
      const response = await axios.post(
        baseURL + "riskInspection/document-upload",
        formData
      );
      if (response.data.statusCode === -1) {
        setShowMsg(true);
        setLoading(false);
        message.success(response.data.data);
      }
    } catch (error) {
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
      setLoading(false);
      onError();
    }
  };

  // SUBMIT API HIT  ///

  const handleUpdate = async () => {
    if (!previewImage && !getImgRes) {
      return message.error("Please Upload Front Shot");
    }
    if (!previewImageRear && !getRearRes) {
      return message.error("Please Upload Rear Shot");
    }
    if (!previewImageLeft && !getLeftRes) {
      return message.error("Please Upload Left Shot");
    }
    if (!previewImageRight && !getRightRes) {
      return message.error("Please Upload Right Shot");
    }
    if (!previewImageFrontLeftAShort && !getLeftFrontRes) {
      return message.error("Please Upload Front Left Angle Shot");
    }
    if (!previewImageFrontRightAShort && !getRightFrontRes) {
      return message.error("Please Upload Front Right Angle Shot");
    }
    if (!previewImageLeftRearAShort && !getLeftRearRes) {
      return message.error("Please Upload Rear Left Angle Shot");
    }
    if (!previewImageRightRearAShort && !getRightRearRes) {
      return message.error("Please Upload Rear Right Angle Shot");
    }
    if (!previewImageInternalShort && !getInternalRes) {
      return message.error("Please Upload Internal Shot");
    }

    try {
      const response = await axios.put(
        `${baseURL}riskInspection/submitDetails/${type}`,
        updatedData
      );
      console.log("responseUpdated", response);

      if (response.status === 200) {
        console.log("PUT request successful");
        message.success(response.data.data);
        // Handle success, update state, show notifications, etc.
        history.push(`/risk-inspection-success/${id}/${type}`);
      } else {
        console.log("PUT request failed");
        // Handle failure, show error messages, etc.
      }
    } catch (error) {
      console.error("Error sending PUT request:", error);
      // Handle error, show error messages, etc.
    }
  };

  const fetchGetRiskInspectionData = async () => {
    try {
      const response = await axios.get(
        `${baseURL}riskInspection/quotationDetails/${type}`
      );
      console.log("response", response);

      if (response.status === 200) {
        console.log("GET request successful");
        let newRiskdata = response?.data?.data;
        console.log("newRiskdata", newRiskdata);

        //setGetRiskInspentionData(response?.data?.data);
        newRiskdata.map((item) => {
          console.log("item--data", item.documentType);
          if (item.documentType == "Front Shot") {
            setGetImgRes(item?.fileUrl);
            setGetImgResStatus(item.status);
            if (item.status === "Rejected") {
              setGetImgResReason(item.reason);
            }
          }
          if (item.documentType == "Rear Shot") {
            setGetRearRes(item?.fileUrl);
            setGetRearResStatus(item.status);
            if (item.status === "Rejected") {
              setGetRearResReason(item.reason);
            }
          }
          if (item.documentType == "Left Shot") {
            setGetLeftRes(item?.fileUrl);
            setGetLeftResStatus(item.status);
            if (item.status === "Rejected") {
              setGetLeftResReason(item.reason);
            }
          }
          if (item.documentType == "Right Shot") {
            setGetRightRes(item?.fileUrl);
            setGetRightResStatus(item.status);
            if (item.status === "Rejected") {
              setGetRightResReason(item.reason);
            }
          }
          if (item.documentType == "Front Left Angle Shot") {
            setGetLeftFrontRes(item?.fileUrl);
            setGetLeftFrontResStatus(item.status);
            if (item.status === "Rejected") {
              setGetLeftFrontResReason(item.reason);
            }
          }
          if (item.documentType == "Front Right Angle Shot") {
            setGetRightFrontRes(item?.fileUrl);
            setGetRightFrontResStatus(item.status);
            if (item.status === "Rejected") {
              setGetRightFrontResReason(item.reason);
            }
          }
          if (item.documentType == "Rear Left Angle Shot") {
            setGetLeftRearRes(item?.fileUrl);
            setGetLeftRearResStatus(item.status);
            if (item.status === "Rejected") {
              setGetLeftRearResReason(item.reason);
            }
          }
          if (item.documentType == "Rear Right Angle Shot") {
            setGetRightRearRes(item?.fileUrl);
            setGetRightRearResStatus(item.status);
            if (item.status === "Rejected") {
              setGetRightRearResReason(item.reason);
            }
          }
          if (item.documentType == "Internal Shot") {
            setGetInternalRes(item?.fileUrl);
            setGetInternalResStatus(item.status);
            if (item.status === "Rejected") {
              setGetInternalResReason(item.reason);
            }
          }
        });
      } else {
        console.log("GET request failed");
      }

      if (response?.data?.statusCode === 9611) {
        console.log("Document Already Submited");
        message.success(response?.data?.data);
        history.push("document-already-uploaded");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /// multiple ----
  const [imageButtons, setImageButtons] = useState([]);

  const handleAddButton = () => {
    setImageButtons((prevButtons) => [...prevButtons, Date.now()]);
  };

  const handleRemoveButton = (timestamp) => {
    setImageButtons((prevButtons) =>
      prevButtons.filter((buttonTimestamp) => buttonTimestamp !== timestamp)
    );
  };

  const handleImageChange = (event, timestamp) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };
  const statusClass =
    status === "Approved" ? "approved" : status === "Rejected" ? "reject" : "";

  return (
    <>
      {loading ? <Spin indicator={antIcon} /> : ""}
      {/* <FullPageLoader fromapploader={loading} /> */}
      {/* {getRiskInspentionData[0].fileUrl} */}

      <div class="email-container">
        <div class="middle-section">
          <img
            src="https://oona-ph-bucket.s3.amazonaws.com/report/6194c01f1dabcfbeeb2b451cfbca1587b8718b3c2a22c34a0c01742d601b8438.png"
            alt="motor Image"
            class="img1"
          />
          <div className="title">
            {" "}
            <h3>Upload images</h3>
          </div>
          <div className="sub_title">
            <h6>
              Note:Click on each block to capture & upload relevent images.{" "}
            </h6>
          </div>
          {/* <Upload
        // customRequest={customRequest}
        beforeUpload={beforeUpload}
        fileList={fileList}
        // onChange={handleChange}
        listType="picture-card"
        accept="image/*"
      >
        {fileList.length >= 1 ? null : (
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        )}
      </Upload> */}

          <Row gutter={[16, 16]}>
            <Col xs={12} sm={12} md={12} lg={6} xl={6} style={{ width: "50%" }}>
              <div className="upload-card">
                <Upload
                  onChange={handleUpload}
                  fileList={fileList}
                  beforeUpload={beforeUpload}
                  showUploadList={false}
                  disabled={getImgResStatus === "Approved"}
                >
                  {fileList.length === 0 ? (
                    <div className="upload-button1 img">
                      {" "}
                      <img src={getImgRes ? getImgRes : car1} />
                    </div>
                  ) : (
                    <div className="picture-card">
                      {previewImage ? (
                        <>
                          <img src={previewImage} alt="Preview Image" />
                        </>
                      ) : (
                        <img src={getImgRes} alt="Get Image" />
                      )}
                    </div>
                  )}
                </Upload>

                {/* {car1 ? "" : <><Button
                      className="delete-button"
                      icon={<CloseOutlined />} 
                      onClick={onRemove}
                    /></>} */}
                {fileList.length > 0 ? (
                  <>
                    {flagRemove && (
                      <Button
                        className="delete-button"
                        icon={<CloseOutlined />}
                        onClick={onRemove}
                      />
                    )}
                  </>
                ) : (
                  ""
                )}
                {/* {fileList.length && getImgRes === 0 || "" ? (<div className="upload-button1 img">
                      {" "}
                      <img src={car1} />
                    </div>) : (
                  <>
                  {flagRemove && (<Button
                      className="delete-button"
                      icon={<CloseOutlined />} 
                      onClick={onRemove}
                    />)}
                    
                  </>
                )} */}
                <div
                  className={`car-shot ${
                    getImgResStatus === "Approved"
                      ? "approved"
                      : getImgResStatus === "Rejected"
                      ? "rejected"
                      : ""
                  }`}
                  style={{ textAlign: "center" }}
                >
                  <p>
                    Front Shot {getImgResStatus && ` : ${getImgResStatus}`}
                    {getImgRes ? null : (
                      <>
                        <span style={{ color: "red", marginLeft: "5px" }}>
                          *
                        </span>
                      </>
                    )}
                  </p>
                  {getImgRes && (
                    <div>
                      {getImgResStatus === "Rejected" && (
                        <p>Reason: {getImgResReason}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Col>

            <Col xs={12} sm={12} md={12} lg={6} xl={6} style={{ width: "50%" }}>
              <div className="upload-card">
                <Upload
                  onChange={handleUploadRear}
                  fileList={fileListRear}
                  beforeUpload={beforeUploadRear}
                  showUploadList={false}
                  disabled={ getRearResStatus === "Approved"}
                >
                  {fileListRear.length === 0 ? (
                    <div className="upload-button1 img">
                      {" "}
                      <img src={getRearRes ? getRearRes : car2} />
                    </div>
                  ) : (
                    <div className="picture-card">
                      {previewImageRear ? (
                        <>
                          <img src={previewImageRear} alt="Uploaded" />
                        </>
                      ) : (
                        <img src={getRearRes} alt="Uploaded" />
                      )}
                    </div>
                  )}
                </Upload>
                {/* {fileListRear.length && getRearRes === 0 || "" ? ( */}
                {fileListRear.length || "" ? (
                  <>
                    {flagRemoveRear && (
                      <Button
                        className="delete-button"
                        icon={<CloseOutlined />}
                        onClick={onRemoveRear}
                      />
                    )}
                  </>
                ) : (
                  ""
                )}

                <div
                  className={`car-shot ${
                    getRearResStatus === "Approved"
                      ? "approved"
                      :  getRearResStatus === "Rejected"
                      ? "rejected"
                      : ""
                  }`}
                  style={{ textAlign: "center" }}
                >
                  <p>
                    Rear Shot {getRearResStatus && ` : ${getRearResStatus}`}
                    {getImgRes ? null : (
                      <>
                        <span style={{ color: "red", marginLeft: "5px" }}>
                          *
                        </span>
                      </>
                    )}
                  </p>
                  {getRearRes && (
                    <div>
                      {getRearResStatus === "Rejected" && (
                        <p>Reason: {getRearResReason}</p>
                      )}
                    </div>
                  )}
                </div>

                <p></p>
              </div>
            </Col>

            <Col xs={12} sm={12} md={12} lg={6} xl={6} style={{ width: "50%" }}>
              <div className="upload-card">
                <Upload
                  onChange={handleUploadLeft}
                  fileList={fileListLeft}
                  beforeUpload={beforeUploadLeft}
                  showUploadList={false}
                  disabled={ getLeftResStatus==="Approved"}
                >
                  {fileListLeft.length === 0 ? (
                    <div className="upload-button1 img">
                      {" "}
                      <img src={getLeftRes ? getLeftRes : car3} />
                    </div>
                  ) : (
                    <div className="picture-card">
                      {previewImageLeft ? (
                        <>
                          <img src={previewImageLeft} alt="Uploaded" />
                        </>
                      ) : (
                        <img src={getLeftRes} alt="Uploaded" />
                      )}
                    </div>
                  )}
                </Upload>
                {/* {fileListLeft.length && getLeftRes === 0 || "" ? ( */}
                {fileListLeft.length || "" ? (
                  <>
                    {flagRemoveLeftRear && (
                      <Button
                        className="delete-button"
                        icon={<CloseOutlined />}
                        onClick={onRemoveLeft}
                      />
                    )}
                  </>
                ) : (
                  ""
                )}

                <div
                  className={`car-shot ${
                    getLeftResStatus === "Approved"
                      ? "approved"
                      : getLeftResStatus === "Rejected"
                      ? "rejected"
                      : ""
                  }`}
                  style={{ textAlign: "center" }}
                >
                  <p>
                    Left Shot {getLeftResStatus && ` : ${getLeftResStatus}`}
                    {getImgRes ? null : (
                      <>
                        <span style={{ color: "red", marginLeft: "5px" }}>
                          *
                        </span>
                      </>
                    )}
                  </p>
                  {getLeftRes && (
                    <div>
                      {getLeftResStatus === "Rejected" && (
                        <p>Reason: {getLeftResReason}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Col>

            <Col xs={12} sm={12} md={12} lg={6} xl={6} style={{ width: "50%" }}>
              <div className="upload-card">
                <Upload
                  onChange={handleUploadRight}
                  fileList={fileListRight}
                  beforeUpload={beforeUploadRight}
                  showUploadList={false}
                  disabled={getRightResStatus === "Approved"}
                >
                  {fileListRight.length === 0 ? (
                    <div className="upload-button1 img">
                      {" "}
                      <img src={getRightRes ? getRightRes : car4} />
                    </div>
                  ) : (
                    <div className="picture-card">
                      {previewImageRight ? (
                        <>
                          <img src={previewImageRight} alt="Uploaded" />
                        </>
                      ) : (
                        <img src={getRightRes} alt="Uploaded" />
                      )}
                    </div>
                  )}
                </Upload>
                {/* {fileListRight.length && getRightRes === 0 || "" ? ( */}
                {fileListRight.length || "" ? (
                  <>
                    {flagRemoveRightRear && (
                      <Button
                        className="delete-button"
                        icon={<CloseOutlined />}
                        onClick={onRemoveRight}
                      />
                    )}
                  </>
                ) : (
                  ""
                )}

                <div
                  className={`car-shot ${
                    getRightResStatus === "Approved"
                      ? "approved"
                      :   getRightResStatus === "Rejected"
                      ? "rejected"
                      : ""
                  }`}
                  style={{ textAlign: "center" }}
                >
                  <p>
                    Right Shot {getRightResStatus && ` : ${getRightResStatus}`}
                    {getImgRes ? null : (
                      <>
                        <span style={{ color: "red", marginLeft: "5px" }}>
                          *
                        </span>
                      </>
                    )}
                  </p>
                  {getRightRes && (
                    <div>
                      {getRightResStatus === "Rejected" && (
                        <p>Reason: {getRightResReason}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Col>

            <Col xs={12} sm={12} md={12} lg={6} xl={6} style={{ width: "50%" }}>
              <div className="upload-card">
                <Upload
                  onChange={handleUploadFrontLeftAShort}
                  fileList={fileListFrontLeftAShort}
                  beforeUpload={beforeUploadFrontLeftAShort}
                  showUploadList={false}
                  disabled={  getLeftFrontResStatus === "Approved"}
                >
                  {fileListFrontLeftAShort.length === 0 ? (
                    <div className="upload-button1 img">
                      {" "}
                      <img src={getLeftFrontRes ? getLeftFrontRes : car8} />
                    </div>
                  ) : (
                    <div className="picture-card">
                      {previewImageFrontLeftAShort ? (
                        <>
                          <img
                            src={previewImageFrontLeftAShort}
                            alt="Uploaded"
                          />
                        </>
                      ) : (
                        <img src={getLeftFrontRes} alt="Uploaded" />
                      )}
                    </div>
                  )}
                </Upload>
                {/* {fileListFrontLeftAShort.length && getLeftFrontRes === 0 || "" ? ( */}
                {fileListFrontLeftAShort.length || "" ? (
                  <>
                    {flagRemoveLeftFrontRes && (
                      <Button
                        className="delete-button"
                        icon={<CloseOutlined />}
                        onClick={onRemoveFrontLeftAShort}
                      />
                    )}
                  </>
                ) : (
                  ""
                )}

                <div
                  className={`car-shot ${
                    getLeftFrontResStatus === "Approved"
                      ? "approved"
                      :  getLeftFrontResStatus  === "Rejected"
                      ? "rejected"
                      : ""
                  }`}
                  style={{ textAlign: "center" }}
                >
                  <p>
                    Front Left Angle Shot{" "}
                    {getLeftFrontResStatus && ` : ${getLeftFrontResStatus}`}
                    {getImgRes ? null : (
                      <>
                        <span style={{ color: "red", marginLeft: "5px" }}>
                          *
                        </span>
                      </>
                    )}
                  </p>
                  {getLeftFrontRes && (
                    <div>
                      {getLeftFrontResStatus === "Rejected" && (
                        <p>Reason: {getLeftFrontResReason}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Col>

            <Col xs={12} sm={12} md={12} lg={6} xl={6} style={{ width: "50%" }}>
              <div className="upload-card">
                <Upload
                  onChange={handleUploadFrontRightAShort}
                  fileList={fileListFrontRightAShort}
                  beforeUpload={beforeUploadFrontRightAShort}
                  showUploadList={false}
                  disabled={ getRightFrontResStatus === "Approved"}
                >
                  {fileListFrontRightAShort.length === 0 ? (
                    <div className="upload-button1 img">
                      {" "}
                      <img src={getRightFrontRes ? getRightFrontRes : car9} />
                    </div>
                  ) : (
                    <div className="picture-card">
                      {previewImageFrontRightAShort ? (
                        <>
                          <img
                            src={previewImageFrontRightAShort}
                            alt="Uploaded"
                          />
                        </>
                      ) : (
                        <>
                          <img src={getRightFrontRes} alt="Uploaded" />
                        </>
                      )}
                    </div>
                  )}
                </Upload>

                {/* {fileListFrontRightAShort.length && getRightFrontRes === 0 || "" ? ( */}
                {fileListFrontRightAShort.length || "" ? (
                  <>
                    {flagRemoveRightFrontRes && (
                      <Button
                        className="delete-button"
                        icon={<CloseOutlined />}
                        onClick={onRemoveFrontRightAShort}
                      />
                    )}
                  </>
                ) : (
                  ""
                )}

                <div
                  className={`car-shot ${
                    getRightFrontResStatus === "Approved"
                      ? "approved"
                      :  getRightFrontResStatus  === "Rejected"
                      ? "rejected"
                      : ""
                  }`}
                  style={{ textAlign: "center" }}
                >
                  <p>
                    Front Right Angle Shot{" "}
                    {getRightFrontResStatus && ` : ${getRightFrontResStatus}`}
                    {getImgRes ? null : (
                      <>
                        <span style={{ color: "red", marginLeft: "5px" }}>
                          *
                        </span>
                      </>
                    )}
                  </p>
                  {getRightFrontRes && (
                    <div>
                      {getRightFrontResStatus === "Rejected" && (
                        <p>Reason: {getRightFrontResReason}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Col>

            <Col xs={12} sm={12} md={12} lg={6} xl={6} style={{ width: "50%" }}>
              <div className="upload-card">
                <Upload
                  onChange={handleUploadLeftRearAShort}
                  fileList={fileListLeftRearAShort}
                  beforeUpload={beforeUploadLeftRearAShort}
                  showUploadList={false}
                  disabled={ getLeftRearResStatus === "Approved"}
                >
                  {fileListLeftRearAShort.length === 0 ? (
                    <div className="upload-button1 img">
                      {" "}
                      <img src={getLeftRearRes ? getLeftRearRes : car5} />
                    </div>
                  ) : (
                    <div className="picture-card">
                      {previewImageLeftRearAShort ? (
                        <>
                          <img
                            src={previewImageLeftRearAShort}
                            alt="Uploaded"
                          />
                        </>
                      ) : (
                        <>
                          <img src={getLeftRearRes} alt="Uploaded" />
                        </>
                      )}
                    </div>
                  )}
                </Upload>
                {/* {fileListLeftRearAShort.length && getLeftRearRes === 0 || "" ? ( */}
                {fileListLeftRearAShort.length || "" ? (
                  <>
                    {flagRemoveLeftRearRes && (
                      <Button
                        className="delete-button"
                        icon={<CloseOutlined />}
                        onClick={onRemoveLeftRearAShort}
                      />
                    )}
                  </>
                ) : (
                  ""
                )}

                <div
                  className={`car-shot ${
                    getLeftRearResStatus === "Approved"
                      ? "approved"
                      : getLeftRearResStatus   === "Rejected"
                      ? "rejected"
                      : ""
                  }`}
                  style={{ textAlign: "center" }}
                >
                  <p>
                    Rear Left Angle Shot{" "}
                    {getLeftRearResStatus && ` : ${getLeftRearResStatus}`}
                    {getImgRes ? null : (
                      <>
                        <span style={{ color: "red", marginLeft: "5px" }}>
                          *
                        </span>
                      </>
                    )}
                  </p>
                  {getLeftRearRes && (
                    <div>
                      {getLeftRearResStatus === "Rejected" && (
                        <p>Reason: {getLeftRearResReason}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Col>

            <Col xs={12} sm={12} md={12} lg={6} xl={6} style={{ width: "50%" }}>
              <div className="upload-card">
                <Upload
                  onChange={handleUploadRightRearAShort}
                  fileList={fileListRightRearAShort}
                  beforeUpload={beforeUploadRightRearAShort}
                  showUploadList={false}
                  disabled={ getRightRearResStatus === "Approved"}
                >
                  {fileListRightRearAShort.length === 0 ? (
                    <div className="upload-button1 img">
                      {" "}
                      <img src={getRightRearRes ? getRightRearRes : car6} />
                    </div>
                  ) : (
                    <div className="picture-card">
                      {previewImageRightRearAShort ? (
                        <img src={previewImageRightRearAShort} alt="Uploaded" />
                      ) : (
                        <img src={getRightRearRes} alt="Uploaded" />
                      )}
                    </div>
                  )}
                </Upload>
                {/* {fileListRightRearAShort.length && getRightRearRes === 0 || "" ? ( */}
                {fileListRightRearAShort.length || "" ? (
                  <>
                    {flagRemoveRightRearRes && (
                      <Button
                        className="delete-button"
                        icon={<CloseOutlined />}
                        onClick={onRemoveRightRearAShort}
                      />
                    )}
                  </>
                ) : (
                  ""
                )}

                <div
                  className={`car-shot ${
                    getRightRearResStatus === "Approved"
                      ? "approved"
                      : getRightRearResStatus === "Rejected"
                      ? "rejected"
                      : ""
                  }`}
                  style={{ textAlign: "center" }}
                >
                  <p>
                    Rear Right Angle Shot
                    {getRightRearResStatus && ` : ${getRightRearResStatus}`}
                    {getRightRearRes ? null : (
                      <>
                        <span style={{ color: "red", marginLeft: "5px" }}>
                          *
                        </span>
                      </>
                    )}
                  </p>
                  {getImgRes && (
                    <div>
                      {getRightRearResStatus === "Rejected" && (
                        <p>Reason: {getRightRearResReason}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Col>

            <Col xs={12} sm={12} md={12} lg={6} xl={6} style={{ width: "50%" }}>
              <div className="upload-card">
                <Upload
                  onChange={handleUploadInternalShort}
                  fileList={fileListInternalShort}
                  beforeUpload={beforeUploadInternalShort}
                  showUploadList={false}
                  disabled={ getInternalResStatus=== "Approved"}
                >
                  {fileListInternalShort.length === 0 ? (
                    <div className="upload-button1 img">
                      {" "}
                      <img src={getInternalRes ? getInternalRes : car7} />
                    </div>
                  ) : (
                    <div className="picture-card">
                      {previewImageInternalShort ? (
                        <img src={previewImageInternalShort} alt="Uploaded" />
                      ) : (
                        <img src={getInternalRes} alt="Uploaded" />
                      )}
                    </div>
                  )}
                </Upload>
                {/* {fileListInternalShort.length && getInternalRes === 0 || "" ? ( */}
                {fileListInternalShort.length || "" ? (
                  <>
                    {flagRemoveInternalRes && (
                      <Button
                        className="delete-button"
                        icon={<CloseOutlined />}
                        onClick={onRemoveInternalShort}
                      />
                    )}
                  </>
                ) : (
                  ""
                )}

                <div
                  className={`car-shot ${
                    getInternalResStatus=== "Approved"
                      ? "approved"
                      :  getInternalResStatus === "Rejected"
                      ? "rejected"
                      : ""
                  }`}
                  style={{ textAlign: "center" }}
                >
                  <p>
                    Internal Shot{" "}
                    {getInternalResStatus && ` : ${getInternalResStatus}`}
                    {getImgRes ? null : (
                      <>
                        <span style={{ color: "red", marginLeft: "5px" }}>
                          *
                        </span>
                      </>
                    )}
                  </p>
                  {getInternalRes && (
                    <div>
                      {getInternalResStatus === "Rejected" && (
                        <p>Reason: {getInternalResReason}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Col>

            {/* <Col xs={12} sm={12} md={6} lg={6} xl={6} style={{ width: "50%" }}>
              <div className="upload-card">
                <Upload
                  onChange={handleUploadOtherShort}
                  fileList={fileListOtherShort}
                  beforeUpload={beforeUploadOtherShort}
                  showUploadList={false}
                >
                  {fileListOtherShort.length === 0 ? (
                    <div className="upload-button1 img">
                      {" "}
                      <div className="addmore">
                         <p style={{fontSize: '25px'}}><PlusOutlined /></p>
                        <p>Add Image</p>
                      </div>
                      
                      
                    </div>
                  ) : (
                    <div className="picture-card">
                      <img
                        src={previewImageInternalShort}
                        alt="Uploaded"
                      />
                    </div>
                  )}
             
                </Upload>
                {fileListOtherShort.length === 0 ? (
                  ""
                ) : (
                  <>
                    <Button
                      className="delete-button"
                      icon={<CloseOutlined />}
                      onClick={onRemoveOtherShort}
                    />
                  </>
                )}

                <div className="car-shot" style={{ textAlign: "center" }}><p>Other damage/s or non-standard accessories</p></div>
              </div>
            </Col>  */}

            {imageButtons.map((timestamp) => (
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
                style={{ width: "70%" }}
              >
                <div key={timestamp}>
                  {/* <input type="file" accept="image/*" onChange={(event) => handleImageChange(event, timestamp)} /> */}
                  <div className="upload-card">
                    <Upload
                      onChange={(event) => handleImageChange(event, timestamp)}
                      fileList={fileListOtherShort}
                      beforeUpload={beforeUploadOtherShort}
                      showUploadList={false}
                    >
                      {fileListOtherShort.length === 0 ? (
                        <div className="upload-button1 img">
                          {" "}
                          <div className="addmore">
                            <p style={{ fontSize: "25px" }}>
                              <PlusOutlined />
                            </p>
                            <p>Add Image</p>
                          </div>
                        </div>
                      ) : (
                        <div className="picture-card">
                          <img src={previewImageInternalShort} alt="Uploaded" />
                        </div>
                      )}
                    </Upload>
                    {fileListOtherShort.length === 0 ? (
                      <>
                        <Button
                          className="delete-button"
                          icon={<CloseOutlined />}
                          onClick={onRemoveOtherShort}
                        />
                      </>
                    ) : (
                      ""
                    )}

                    <div className="car-shot" style={{ textAlign: "center" }}>
                      <p>Other damage/s or non-standard accessories</p>
                    </div>
                  </div>
                  <button
                    className="remove-card-all"
                    onClick={() => handleRemoveButton(timestamp)}
                  >
                    Remove
                  </button>
                </div>
              </Col>
            ))}
            <button className="add-butto-multiple" onClick={handleAddButton}>
              <div className="addmore">
                <p style={{ fontSize: "25px" }}>
                  <PlusOutlined />
                </p>
                <p>Add Image</p>
              </div>
            </button>
          </Row>

          <div className="btndiv">
            {/* <Button className="backbtn" onClick={showModal}>
              Back
            </Button>
            <Modal
              className="modal-footer-content"
              visible={isModalOpen}
              okText="Yes"
              cancelText="No,Back to photo uplaod"
              onOk={onClickYes}
              onCancel={() => setIsModalOpen(false)}
              okButtonProps={{ className: "custom-ok-btn" }}
              cancelButtonProps={{ className: "custom-cancel-btn" }}
              // style={{ top: "50px", left: "10px" }}
            >
              <h2>Cancel Uploading Images</h2>
              <div className="msg">
                <h4>Are you sure you want to cancel uploading of images?</h4>
              </div>
            </Modal> */}

            <Button className="next" onClick={handleUpdate}>
              Submit
              <ArrowRightOutlined />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InspectionFileUpload;
