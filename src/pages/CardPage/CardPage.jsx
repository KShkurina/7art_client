import style from "./CardPage.module.scss"
import Card from "../../components/Card/Card";
import {useParams} from "react-router-dom";

import React, {useState, useEffect} from "react";
import { useGetOneProductMutation} from "../../API/productAPI"

const CardPage = () => {

 





    const {id} = useParams()
    // console.log('для запроса карты нужен itemNo', id)

    const [cardRequest, {isLoading: isUpdating}] = useGetOneProductMutation()
    const [card, setCard] = useState({})
    // console.log('isLoading',isUpdating)


  useEffect( ()=>{
    
   const fetchCard = async ()=>{
    const cardFromStorage = await cardRequest(id).unwrap()
    setCard(cardFromStorage)
    
    

   }
   fetchCard()

    },[])

    // return <div>сюда карточку</div>
    return isUpdating ? <div>загругка карты</div> : <Card id={id} card={card} setCard={setCard} />
}
export default CardPage