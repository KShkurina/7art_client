import React from "react";
import { Form, Input, Button, Avatar, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./RemindForm.module.scss";

const RemindForm = (props) => {
  const { setModalType } = props;

  const onFinish = async (values) => {
    openNotification(
      "info",
      "Інформаційне повідомлення",
      "Ця функція тимчасово не підтримується"
    );
  };

  const openNotification = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  const goToLog = () => {
    setModalType("login");
  };

  return (
    <Form
      name="normal_login"
      initialValues={{
        remember: false,
      }}
      onFinish={onFinish}
      className={styles.form}>
      <Form.Item>
        <Avatar
          size={{
            xs: 24,
            sm: 32,
            md: 40,
            lg: 64,
            xl: 80,
            xxl: 100,
          }}
          icon={<UserOutlined />}
          className={styles.avatar}
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "Введений недійсний email !",
          },
          {
            required: true,
            message: "Будь ласка, введіть свою електронну адресу!",
          },
        ]}>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Ваше email"
        />
      </Form.Item>

      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          className={styles.button}>
          Нагадати пароль
        </Button>
      </Form.Item>
      <div className={styles.wrap}>
        <span className={styles.register}>Згадали пароль?</span>
        <br />
        <span className={styles.remind} onClick={goToLog}>
          Авторизуйтесь
        </span>
      </div>
    </Form>
  );
};

export default RemindForm;
