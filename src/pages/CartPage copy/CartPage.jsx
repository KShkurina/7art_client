import React from "react";
import styles from "./CartPage.module.scss";
import { Empty } from "antd";
import CartRow from "../../components/CartRows/CartRows";

const CartPage = () => {
  return (
    <div>
      <h2 className={styles.title}>Корзина покупок</h2>

      <CartRow />
      <CartRow />
      {/* <Empty /> */}
    </div>
  );
};

export default CartPage;
