import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../pages/CartPage/cartSlice";
// import styles from "./CartRows.module.scss";
import styles from "../../pages/CartPage/CartPage.module.scss";
import { Image, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useUpdateCartMutation, useAddToCartMutation, useDecreaseProductQuantityMutation, useDeleteFromCartMutation, useGetCartMutation } from "../../API/cartAPI.js"
import { useSearchParams } from "react-router-dom";

const CartRows = ({ data }
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch()
  const [updateCart] = useUpdateCartMutation()
  const [decreaseProductQuantity] = useDecreaseProductQuantityMutation()
  const [addProductToCart, { q, isLoading }] = useAddToCartMutation();
  const [deleteFromCart, { d, disLoading }] = useDeleteFromCartMutation();
  const [getCart] = useGetCartMutation();
  const {isLogged} = useSelector(store =>  store.header)

  console.log(isLogged);

  const onChange = async (value) => {
    if (isLogged){
      const cartData = await getCart()
      // console.log('cartData', cartData)
      const updated = cartData.data.products.map(i => {  
        if (i.product._id !== data.product._id) {
          return { product: i.product._id, cartQuantity: i.cartQuantity }
        } else {
          // console.log('до', i.product._id)
          const updatedProduct = { product: i.product._id, cartQuantity: value }
          // console.log('после',i.product._id )
          return updatedProduct
        }
      })  
      const quantity = await updateCart({ products: updated })
      console.log(quantity)
      dispatch(setCart(quantity.data))
    }else{
      const productsFromLS = JSON.parse(localStorage.getItem('cart'))
      const productIndex = productsFromLS.products.findIndex((item)=>item.product._id===data.product._id)
      productsFromLS.products[productIndex].cartQuantity = value
      localStorage.setItem('cart', JSON.stringify(productsFromLS))
      dispatch(setCart(productsFromLS))

    }
   
  };
  const deleteItemFromCart = async (produktId) => {
    if (isLogged){
      const cartData = await deleteFromCart(produktId)

      dispatch(setCart(cartData.data))
    } else {
      const productsFromLS = JSON.parse(localStorage.getItem('cart'))
      const filteredProducts = productsFromLS?.products.filter((item)=> item.product._id!=produktId)
      localStorage.setItem('cart',JSON.stringify({products: filteredProducts}))
      dispatch(setCart({products: filteredProducts}))

    }
    
  }

  const { imageUrls, currentPrice } = data.product
  const summ = data.cartQuantity * currentPrice
  return (
    <>
      <tr className="">
        <td className={styles.text} data-title="Картина">
          <Image
            width={150}
            src={imageUrls[0]}
          />
        </td>
        <td className={styles.number} data-title="Ціна">
          {currentPrice}
        </td>
        <td className={styles.number} data-title="Кількість">
          <InputNumber
            defaultValue={data.cartQuantity}
            value={data.cartQuantity}
            min={0}
            size={"large"}
            className={styles.q_input}
            onChange={onChange}
          />
        </td>
        <td className={styles.number} data-title="Вартість">
          {summ}
        </td>
        <td className={styles.basket_column} data-title="Видалити">
          {/* <span>видалити </span> */}
          <DeleteOutlined
            style={{ fontSize: 32 }}
            onClick={() => deleteItemFromCart(data.product._id)}
            className={styles.basket_icon}
          />
        </td>
      </tr>

      <tr className="">
        <td className={styles.text} data-title="Картина"></td>
      </tr>
    </>
  );
};

export default CartRows;
