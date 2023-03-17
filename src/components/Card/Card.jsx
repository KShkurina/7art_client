import style from "./Card.module.scss"
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddToCartMutation } from "../../API/cartAPI";
import { useGetCartMutation } from "../../API/cartAPI.js";
import { setCard } from "./cardSlice";
import { setCart } from "../../pages/CartPage/cartSlice";
import 'antd/dist/antd.min.css';
import { Carousel } from 'antd';
import { logDOM } from "@testing-library/react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from 'antd';
import ModalCarousel from "../ModalCarousel/ModalCarousel";
import { HomeOutlined } from '@ant-design/icons';
import { getCookie } from "../../helpers/cookies";
import { useGetOneProductMutation } from "../../API/productAPI";
// import { setCart } from "./cartSlice.js";

const contentStyle = {
    // height: '250px',
    height: '400px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const Card = ({ card }) => {
    const [modalActive, setModalActive] = useState(false)
    const { isLogged } = useSelector((state) => state.header)
    const [addProductToCart, { data, isLoading }] = useAddToCartMutation();
    const [getCart] = useGetCartMutation();
    const dispatch = useDispatch()
    // console.log('card', card._id)
    // console.log('isLoading', isLoading)

    // console.log(card.imageUrls)
    let carousel = useRef(null);
    if (!card.imageUrls) return ''





    const addToCart = async () => {
        console.log('>>>>>>card>>>>>', card)
        const token = getCookie("accessToken");
        if (isLogged) {
            try {
                const cartData = await addProductToCart(card._id)
                // console.log('addToCart>>>>>>cartData', cartData.data)
                dispatch(setCart(cartData.data))
                // console.log('addToCart>>>>>>cartData после диспача', cartData.data)
            } catch (e) {
                console.log(e)
            }
            return
        }
        const productFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || {products: []}
        console.log(productFromLocalStorage)

        const existProduct = productFromLocalStorage.products.find(item => card._id === item.product._id)
        if (existProduct) {
            console.log('existProduct перед ретурном', existProduct)
            return
        }
        productFromLocalStorage.products.push({ product: card, cartQuantity: 1, _id: card._id })
        dispatch(setCart({ products: productFromLocalStorage.products }))
        localStorage.setItem("cart", JSON.stringify(productFromLocalStorage))
    }

    const img = card.imageUrls.map((url, key) =>
        <img onClick={() => carousel.goTo(key)} className={style.img_prev} src={url} key={key} alt={card.artist} />)

    const imgCarousel = card.imageUrls.map((url, key) => {
        return (<div key={key}>
            <div style={contentStyle}>
                <img className={style.img_carousel} src={url} key={key} alt={card.artist}/>
            </div>
        </div>)
    })

    return <div className={style.card_wrapper} id={card._id}>
        <div className={style.left_part}>
            <div className={style.img_wrapper}>
                <div className={style.preview_left_part}>{img}</div>
                <div className={style.carousel_left_part} onClick={() => setModalActive(true)} >

                    <Carousel ref={(node) => (carousel = node)} dots={false} afterChange={false}>

                        {imgCarousel}
                    </Carousel>
                    <div className={style.buttons}>
                        <LeftOutlined
                            className={style.button}
                            onClick={(e) => {
                                carousel.prev()
                                e.stopPropagation()
                            }}
                        />
                        <RightOutlined
                            className={style.button}
                            onClick={(e) => {
                                carousel.next()
                                e.stopPropagation()
                            }}
                        />
                    </div>
                </div>
                <div className={style.description_left_part}>
                    <h4>Описание</h4>
                    <p >{card.description}</p>
                </div>
            </div>
            <div className={style.btn_wrapper}>
                <Button className={style.btnShop} onClick={() => addToCart()} type="primary">🛒 Добавить в корзину</Button>
                <Button className={style.btnShop} type="primary" icon={<HomeOutlined />}>❤ Добавить в избранное </Button>
                <Button className={style.btnShop} type="primary">🛒 Купить в 1 клик</Button>
            </div>
        </div>
        {(modalActive) ?
            <ModalCarousel images={card.imageUrls} modalActive={modalActive} setModalActive={setModalActive} /> : null}
    </div>
}

export default Card