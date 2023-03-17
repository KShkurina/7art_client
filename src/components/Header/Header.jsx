import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { setCart } from "../../pages/CartPage/cartSlice";
import styles from "./Header.module.scss";
import colors from "../../assets/img/colors.png";
import Logo from "../Logo/Logo";
import ModalWindow from "../ModalWindow/ModalWindow";
import { Input, Badge, Drawer, Divider, Avatar, Menu } from "antd";
import {
  HeartOutlined,
  MobileOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { setCookie, getCookie } from "../../helpers/cookies";
import {
  setModalVisible,
  setLogged,
  setUser,
  setAccessToken,
  setDefaultUser,
} from "./headerSlice.js";

import { useAddNewProductMutation } from "../../API/productAPI.js";
import { useGetCartMutation } from "../../API/cartAPI.js";
import {
  useGetCustomerMutation,
} from "../../API/siteAPI.js";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [newProduct] = useAddNewProductMutation();
  const [getCart] = useGetCartMutation();
  const { userCart } = useSelector((state) => state.cart)
  // const isLogged = useSelector((state)=>state.header.isLogged)
  const isLogged = useSelector(({ header }) => header.isLogged, shallowEqual);
  console.log(isLogged)

  let quantityProducts = userCart?.products?.map(({ cartQuantity }) => cartQuantity).reduce((sum, current) => sum + current, 0)






  // const cartQuantityProduct = arrQuantityProducts.reduce((sum, current) => sum + current, 0);
  // console.log(cartQuantityProduct)
  //! Тимчасово, для зразка як заливати на сервер картки --------------------------------------------------------------------------------------

  /*   const onPush = async () => {
    for (const item of storeGoods) {
      try {
        const res = await newProduct(item).unwrap();
        console.log("post goods res: ", res);
      } catch (error) {
        console.log("post goods error: ", error);
      }
    }
  }; */

  //!--------------------------------------------------------------------------------------
  const [getCustomer] = useGetCustomerMutation();
  // let cartQuantityProduct
  // console.log(cartQuantityProduct)

  const checkIfLoggedIn = async () => {
    try {
      const token = getCookie("accessToken");
      const customer = await getCustomer(token);
      dispatch(setUser(customer.data));
      setCookie("accessToken", token, 1);
      const cart = await getCart()
      console.log('cart', cart)
      if (cart.data !== null) {
        dispatch(setCart(cart.data))
        console.log('не равен null')
      }
    } catch (error) {

    }


  }
  ////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (!isLogged) {
      console.log('CartPage если не залогинин !isLogged', !isLogged)
      const productFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || []
      console.log('Cart  из локалстореджа', productFromLocalStorage)
      dispatch(setCart({ products: productFromLocalStorage.products }))
    }
  }, [isLogged])



  const modalVisible = useSelector(({ header }) => header.modalVisible, shallowEqual);
  // const isLogged = useSelector(({ header }) => header.isLogged, shallowEqual);
  const user = useSelector(({ header }) => header.user, shallowEqual);

  const { Search } = Input;
  const { SubMenu } = Menu;
  const onSearch = (value) => console.log(value);

  const [visible, setVisible] = useState(false);
  const [currentGallery, setCurrentGallery] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [modalType, setModalType] = useState("login");

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  const handleClickGallery = (e) => {
    // console.log("gallery ", e);
    setCurrentGallery({ currentGallery: e.key });
    console.log("Selected: ", e.key);
    console.log("currentGallery: ", currentGallery);
    navigate(`/filter?categories=${e.key}`);
  };

  // const handleClickGallery = (e) => {
  //   console.log("gallery ", e);
  //   setCurrentGallery({ currentGallery: e.key });
  // };

  const handleClick = (e) => {
    console.log(`Click on ${e.key}: `);
    navigate(`/${e.key}`); // тут прилітає або "cart" або "favorite"
  };

  const handleClickAccount = (e) => {
    if (e.key === "signout") {
      dispatch(setLogged(false));
      setCookie("accessToken", "", -1);



      dispatch(setDefaultUser());
      // dispatch(setCart({products:[]}))

      // const cart = await getCart()
      // dispatch(setCart(cart))

    } else {
      setCurrentAccount({ currentAccount: e.key });
      dispatch(setModalVisible(true));
      setModalType(e.key);
    }
  };

  const isTokenPresent = getCookie("accessToken");


  useEffect(() => {
    if (isTokenPresent.length > 0) {

      dispatch(setLogged(true));

      checkIfLoggedIn()

    }
  }, []);

  return (
    <>
      <header>
        <ModalWindow
          type={"signup"}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalType={modalType}
          setLogged={setLogged}
          setUser={setUser}
          setAccessToken={setAccessToken}
          setModalType={setModalType}
        />
        <div className={styles.grid_container}>
          <div className={styles.div1}>
            {/* <button onClick={onPush}>PUSH</button>{" "} кнопка для заливки карток на сервер  */}
            <img src={colors} alt="Colors" className={styles.dots} />
            <div className={styles.burger_menu}>
              <MenuUnfoldOutlined
                onClick={showDrawer}
                style={{ fontSize: 24 }}
              />
              <Drawer
                title={
                  <div className={styles.d_logo}>
                    <Logo />
                  </div>
                }
                placement="top"
                onClose={closeDrawer}
                visible={visible}>
                <Menu
                  onClick={() => {
                    closeDrawer();
                  }}
                  selectedKeys={[currentGallery]}
                  triggerSubMenuAction={"burger"}
                  mode="inline">
                  <Menu.Item key="contacts">(8067) 562-13-37</Menu.Item>
                  <Menu.Item key="about">Про нас</Menu.Item>
                  <SubMenu key="SubMenu" title="Каталог картин">
                    <Menu.Item key="abstractions">Абстракції</Menu.Item>
                    <Menu.Item key="cityscape">Міський пейзаж</Menu.Item>
                    <Menu.Item key="animals">Картини тварин</Menu.Item>
                    <Menu.Item key="modular">Модульні картини</Menu.Item>
                    <Menu.Item key="seascape">Морський пейзаж</Menu.Item>
                    <Menu.Item key="landscape">Пейзаж природи</Menu.Item>
                    <Menu.Item key="oilFlowers">Олійні квіти</Menu.Item>
                    <Menu.Item key="frames">Рамки для картин</Menu.Item>
                  </SubMenu>
                </Menu>
              </Drawer>
            </div>
          </div>
          <div className={styles.div2}>
            <div className={styles.contact_wrapper}>
              <MobileOutlined style={{ fontSize: 24, paddingRight: 10 }} />
              <span className={styles.contact_phone}>
                (8067) 562-13-37
                <Link to="/" className="/contacts">
                  Зв'язатись з нами
                </Link>
              </span>
            </div>
          </div>
          <div className={styles.div3}>
            {isLogged && (
              <div className={styles.account_wrapper_logged}>
                <Avatar
                  src={user.avatarUrl}
                  className={styles.account_avatar}
                />
                <Menu
                  onClick={handleClickAccount}
                  selectedKeys={[currentAccount]}
                  mode="horizontal"
                  className={styles.account_main_logged}>
                  <SubMenu
                    className={styles.account_title_logged}
                    key="SubMenu"
                    title={`${user.firstName} ${user.lastName}`}>
                    <Menu.Item key="private">Особисті дані</Menu.Item>
                    <Menu.Item key="orders">Замовлення</Menu.Item>
                    <Menu.Item key="signout" ><a href="/">Вихід</a></Menu.Item>
                  </SubMenu>
                </Menu>
              </div>
            )}
            {/* {/* account not logged */}
            {!isLogged && (
              <div className={styles.account_wrapper}>
                <Menu
                  onClick={handleClickAccount}
                  selectedKeys={[currentAccount]}
                  mode="horizontal"
                  className={styles.account_main}>
                  <SubMenu
                    className={styles.account_title}
                    key="SubMenu"
                    title="Обліковий запис"
                    icon={
                      <UserOutlined
                        style={{ fontSize: 28, paddingRight: 10 }}
                      />
                    }>
                    <Menu.Item key="login">Авторизація</Menu.Item>
                    <Menu.Item key="signup">Реєстрація</Menu.Item>
                  </SubMenu>
                </Menu>
              </div>
            )}
          </div>
          <div className={styles.div4}>
            <Link to="/" className={styles.header_logo}>
              <div className={styles.logo_wrapper}>
                <Logo spec={"магазин картин"} />
              </div>
            </Link>
          </div>
          <div className={styles.div5}>
            <Menu
              onClick={handleClickGallery}
              selectedKeys={[currentGallery]}
              mode="horizontal"
              className={styles.gallery_main}>
              <SubMenu
                key="SubMenu"
                title="Каталог картин"
                className={styles.gallery_title}>
                <Menu.Item key="abstraction">Абстракції</Menu.Item>
                <Menu.Item key="interior">Інтер'єрні картини</Menu.Item>
                <Menu.Item key="oilModule">Модульні картини олією</Menu.Item>
                <Menu.Item key="cityscape">Міський пейзаж</Menu.Item>
                <Menu.Item key="animals">Картини тварин</Menu.Item>
                <Menu.Item key="seascape">Морський пейзаж</Menu.Item>
                <Menu.Item key="nature">Краєвиди природи</Menu.Item>
                <Menu.Item key="oilFlowers">Квіти олією</Menu.Item>
              </SubMenu>

            </Menu>
          </div>
          <div className={styles.div6}>
            <Link to="/about" className={styles.about_us_link}>
              Про нас
            </Link>
          </div>
          <div className={styles.div7}>
            <Search
              className={styles.search}
              placeholder="Пошук"
              allowClear
              onSearch={onSearch}
              style={{ width: 278 }} //for PC
            // style={{ width: 450 }} //for Tablet
            />
          </div>
          <div className={styles.div8}>
            <Link to="/cart" className={styles.about_us_link}>
              <Badge count={1} className={styles.badge}>
                <HeartOutlined style={{ fontSize: 32 }} />
              </Badge>
              <span className={styles.img_title}>Обране</span>
            </Link>
          </div>
          <div className={styles.div9}>
            <Link to="/cart" className={styles.about_us_link}>
              <Badge count={quantityProducts} className={styles.badge}>
                <ShoppingCartOutlined style={{ fontSize: 32 }} />
              </Badge>
              <span className={styles.img_title}>Корзина</span>
            </Link>
          </div>
        </div>
      </header>
      <Divider className={styles.divider} />
    </>
  );
};

export default Header;
