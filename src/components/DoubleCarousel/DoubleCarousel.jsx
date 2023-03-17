import React, { useRef } from "react";
import styles from "./DoubleCarousel.module.scss";
import { Carousel } from "antd";
// import "antd/dist/antd.min.css";
import {
  LeftOutlined,
  RightOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const pictures = [
  {
    src: "https://res.cloudinary.com/dhguqxbi6/image/upload/v1643098344/7art/landscape_s04x7r.png",
    stars: 2,
    title: "Picture title 2",
    description:
      "Lorem ipsum facilisi tellus nec dolor sit amet, consectetur adipiscing elit. In lectus euismod facilisi tellus nec massa tortor turpis lectus. Convallis massa scelerisque a nunc tellus. Justo sit molestie accumsan duis pretium diam nec. Justo facilisi tellus nunc venenatis ullamcorper gravida. Nulla quis velit",
    artist: "Anna Smith",
  },
  {
    src: "https://res.cloudinary.com/dhguqxbi6/image/upload/v1643098344/7art/lilia_sahfvu.png",
    stars: 4,
    title: "Picture title 4",
    description:
      "Lorem ipsum  lectus. Convallis massa scelerisque a nunc tellus. Justo sit molestie accumsan duis pretium diam nec. Justo facilisi tellus nunc venenatis ullamcorper gravida. Nulla quis velit",
    artist: "Anna Smith",
  },
  {
    src: "https://res.cloudinary.com/dhguqxbi6/image/upload/v1643098344/7art/olya11_hzikws.jpg",
    stars: 5,
    title: "Picture title 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lectus euismod facilisi tellus nec massa tortor turpis lectus. Convallis massa scelerisque a nunc tellus. Justo sit molestie accumsan duis pretium diam nec. Justo facilisi tellus nunc venenatis ullamcorper gravida. Nulla quis velit",
    artist: "Olya Juravleva",
  },
  {
    src: "https://res.cloudinary.com/dhguqxbi6/image/upload/v1643098345/7art/olya12_ohdaut.jpg",
    stars: 1,
    title: "Picture title 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lectus euismod facilisi tellus nec massa tortor turpis lectus. Convallis massa scelerisque a nunc tellus. Justo sit molestie accumsan duis pretium diam nec. Justo facilisi tellus nunc venenatis ullamcorper gravida. Nulla quis velit",
    artist: "Olya Juravleva",
  },
  {
    src: "https://res.cloudinary.com/dhguqxbi6/image/upload/v1643098345/7art/olya14_dekryj.jpg",
    stars: 5,
    title: "Picture title 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lectus euismod facilisi tellus nec massa tortor turpis lectus. Convallis massa scelerisque a nunc tellus. Justo sit molestie accumsan duis pretium diam nec. Justo facilisi tellus nunc venenatis ullamcorper gravida. Nulla quis velit",
    artist: "Olya Juravleva",
  },
  {
    src: "https://res.cloudinary.com/dhguqxbi6/image/upload/v1643098345/7art/olya13_gtabfx.jpg",
    stars: 3,
    title: "Picture title 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In elit. lectus euismod facilisi tellus nec massa tortor turpis lectus. Convallis massa scelerisque a nunc tellus. Justo sit molestie accumsan duis pretium diam nec. Justo facilisi tellus nunc venenatis ullamcorper gravida. Nulla quis velit, ",
    artist: "Olya Juravleva",
  },
  {
    src: "https://res.cloudinary.com/dhguqxbi6/image/upload/v1643098345/7art/olya12_ohdaut.jpg",
    stars: 2,
    title: "Picture title 2",
    description:
      "Lorem ipsum In lectus euismod facilisi tellus nec sit amet . In lectus euismod facilisi tellus nec massa tortor turpis lectus. Convallis massa scelerisque a nunc tellus. Justo sit molestie accumsan duis pretium diam nec. Justo facilisi tellus nunc venenatis ullamcorper gravida. Nulla quis velit",
    artist: "Olya Juravleva",
  },
];

const DoubleCarousel = () => {
  const { products } = useSelector((state) => state.singleCarousel)
  console.log(products);
  let carousel = useRef();

  let carouselSlide = products.map((slide, key) => {
    let rating_arr = [];
    for (let i = 0; i < 5; i++) {
      for (i; i < slide.stars; i++) rating_arr[i] = 1;

      if (rating_arr.length >= 5) continue;
      rating_arr[i] = 0;
    }

    console.log(rating_arr)


    const rating = rating_arr.map((element, key) => {
      return element === 1 ? (
        <StarFilled style={{ color: "#F95026" }} key={key} />
      ) : (
        <StarOutlined color="#eb2f96" key={key} />
      );
    });

    const description = slide.description.length>=250?slide.description.substr(0,250)+'...':slide.description

    return (
      <div key={key}>
        <NavLink to={`/filter/card/${slide.productUrl}`} className={styles.doubleCarouselSlide}>
          <div>
            <div className={styles.description_rating_extra}>{rating}</div>
            <div className={styles.description_title_extra}>{slide.description}</div>
            <img
              className={styles.img}
              // width="158px"
              // height="145px"
              src={slide.imageUrls[0]}
            />
            <div className={styles.description_artist_extra}>{slide.artist}</div>
          </div>
          <div className={styles.description}>
            <div>{rating}</div>
            <div className={styles.description_title}>{slide.name}</div>
            <div className={styles.description_text}>{description}</div>
            <div className={styles.description_artist}>{slide.artist}</div>
          </div>
        </NavLink>
      </div>
    );
  });

  console.log(carouselSlide[0]);

  const settings = {
    slidesToShow: 2,
    slidesToScroll: 2,
    dots: false,
  };

  return (
    <div className={styles.container}>
      {/* {carouselSlide} */}
      <div className={styles.doubleCarousel}>
        <LeftOutlined
          className={styles.carousel_button}
          onClick={() => carousel.prev()}
        />
        {carouselSlide.length > 0 && (
          <Carousel
            className={styles.carousel_container}
            ref={(node) => (carousel = node)}
            {...settings}>
            {carouselSlide}
          </Carousel>
        )}
        <RightOutlined
          className={styles.carousel_button}
          onClick={() => carousel.next()}
        />
      </div>
    </div>
  );
};

export default DoubleCarousel;
