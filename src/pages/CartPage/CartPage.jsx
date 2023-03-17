
import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import styles from "./CartPage.module.scss";
import { Divider, Button, notification } from "antd";
import CartRows from "../../components/CartRows/CartRows";
import { getCookie } from "../../helpers/cookies";
import {
  useCreateCartMutation,
  useUpdateCartMutation,
  useAddToCartMutation,
  useDecreaseProductQuantityMutation,
  useDeleteFromCartMutation,
  useGetCartMutation,
  useDeleteCartMutation,
} from "../../API/cartAPI.js";
import { useHistory } from "react-router-dom";
import { increment, decrement, setCart } from "./cartSlice.js";
import { useNavigate } from 'react-router-dom';
import { Header } from "antd/lib/layout/layout";

function CartPage() {
  // const dispatch = useDispatch();
  
  // console.log('userCart',userCart.products)
  const [createCart] = useCreateCartMutation();
  const [updateCart] = useUpdateCartMutation();
  const [addToCart] = useAddToCartMutation();
  const [decreaseCart] = useDecreaseProductQuantityMutation();
  const [removeFromCart] = useDeleteFromCartMutation();
  const [getCart] = useGetCartMutation();
  const [deleteCart] = useDeleteCartMutation();
  const { isLogged } = useSelector((state) => state.header)
  const dispatch = useDispatch();
  const navigate = useNavigate();








  //   useEffect(() => {      
  //     if (!isLogged) {
  //       console.log('CartPage если не залогинин !isLogged', !isLogged)
  //     const productFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || []
  //     console.log('Cart  из локалстореджа', productFromLocalStorage)
  //     dispatch(setCart({ products: productFromLocalStorage }))}      
  // },[isLogged])
  console.log('1')
  const products = useSelector(state => state?.cart?.userCart?.products)
  // console.log(products)
  console.log('2')

  const totalPrice = products?.reduce((total, currentValue) => {
    console.log('3')
    return currentValue.cartQuantity * currentValue.product.currentPrice + total
  },
    0)
  console.log('4')
  //  useEffect(()=>{
  //   const cardRows = products.map((i,key) => <CartRows key={key} data={i}/>)
  //   return cardRows
  //  },[products])
  const cardRows = products?.map((i, key) => <CartRows key={key} data={i} />)
  console.log('5')

  const openNotification = (title, message) => {
    console.log('6')
    notification["success"]({
      message: title,
      description: message,
      onClick: () => {
        console.log("Notification Clicked!");
        notification.destroy();
      },

    });
    console.log('7')
  };
  // console.log('cardRows',cardRows)

  // const cartForLoggedInCustomer = async () => {
  //   try {
  //     const {data} = await getCart(getCookie("accessToken"))
  //     console.log('data',data)
  //    dispatch(setCart(data))
  //   } catch (error) {
  //     openNotification('загрузка корзины с сервера', error.message)
  //   }
  // }
  // useEffect(()=>{
  //   cartForLoggedInCustomer()
  // },[])



  // console.log(userCart.products)

  // const cartRow = userCart.products.map((item)=>console.log(item))
  console.log('8')

  return (<>
    {products?.length === 0 &&
      <a className={styles.rg_container} href="/" style={{ textAlign: 'center', textDecoration: 'inherit' }}>
        <div>
          <img
            src="https://st2.depositphotos.com/1007168/6107/v/950/depositphotos_61077089-stock-illustration-black-and-white-horse-cartoon.jpg"
            height='20%' width="20%" alt="" />
        </div>
        <h3>
          Your basket is empty. Click to order.
        </h3>
      </a>}
    {products?.length !== 0 &&
      <div>
        <h2 className={styles.title}>Корзина покупок</h2>
        <div className={styles.rg_container}>
          <table className={styles.rg_table}>
            <thead>
              <tr>
                <th className={styles.text}>Картина</th>
                <th className={styles.number}>Ціна</th>
                <th className={`${styles.number} ${styles.narrow}`}>Кількість</th>
                <th className={styles.number}>Вартість</th>
                <th className={styles.text}></th>
              </tr>
            </thead>
            <tbody>
              {cardRows}

            </tbody>
            <tfoot>
              <tr>
                <th className={styles.total} id="total" colSpan="4">
                  Підсумок :
                </th>
                <td className={styles.number}>{totalPrice}</td>
              </tr>
            </tfoot>
          </table>
          <Divider />
          <div className={styles.button_wrap}>
            <Button
              className={styles.button_1}
              onClick={() => {
                console.log("Продовжити покупки");
              }}>
              Продовжити покупки
            </Button>
            <Button
              className={styles.button_2}
              type="primary"
              onClick={() =>
                // openNotification(
                //   "Дякуємо за замовлення!",
                //   "Наш співробітник зателефонує Вам найближчим часом."
                // )
                navigate('/delivery')

              }>
              Оформити замовлення
            </Button>
          </div>
        </div>
      </div>
    }
  </>
  );
}

export default CartPage;
