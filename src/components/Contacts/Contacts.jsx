import React from "react";
import styles from "./Contacts.module.scss";

const Contacts = () => {
  return (
    <div className={styles.contacts}>
      <img
        src="https://res.cloudinary.com/dhguqxbi6/image/upload/v1643098330/7art/contacts_kkkfyc.png"
        alt="Контакты"
      />

      <h3>Наші контакти</h3>
      <div className={styles.tel1}>
        <span>(098)</span> 077-79-77
      </div>
      <div className={styles.tel2}>
        <span>(099)</span> 551-11-36
      </div>
      <div className={styles.email}>
        <span>e-mail:</span> sale@7art.ua
      </div>
      <div className={styles.open}>Режим роботи менеджерів:</div>
      <div className={styles.time}>
        пн – суб. c <span>9:00 до 18:00</span>
      </div>
      <div className={styles.adv}>
        Прийом замовлень через кошик <br /> цілодобово без вихідних!
      </div>
      <button className={styles.btn}>Напишіть нам зараз</button>
    </div>
  );
};
export default Contacts;
