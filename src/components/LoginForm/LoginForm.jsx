import React from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input, Button, Avatar, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./LoginForm.module.scss";
import { setCookie, getCookie } from "../../helpers/cookies";
import { setCart } from "../../pages/CartPage/cartSlice";
import {
  useLoginCustomerMutation,
  useGetCustomerMutation,
} from "../../API/siteAPI.js";
import { } from "../../pages/CartPage/cartSlice";
import { useGetCartMutation, useUpdateCartMutation } from "../../API/cartAPI.js";
// import { useAddToCartMutation } from "../../API/cartAPI";

const LoginForm = (props) => {
  const { setModalVisible, setLogged, setUser, setAccessToken, setModalType } =
    props;
  const dispatch = useDispatch();
  // const token = useSelector(({ header }) => header.setAccessToken, shallowEqual);

  const [loginCustomer] = useLoginCustomerMutation();
  const [getCustomer] = useGetCustomerMutation();
  const [getCart] = useGetCartMutation();
  // const [addProductToCart, { data, isLoading }] = useAddToCartMutation();
  const [updateCart] = useUpdateCartMutation();

  const openNotification = (title, message) => {
    notification["error"]({
      message: title,
      description: message,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  const onFinish = async (values) => {
    console.log('login values', values)
    dispatch(setModalVisible(false));
    try {
      const { token } = await loginCustomer({
        loginOrEmail: values.email,
        password: values.password,
      }).unwrap();
      // dispatch(setAccessToken(token));
      console.log('login values', token)

      dispatch(setLogged(true));
      setCookie("accessToken", token, 10);
    } catch ({ data }) {
      const message = data.password ? data.password : data.loginOrEmail;
      openNotification(`Помилка!`, message);
    }


    /// ПРОБУЮ СОЕДИНИТЬ ТОВАРЫ В КОРЗИНЕ И В ЛОКАЛСТОРАДЖЕ И ОТПРАВИТЬ ИХ В БАЗУ ДАННЫХ, НО НЕ РАБОТАЮТ КНОПКИ + - УДАЛИТЬ   У НЕЗАЛОГИНИНОГО ПОЛЬЗОВАТЕЛЯ
    // try {
    //   // const cartData = await addProductToCart(card._id)
    //   const productFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || []
    //   console.log('productFromLocalStorage из логин формы перед получением корзины из БД', productFromLocalStorage)


    //   const productAddToCart = productFromLocalStorage.map(i => {
    //     return {
    //       product: `${i.product._id}`,
    //       cartQuantity: i.cartQuantity
    //     }
    //   })
    //   console.log('ТО ЧТО ПОЙДЕТ В ЗАПРОС НА АПДЕЙТ КОРЗНЫ', productAddToCart)
    //   const cartBeforeLogin = await getCart()
    //   console.log('ЧТО БЫЛО В КОРЗИНЕ В БД', cartBeforeLogin)


    //   const cartDataUpdated = await updateCart({ products: productAddToCart })
    //   console.log('ПОСДЕ АПДЕЙТА КОРЗИНЫ ОТВЕТ СЕРВЕРА', cartDataUpdated)



    // } catch ({ data }) {
    //   console.log(' ERROR ПОСДЕ АПДЕЙТА КОРЗИНЫ ОТВЕТ СЕРВЕРА', data.error)

    // }

    try {
      const token = getCookie("accessToken");
      const customer = await getCustomer(token);
      // console.log('const customer = await getCustomer(token)', customer)
      dispatch(setUser(customer.data));
      const cart = await getCart()

      if (cart.data.products) { dispatch(setCart(cart.data)) }
      // else{dispatch(setCart({userCart:{products:[]}}))}
      ////////////////////////////////      

    } catch (error) {
      console.log("Get customer error", error);
    }
  };

  const goToReg = () => {
    setModalType("signup");
  };

  const doRemind = () => {
    setModalType("remind");
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
      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          className={styles.facebook}>
          Увійти за допомогою facebook
        </Button>
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

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Будь ласка, введіть свій пароль!",
          },
        ]}>
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Пароль"
        />
      </Form.Item>
      <Form.Item>
        <span onClick={doRemind} className={styles.forgot}>
          Забули пароль?
        </span>
      </Form.Item>

      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          className={styles.button}>
          Увійдіть
        </Button>
      </Form.Item>
      <div className={styles.wrap}>
        <span className={styles.register}>або</span>
        <span className={styles.remind} onClick={goToReg}>
          Зареєструйтесь зараз!
        </span>
      </div>
    </Form>
  );
};

export default LoginForm;
