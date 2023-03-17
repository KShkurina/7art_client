import React from "react";
import { useDispatch } from "react-redux";
import { Modal } from "antd";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import LoginForm from "../LoginForm/LoginForm";
import RemindForm from "../RemindForm/RemindForm";
import styles from "./ModalWindow.module.scss";

const ModalWindow = (props) => {
  const dispatch = useDispatch();
  const {
    modalVisible,
    setModalVisible,
    modalType,
    setLogged,
    setUser,
    setAccessToken,
    setModalType,
  } = props;

  const handleCancel = () => {
    dispatch(setModalVisible(false));
  };

  let formContent;
  switch (modalType) {
    case "signup":
      formContent = (
        <RegistrationForm
          setModalVisible={setModalVisible}
          setLogged={setLogged}
          setUser={setUser}
          setAccessToken={setAccessToken}
        />
      );
      break;
    case "remind":
      formContent = (
        <RemindForm
          setModalVisible={setModalVisible}
          setLogged={setLogged}
          setUser={setUser}
          setAccessToken={setAccessToken}
          setModalType={setModalType}
        />
      );
      break;

    default:
      formContent = (
        <LoginForm
          setModalVisible={setModalVisible}
          setLogged={setLogged}
          setUser={setUser}
          setAccessToken={setAccessToken}
          setModalType={setModalType}
        />
      );

      break;
  }

  return (
    <Modal
      visible={modalVisible}
      footer={null}
      onCancel={handleCancel}
      centered={true}
      maskClosable={false}
      width={400}
      className={styles.wrapper}>
      {formContent}
    </Modal>
  );
};

export default ModalWindow;
