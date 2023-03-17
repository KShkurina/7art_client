import React, {useEffect,useState} from "react";
import FilterCheckbox from "../../components/Filter/Filter";
import FilteredGoods from '../../components/FilteredGoods/FilteredGoods';
import style from './FilterPage.module.scss'
import Filter from '../../components/Filter/Filter'
import {useSearchParams} from 'react-router-dom';



const FilterPage = ()=>{
    const [goods, setGoods]= useState([])
    const [productsQuantity, setProductsQuantity]= useState(-1)
    const [startPage, setStartPage] = useState(1);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentParams =searchParams.get('categories');
    





    const cardsPerPage = 9
    return(
        <div className={style.filterPage}>
            <FilterCheckbox 
            // currentParams={currentParams}
            setGoods={setGoods}
            goods={goods}
            startPage={startPage}
            setProductsQuantity={setProductsQuantity}
            cardsPerPage={cardsPerPage}
            setStartPage={setStartPage}
            />
            <FilteredGoods 
            goods={goods} 
            startPage={startPage} 
            setStartPage={setStartPage} 
            productsQuantity={productsQuantity} 
            cardsPerPage={cardsPerPage}/>
        </div>
    )
}

export default FilterPage

