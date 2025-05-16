import React, { useState } from "react";
import { Plus, X } from 'lucide-react';
import styles from "./FloatButton.module.css";
import handshake from "../../assets/Images/handshake.png";
import { useHistory } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";

const FloatButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [partnerType, setPartnerType] = useState("agent");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    companyName: "",
    shareMarketing: false
  });
  const [errors, setErrors] = useState({});

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOpenModal = () => {
    setShowModal(true);
    setIsOpen(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setErrors({});
  };

  const handlePartnerTypeChange = (type) => {
    setPartnerType(type);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    }

    if (partnerType === "broker" && !formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // This would normally navigate to a new page as per the requirement
    handleNavigate();
  };

  const handleNavigate = () => {
    setShowModal(false);
    console.log("Form Data=======>", formData);
    history.push("/channelPartnerMaster/all", formData);
  };

  const handleLeadPage = () => {
    dispatch(actions.resetLeadForm());
    dispatch(actions.resetCurrentCustomerId());
    setShowModal(false);
    history.push("/leadmasterpage/statuslead");
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonWrapper}>
        {isOpen && (
          // <div className={styles.popupCard} onClick={handleOpenModal}>
          //   <span className={styles.cardText}>New Prospect Channel Partner</span>
          //   <img src={ handshake } alt="Handshake" className={styles.handshakeIcon} />
          // </div>
          <div className={styles.cardWrapper}>
            <div className={styles.popupCard} onClick={handleOpenModal}>
              <span className={styles.cardText}>New Prospect Channel Partner</span>
              <img src={handshake} alt="Handshake" className={styles.icon} />
            </div>

            <div className={styles.popupCard} onClick={handleLeadPage}>
              <span className={styles.cardText}>Create New Lead</span>
              <img src={handshake} alt="Lead Icon" className={styles.icon} />
            </div>
          </div>

        )}

        <div className={styles.floatButton} onClick={handleToggle}>
          {isOpen ? (
            <X className={styles.icon} />
          ) : (
            <Plus className={styles.icon} />
          )}
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Add Channel Partner</h2>
              <button
                className={styles.closeButton}
                onClick={handleCloseModal}
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formSection}>
                <label className={styles.sectionLabel}>Channel Partner as</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="partnerType"
                      checked={partnerType === "agent"}
                      onChange={() => handlePartnerTypeChange("agent")}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioText}>Agent</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="partnerType"
                      checked={partnerType === "broker"}
                      onChange={() => handlePartnerTypeChange("broker")}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioText}>Broker</span>
                  </label>
                </div>
              </div>

              {partnerType === "broker" && (
                <div className={styles.formSection}>
                  <label className={styles.inputLabel}>
                    Company Name<span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter Company Name"
                    className={`${styles.textInput} ${errors.companyName ? styles.inputError : ""}`}
                  />
                  {errors.companyName && <span className={styles.errorText}>{errors.companyName}</span>}
                </div>
              )}

              {partnerType === "broker" && (
                <div className={styles.formSection}>
                  <h3 className={styles.subheading}>Company Representative Details</h3>
                </div>
              )}

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.inputLabel}>
                    First Name<span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter First Name"
                    className={`${styles.textInput} ${errors.firstName ? styles.inputError : ""}`}
                  />
                  {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.inputLabel}>
                    Last Name<span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter Last Name"
                    className={`${styles.textInput} ${errors.lastName ? styles.inputError : ""}`}
                  />
                  {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.inputLabel}>
                    Email ID<span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter Email ID"
                    className={`${styles.textInput} ${errors.email ? styles.inputError : ""}`}
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.inputLabel}>
                    Mobile No<span className={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Enter Mobile No"
                    className={`${styles.textInput} ${errors.mobile ? styles.inputError : ""}`}
                  />
                  {errors.mobile && <span className={styles.errorText}>{errors.mobile}</span>}
                </div>
              </div>

              <div className={styles.formSection}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="shareMarketing"
                    checked={formData.shareMarketing}
                    onChange={handleInputChange}
                    className={styles.checkboxInput}
                  />
                  <span className={styles.checkboxText}>
                    Share Marketing Collaterals with the Prospect.
                  </span>
                </label>
              </div>

              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                >
                  Add Channel Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatButton;