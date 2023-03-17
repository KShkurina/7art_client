import style from './FilteredCardsByWorld.module.scss';
import React from 'react';
import 'antd/dist/antd.min.css';
import {Card} from 'antd';
import {Link} from "react-router-dom";




const FilteredCardsByWorld = (goods) => {

    const card = goods.map((good, key) => {
        return (            <Link key={key} to={`card/${good.itemNo}`} className={style.card}>
                <Card
                    hoverable
                    style={{width: 240}}
                    cover={<img alt="example" src={good.imageUrls[0]}/>}
                >
                    <Meta title={good.name} description={`${good.currentPrice} грн.`}/>
                </Card>

            </Link>
        )
        return  <div className={style.filteredCardsByWorld}>
            {card}

         </div>
    })


}

export default FilteredCardsByWorld