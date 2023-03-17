import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./SingleCarousel.module.scss";
import { useSelector } from "react-redux";
// import {useGetRandomProductsMutation} from "../../API/productAPI";



// const slides = [
//   {
//     title: "Масляний та акриловий живопис",
//     subtitle: "Абстракції",
//     link: "#",
//     titleCenter: "АБСТРАКЦІЯ",
//     price: "1200",
//     imgUrl:
//       "https://res.cloudinary.com/dhguqxbi6/image/upload/v1643098306/7art/art1_mvd8bo.png",
//   },
//   {
//     title: "Масляний та акриловий живопис",
//     subtitle: "Абстракції",
//     link: "#",
//     titleCenter: "АБСТРАКЦІЯ",
//     price: "1200",
//     imgUrl:
//       "https://res.cloudinary.com/dhguqxbi6/image/upload/v1643098306/7art/art2_rkvywy.png",
//   },
// ];

const SingleCarouselComponent = () => {
  const { products } = useSelector((state) => state.singleCarousel)
  console.log('стор',products)
  // const [getRandomProducts,{isLoading}] = useGetRandomProductsMutation()
  //  const slid = async ()=>{
  //   const promotionProducts = await getRandomProducts()
  //   console.log('promotionProducts',promotionProducts)
  //   console.log('ЭТО РАБОТАЕТ')
  //  }
  //  console.log('ЭТО РАБОТАЕТ1')
  //  useEffect(() => {
  //   slid()
  // }, [])
  // console.log('ЭТО РАБОТАЕТ2')
  
  let carousel = useRef();

  const slide = products.map((slide, key) => {
    console.log(slide.categories
      )
    return (
      <div key={key}>
        <div className={styles.carousel_slide}>
          <div className={styles.carousel_slide_leftPart}>
            <h2>{slide.name}</h2>
            <h3>{slide.categories}</h3>
            <Link to={`filter?categories=${slide.categories}`}>Дивитись все</Link>
          </div>
          <div className={styles.carousel_slide_centerPart}>
            <h4>{slide.categories}</h4>
            <h5>{slide.currentPrice} грн</h5>
          </div>
          <img src={slide.imageUrls[0]} alt='art'/>
        </div>
      </div>
    );
  });

  return (
    <div className={styles.carousel}>
      <Carousel autoplay={true} effect="fade" ref={(node) => (carousel = node)}>
        {slide}
      </Carousel>
      <div className={styles.buttons}>
        <LeftOutlined
          className={styles.button}
          onClick={() => carousel.prev()}
        />
        <RightOutlined
          className={styles.button}
          onClick={() => carousel.next()}
        />
      </div>
    </div>
  );
};

export default SingleCarouselComponent;
