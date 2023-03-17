import React from 'react';
import styles from './HomeCatalog.module.scss';
import {Link} from "react-router-dom";
import catalog from './catalog'


const HomeCatalog = () => {

    const urlArr = catalog.map((el,key)=>
    { const imgs = el.url.map((url,keyImg)=>{
        return <img width={el.url.length<2?'330px':'100px'} height='250px' className={styles.img} src={url} key={keyImg}
                alt={el.category}/>
        })

        return (<Link key={key} to={`filter?categories=${el.categoryName}`}>
            <div className={styles.img_wrapper} >
                {imgs}
            </div>
            <h4 className={styles.category_name}>{el.category}</h4>
        </Link>)
    })

    return (
        <div className={styles.home_catalog_wrapper}>
            <h2 className={styles.title}>Категории картин</h2>
            <div className={styles.home_catalog_container}>
                {urlArr }
            </div>
        </div>
    )
}

export default HomeCatalog