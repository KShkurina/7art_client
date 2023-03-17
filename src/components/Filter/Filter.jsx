import React, {useEffect, useState} from 'react';
import styles from './Filter.module.scss';
import {Formik, Form, Field, ErrorMessage, useField} from 'formik';
import {useGetFilteredProductMutation} from "../../API/productAPI";
import {useSearchParams} from 'react-router-dom';
// import 'antd/dist/antd.min.css';
import style from "../Card/Card.module.scss";
import {Button} from "antd";
import {setStateUrl,setCurentCategory} from './filterSlice'
import { useSelector, useDispatch } from 'react-redux';


const FilterCheckbox = ({children, ...props}) => {

    const [field, meta] = useField({...props, type: 'checkbox'})

    return (<>
            <label>
                {/*// className={styles.checkbox}*/}
                <input type='checkbox'
                       {...props}
                 {...field}
                 />
                {children}
            </label>
        </>
    )
}

const FilterForm = ({setGoods, startPage, goods ,setProductsQuantity, cardsPerPage,setStartPage}) => {

    const stateUrl = useSelector(state=>state.filter.stateUrl)

    const [curentCategory ,setCurentCategory] = useState("");

    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams();
    const currentParams = Object.fromEntries(searchParams);

    const [filterProducts] = useGetFilteredProductMutation()

    useEffect( () => {
        async function fetchData() {
            
            let params = stateUrl.length ? stateUrl : Object.entries(currentParams).map(item => item.join('=')).join('&')
            params+=`&perPage=${cardsPerPage}&startPage=${startPage}`
            const goodsFromStorage = await filterProducts(params).unwrap()
            console.log("goodsFromStorage",goodsFromStorage)
            if (startPage===1){setGoods(goodsFromStorage.products)}
            else setGoods([...goods, ...goodsFromStorage.products])
            setProductsQuantity(goodsFromStorage.productsQuantity)
        }
        fetchData()

    }, [
        startPage,
        searchParams])


    const formSubmit = async (values) => {
               
        let url = []
        for (let key in values) {
            if (values[key].length > 0)
                url.push(key + '=' + values[key])
        }

        const filterUrl = url.join('&')
        setSearchParams(filterUrl)
        dispatch(setStateUrl({filterUrl}))
        setStartPage(1)
    }
    const initValuesForState = (category) => currentParams.hasOwnProperty(category) ? currentParams[category].split(',') : []

    return (
        <Formik
            initialValues={{
                categories: initValuesForState('categories'),
                size: initValuesForState('size'),
                color: initValuesForState('color')
            }}
            enableReinitialize = {true}

            onSubmit={values => {
                formSubmit(values)
            }}
        >
            

            <Form className={styles.checkboxForm}>
                <h2 className={styles.checkboxTitle}>Стиль</h2>
                <FilterCheckbox className={styles.checkbox} name='categories' value='abstraction'>
                    Абстракції
                </FilterCheckbox>

                <FilterCheckbox className={styles.checkbox} name='categories' value='interior'>
                    Інтер'єрні картини
                </FilterCheckbox>

                <FilterCheckbox className={styles.checkbox} name='categories' value='oilModule'>
                    Модульні картини олією
                </FilterCheckbox>

                <FilterCheckbox className={styles.checkbox} name='categories' value='cityscape'>
                    Міський пейзаж
                </FilterCheckbox>

                <FilterCheckbox className={styles.checkbox} name='categories' value='animals'>
                    Картини тварин
                </FilterCheckbox>

                <FilterCheckbox className={styles.checkbox} name='categories' value='seascape'>
                    Морський пейзаж
                </FilterCheckbox>

                <FilterCheckbox className={styles.checkbox} name='categories' value='nature'>
                    Краєвиди природи
                </FilterCheckbox>

                <FilterCheckbox className={styles.checkbox} name='categories' value='oilFlowers'>
                    Квіти олією
                </FilterCheckbox>

                <FilterCheckbox className={styles.checkbox} name='categories' value='modules'>
                    Модульні картини
                </FilterCheckbox>

                <h2 className={styles.checkboxTitle}>Размер</h2>

                <FilterCheckbox className={styles.checkbox} name='size' value='60x80'>
                    60x80 см
                </FilterCheckbox>

                <FilterCheckbox className={styles.checkbox} name='size' value='70x100'>
                    70x100 см
                </FilterCheckbox>

                <FilterCheckbox className={styles.checkbox} name='size' value='80x105'>
                    80x105 см
                </FilterCheckbox>

                <FilterCheckbox className={styles.checkbox} name='size' value='90x115'>
                    90x115 см
                </FilterCheckbox>

                <FilterCheckbox className={styles.checkbox} name='size' value='100x130'>
                    100x130 см
                </FilterCheckbox>

                <h2 className={styles.checkboxTitle}>Цвет</h2>

                <div className={styles.colors}>

                    <FilterCheckbox id="color" name='color' value='red'>
                        <div className={styles.colorRed}></div>
                    </FilterCheckbox>

                    <FilterCheckbox id="color" className={styles.checkboxGreen} name='color' value='green'>
                        <div className={styles.colorGreen}></div>
                    </FilterCheckbox>

                    <FilterCheckbox id="color" className={styles.checkboxBlack} name='color' value='black'>
                        <div className={styles.colorBlack}></div>
                    </FilterCheckbox>
                </div>

                <Button type='primary' htmlType="submit" className={styles.button}>Показать</Button>
                {/*<Button className={style.btnShop} type="primary">🛒 Купить в 1 клик</Button>*/}

            </Form>
        </Formik>
       
    )
    
}

export default FilterForm
