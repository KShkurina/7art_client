import React, {useRef} from "react";
import style from './ModalCarousel.module.scss'
import 'antd/dist/antd.min.css';

import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
const contentStyle = {
    // height: '250px',
    height: '200px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const ModalCarousel = ({images, modalActive, setModalActive}) => {
    console.log('images', images)
    let carousel = useRef(null);
    const imgCarousel = images.map((url, key) => {
        return (<div>
            <div >
                <img className={style.img_carousel} src={url} key={key} alt={images.artist}/>
            </div>
        </div>)
    })
    return(

       <div className={modalActive?style.modalCarousel:style.modal_active} onClick={()=>setModalActive(false)}>
           <div className={style.carousel}>
               <Carousel onClick={e=>e.stopPropagation() } ref={(node) => (carousel = node)} dots={false} afterChange={false}>
                   {imgCarousel}
               </Carousel>
           </div>

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
                        e.stopPropagation()

                        carousel.next()
                    }}
                />
            </div>
        </div>
    )
}

export default ModalCarousel