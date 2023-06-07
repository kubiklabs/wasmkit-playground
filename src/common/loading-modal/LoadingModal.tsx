import React, { useState } from "react";
import Modal from "react-modal";
import logo from "../../assets/img/logoLight.png"
import "./LoadingModal.css";
import LoaderContent from "./LoaderContent"; 

const LoadingModal = ({
  isOpen,
  content,
}: {
  isOpen: boolean;
  content: Array<String>;
}) => {
  // const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      // onRequestClose={closeModal}
      contentLabel="Txn"
      className="custom-modal"
    >
      <div className="loading-modal-wrapper">
        <div className="loading-modal-heading">
          Txn in progress. Please do not press back button or refresh the page.
        </div>
        <div className="loading-modal-content-wrapper">
          <img src={logo} />
          <div>
            <LoaderContent action={content[0]} message={content[1]} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LoadingModal;
