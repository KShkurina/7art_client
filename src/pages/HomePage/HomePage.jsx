import React, { useEffect } from "react";
import SingleCarouselComponent from "../../components/SingleCarousel/SingleCarouselComponent";
import DoubleCarousel from "../../components/DoubleCarousel/DoubleCarousel";
import Contacts from "../../components/Contacts/Contacts";
import HomeCatalog from "../../components/HomeCatalog/HomeCatalog";
import { useGetRandomProductsMutation } from "../../API/productAPI";
import { useDispatch } from "react-redux";
import { setSingleCarousel } from "../../components/SingleCarousel/singleCarouselSlice";


const HomePage = () => {
  const dispatch = useDispatch()
  const [getRandomProducts, { isLoading }] = useGetRandomProductsMutation()
  console.log("isLoading", isLoading)
  const slid = async () => {
    const promotionProducts = await getRandomProducts()
    console.log('promotionProducts', promotionProducts.data.randomProducts

    )
    dispatch(setSingleCarousel(promotionProducts.data.randomProducts))
    console.log('ЭТО РАБОТАЕТ')
  }
  console.log('ЭТО РАБОТАЕТ1')
  useEffect(() => {
    slid()
  }, [])



  return (
    <>
      <SingleCarouselComponent />
      <HomeCatalog />
      <DoubleCarousel />
      <Contacts />
    </>
  );
};
export default HomePage;
