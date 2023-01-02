import React, { useState } from "react";
import { ImQrcode } from "react-icons/im";
import { FaQrcode } from "react-icons/fa";
function QrCode() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <a className="product-detail__qrcode" onClick={() => setShowModal(true)}>
        {" "}
        <FaQrcode className="qrcode" />{" "}
      </a>
      {showModal && (
        <div className="modal__qr">
          <span className="modal__hide" onClick={() => setShowModal(false)}>
            X
          </span>
          <ImQrcode className="modal__qrcode" />
        </div>
      )}
    </>
  );
}

export default QrCode;
