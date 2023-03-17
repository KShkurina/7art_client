import React from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <footer className={styles.footer}>
        <div className={styles.subscription}>
          <div className={styles.subscription_info}>
            <img
              className={styles.mail}
              alt="mail"
              height="56px"
              width="85px"
              src="https://res.cloudinary.com/dhguqxbi6/image/upload/v1643098357/7art/mail_bqihxv.svg"
            />
            <p>Підписуйтесь на наші оновлення</p>
          </div>
          <div className={styles.subscription_form}>
            <input
              className={styles.subscription_input}
              placeholder="Email address"
              type="email"
            />
            <button className={styles.subscription_button}>OK</button>
          </div>
        </div>
        <div className={styles.conditions}>
          <div>
            <img
              className={styles.mail1}
              alt="delivery"
              width="128px"
              src="https://res.cloudinary.com/dhguqxbi6/image/upload/v1643098357/7art/lorry_ujmzde.svg"
            />
            <h5>
              З умовами безкоштовної доставки по Україні Ви можете ознайомитись{" "}
              <Link className={styles.condition_link} to="#">
                тут
              </Link>
            </h5>
          </div>
          <div>
            <img
              className={styles.mail}
              alt="refund"
              width="80px"
              src="https://res.cloudinary.com/dhguqxbi6/image/upload/v1643098357/7art/box_nt8rfw.svg"
            />
            <h5>
              З умовами обміну та повернення картин Ви можете ознайомитись{" "}
              <Link className={styles.condition_link} to="#">
                тут
              </Link>
            </h5>
          </div>
          <div>
            <div>
              <img
                className={styles.mail}
                alt="payment options"
                width="68px"
                src="https://res.cloudinary.com/dhguqxbi6/image/upload/v1643098357/7art/pocket_x1bvzw.svg"
              />
            </div>

            <h5>
              З умовами оплати Ви можете ознайомитись{" "}
              <Link className={styles.condition_link} to="#">
                тут
              </Link>
            </h5>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.d_logo}>
            <Logo spec={"магазин картин"} />
          </div>

          <div className={styles.info_menu}>
            <h3 className={styles.info_headers}>Меню</h3>
            <Link className={styles.info_menu_link} to="/about">
              Про магазин
            </Link>
            <Link className={styles.info_menu_link} to="#">
              Доставка
            </Link>
            <Link className={styles.info_menu_link} to="#">
              Оплата
            </Link>
            <Link className={styles.info_menu_link} to="#">
              Контакти
            </Link>
            <Link className={styles.info_menu_link} to="#">
              Обмін - повернення картин
            </Link>
            <Link className={styles.info_menu_link} to="#">
              Договір публічної оферти
            </Link>
          </div>
          <div className={styles.info_catalog}>
            <h3 className={styles.info_headers}>Каталог</h3>
            <Link className={styles.info_catalog} to="#">
              Абстракції
            </Link>
            <Link className={styles.info_catalog} to="#">
              Міський пейзаж
            </Link>
            <Link className={styles.info_catalog} to="#">
              Інтер'єрні картини
            </Link>
            <Link className={styles.info_catalog} to="#">
              Картини тварин
            </Link>
            <Link className={styles.info_catalog} to="#">
              Модульні картини олією
            </Link>
            <Link className={styles.info_catalog} to="#">
              Морський пейзаж
            </Link>
            <Link className={styles.info_catalog} to="#">
              Краєвиди природи
            </Link>
            <Link className={styles.info_catalog} to="#">
              Рамки для картин
            </Link>
            <Link className={styles.info_catalog} to="#">
              Квіти олією
            </Link>
          </div>
          <div className={styles.info_actual}>
            <h3 className={styles.info_headers}>Інформація</h3>
            <div className={styles.info_headers}>
              Доставка по Україні
              <div className={styles.info_actual_text}>1 день</div>
            </div>
            <div className={styles.info_headers}>
              Тел.:
              <span className={styles.info_actual_text_span}>
                (098) 077 79 77{" "}
              </span>
              <div className={styles.info_actual_text}>(099) 551 11 16</div>
            </div>
            <div className={styles.info_headers}>
              Час роботи менеджерів:
              <div className={styles.info_actual_text}>з 9:00 до 18:00.</div>
            </div>
            <div className={styles.info_headers}>
              Прийом замовлень на сайті <br />
              24/7
            </div>
            <div className={styles.info_headers}>
              Email: <div className={styles.info_actual_text}>sale@Art.ua</div>
            </div>
          </div>
          <div className={styles.info_extra}>
            <h3 className={styles.info_headers}>Додатково</h3>
            <Link className={styles.info_extra_link} to="#">
              Користувача угода
            </Link>
            <Link className={styles.info_extra_link} to="#">
              Політика використання Cookies
            </Link>
            <Link className={styles.info_extra_link} to="#">
              Персональні дані
            </Link>
            <Link className={styles.info_extra_link} to="#">
              Оповіщення про авторські права
            </Link>
            <Link className={styles.info_extra_link} to="#">
              Часті питання (FAQ)
            </Link>
            <Link className={styles.info_extra_link} to="#">
              Карта
            </Link>
            <Link className={styles.info_extra_link} to="#">
              Відгуки
            </Link>
          </div>
        </div>
        {/*<img className={styles.info_chatBox_img} width='84px' src='https://res.cloudinary.com/dhguqxbi6/image/upload/v1643098357/7art/chatBox_mjblyf.svg'/>*/}
      </footer>
    </div>
  );
};

export default Footer;
