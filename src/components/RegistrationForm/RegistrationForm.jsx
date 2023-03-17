import React from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input, Checkbox, Button, Avatar, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./RegistrationForm.module.scss";
import { useCreateCustomerMutation } from "../../API/siteAPI.js";
import { useLoginCustomerMutation, useGetCustomerMutation, } from "../../API/siteAPI.js";
import { setCookie } from "../../helpers/cookies";

const RegistrationForm = (props) => {
  const { setModalVisible, setLogged, setUser, setAccessToken } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [createCustomer] = useCreateCustomerMutation();
  const [loginCustomer] = useLoginCustomerMutation();
  const [getCustomer] = useGetCustomerMutation();
  // console.log('props', props)
  // console.log('createCustomer', createCustomer)

  const openNotification = (type, title, message) => {
    // console.log('type', type)
    // console.log('title', title)
    // console.log('message', message)
    notification[type]({
      message: title,
      description: message,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };



  const onFinish = async (values) => {
    // console.log('values  onFinish', values)
    try {
      const res = await createCustomer({
        firstName: values.firstName,
        lastName: values.lastName,
        login: values.lastName,
        email: values.email,
        password: values.password,
        telephone: "+380500000000",
        gender: "other",
        avatarUrl: "https://picsum.photos/200/300?random=1",
        isAdmin: true,
      }).unwrap();
      console.log(res.email)
      console.log(values.password)
      try {
        const { token } = await loginCustomer({
          loginOrEmail: res.email,
          password: values.password,
        }).unwrap();
        console.log(token)
        // dispatch(setAccessToken(token));
        dispatch(setLogged(true));
        setCookie("accessToken", token, 1);
        const customer = await getCustomer(token);
        dispatch(setUser(customer.data));
      } catch ({ data }) {
        const message = data.password ? data.password : data.loginOrEmail;
        openNotification(`Помилка!`, message);
      }


      dispatch(setModalVisible(false));
      openNotification("success", "Ви успішно зареєстровані!", "Авторизуйтесь");
    } catch ({ data }) {
      console.log(data)

      openNotification("error", "Помилка: ", data.message);


    }

  };

  return (
    <Form
      form={form}
      name="normal_login"
      onFinish={onFinish}
      scrollToFirstError>
      <div>
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
          />
        </Form.Item>
      </div>
      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          className={styles.fbutton}>
          Зареєструватись за допомогою facebook
        </Button>
      </Form.Item>

      <Form.Item

        name="firstName"
        rules={[
          {
            required: true,
            message: "Будь ласка, введіть своє ім'я!",
            whitespace: true,
          },
          {
            min: 3,
            whitespace: true,
            message: "Ім'я має містити щонайменше 3 символи."
          },
          {
            whitespace: true,
            pattern: new RegExp(/^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i),
            message: "Ім'я має містити тільки літери."
          }
        ]}>
        <Input placeholder="Ваше ім'я" />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[
          {
            required: true,
            message: "Будь ласка, введіть своє прізвище!",
            whitespace: true,
          },
          {
            whitespace: true,
            pattern: new RegExp(/^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i),
            message: "Прізвище має містити тільки літери."
          },
          {
            min: 3,
            whitespace: true,
            message: "Прізвище має містити щонайменше 3 символи."
          }
        ]}>
        <Input placeholder="Ваше прізвище" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "Введений недійсний email!",
          },
          {
            required: true,
            message: "Будь ласка, введіть свою електронну адресу!",
          },
        ]}
      >
        <Input placeholder="Ваше email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Будь ласка, введіть свій пароль!",
          },
          {
            pattern: new RegExp(/^([a-zA-Z0-9_-]){7,30}$/),
            message: "Пароль має містити 7-30 символів, хоча б одну цифру, великі та маленькі букви латинського алфаївта.",
          },
        ]}
        hasFeedback>
        <Input.Password placeholder="Пароль" />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Будь ласка, підтвердьте свій пароль!",
          },

          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("Два введені вами паролі не збігаються!")
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder="Підтвердьте пароль" />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Слід прийняти угоду")),
          },
        ]}
      >
        <Checkbox>
          Я погоджуюсь з <Link to="">угодою користувача</Link>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          className={styles.button}>
          Створити обліковий запис
        </Button>
      </Form.Item>
    </Form>
  );
};
// user
/* const newCustomer = {
  firstName: "Customer",
  lastName: "Newone",
  login: "Customer",
  email: "customer@gmail.com",
  password: "1111111",
  telephone: "+380630000000",
  gender: "male",
  avatarUrl: "img/customers/023648.png",
  isAdmin: false
} */

export default RegistrationForm;
