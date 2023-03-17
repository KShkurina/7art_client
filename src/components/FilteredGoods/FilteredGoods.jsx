import style from './FilteredGoods.module.scss';
import React from 'react';
import 'antd/dist/antd.min.css';
import {Card} from 'antd';
import {Link, NavLink} from "react-router-dom";
import {Button} from 'antd';


const {Meta} = Card;

const FilteredGoods = ({goods, startPage, setStartPage, cardsPerPage, productsQuantity}) => {
    const card = goods.map((good, key) => {
        return (<Link key={key} to={`card/${good.itemNo}`} className={style.card}>
                <Card
                    hoverable
                    style={{width: 240}}
                    cover={<img alt="example" src={good.imageUrls[0]}/>}
                >
                    <Meta title={good.name} description={`${good.currentPrice} грн.`}/>
                </Card>

            </Link>
        )
    })
    const visibleBtn = startPage * cardsPerPage < productsQuantity

    return <div className={style.goods_wrapper}>
        <div className={style.filteredGoods}>
            {card}

        </div>
        {visibleBtn &&
        <Button className={style.btnMore} type="primary" onClick={() => setStartPage(startPage + 1)}>Load More
            ...</Button>}
    </div>
}

export default FilteredGoods