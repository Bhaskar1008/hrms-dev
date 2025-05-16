import React, { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import "./OfflineMessage.css";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import { WifiOutlined } from "@ant-design/icons";

function OfflineMessageU(props) {
    const [offlineMessageShown, setOfflineMessageShown] = useState(false);

    const handleOnlineStatusChange = () => {
        if (navigator.onLine) {
            setOfflineMessageShown(true);


            setTimeout(() => {
                setOfflineMessageShown(false);
            }, 1000);
        } else {
            setOfflineMessageShown(true);
            setTimeout(() => {
                setOfflineMessageShown(false);
            }, 2000);
        }
    };

    useEffect(() => {
        handleOnlineStatusChange();

        window.addEventListener("online", handleOnlineStatusChange);
        window.addEventListener("offline", handleOnlineStatusChange);

        if (navigator.onLine) {
            setOfflineMessageShown(false);
        }

        return () => {
            window.removeEventListener("online", handleOnlineStatusChange);
            window.removeEventListener("offline", handleOnlineStatusChange);
        };
    }, [props.data]);

    const handleClose = () => {
        setOfflineMessageShown(false);
    };

    return (
        <div
            className={`offline-message-overlay${offlineMessageShown ? " active" : ""
                }`}
        >
            {offlineMessageShown && !navigator.onLine ? (
                <div className="offline-message">
                    <div style={{ display: "flex", alignItems: "center", color: 'black' }}>
                        <div style={{ marginRight: "10px", fontSize: "24px" }}>
                            <WifiOffIcon sx={{ fontSize: 32 }} />
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <p style={{ fontSize: 12 }}>You are currently offline.</p>
                            <p style={{ fontSize: 12 }}>
                                Certain functionalities are limited. Please connect to the
                                internet as soon as possible to avoid data loss.
                            </p>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-end",
                        }}
                    >
                        <div style={{ cursor: "pointer", color: 'black' }} onClick={handleClose}>
                            <CancelIcon />
                        </div>
                    </div>
                </div>
            ) : null}
            {offlineMessageShown && navigator.onLine ? (
                <div className="offline-message" style={{ backgroundColor: "lightgreen", padding: 10, color: 'black' }}>
                    <div style={{ display: "flex", alignItems: "center", width: "100%", marginLeft: 10 }}>
                        <div style={{ marginRight: "15px", fontSize: 25 }}>
                            <WifiOutlined />
                        </div>
                        <div>
                            <p style={{ textAlign: "left", margin: 0, fontSize: 15 }}>
                                Welcome Back to Online.
                            </p>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default OfflineMessageU;
