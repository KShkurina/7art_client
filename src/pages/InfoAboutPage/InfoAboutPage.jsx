import React from "react";
import {Link} from "react-router-dom";
import styles from './InfoAboutPage.module.scss'

const InfoAboutPage = () => {
  return (
      <div className={styles.aboutUs}>
        <h3 className={styles.aboutUs_title}>
          Раді вітати Вас у магазині картин <Link className={styles.aboutUs_title_link} to='/'>7Art.ua!</Link>
        </h3>
        <p>ТМ "7Art" є виробником картин для інтер'єру ручної роботи під власною торговою маркою в Україні. Ми не використовуємо жодних друкованих технологій чи заготовок. Всі картини пишуться вручну з нуля методом класичного станкового живопису.</p>
        <p>Магазин картин 7Art.ua пропонує великий асортимент сучасного, інтер'єрного живопису, виконаного на полотні олійними або художніми акриловими фарбами, з елементами декоративного доопрацювання об'ємними гелями, структурними пастами та контурами. Наші картини – це не колекційний чи антикварний живопис. Це сучасні, інтер'єрні, абстрактні полотна ручної роботи для широкого вжитку, виконані в основному великим пастозним мазком.</p>
        <p>Основою для всіх картин є якісне італійське бавовняне полотно в галерейній натяжці, коли скоби заховані за торець підрамника, що дозволяє розміщувати картини на стіні без багетної рами. Кожна робота з каталогу є повністю закінченим твіром, готовим до декору вашого приміщення. Всі картини покриваються подвійним шаром захисного лаку. Встановлено кріплення для підвісу картин. Доставка будь-якого полотна по Україні безкоштовно та здійснюється за 1-2 дні з моменту замовлення. Докладніше в умовах доставки <Link className={styles.info_menu_link} to='#'>( тут ).</Link> </p>
        <p>Магазин картин 7Art.ua пропонує картини маслом та акрилом ручної роботи за найкращими цінами, які відмінно підійдуть для декору сучасних просторів: квартир, будинків, офісів, ресторанів, а також готельних комплексів. Всі твори можна придбати як у роздріб так і оптом. Ми запрошуємо до співпраці меблеві салони, магазини картин, дизайнерів інтер'єрів, дизайнерські салони, сувенірні лавки та ін. Подати заявку на співпрацю та отримати оптові ціни можна <Link className={styles.info_menu_link} to='#'>( тут ).</Link></p>
        <p>Магазин картин 7Art.ua пропонує для роздрібних та оптових замовників додаткові послуги з оформлення обраної роботи в рамку (повний каталог багету) або виконання картини на широкому 3D підрамнику. Широкий 3D підрамник буде дуже стильно виглядати в сучасному інтер'єрі loft. Також можливе виконання будь-якого полотна за Вашими індивідуальними розмірами. Ця опція доступна у картці товару кожної картини в каталозі.</p>
        <p>Магазин картин 7Art.ua гарантує відмінну якість, професійне виконання, наявність, найкращий сервіс та величезну базу стильних картин.
          Найпопулярнішими розділами є абстракції, інтер'єрні картини, модульні картини маслом.
          Магазин картин 7Art.ua та фахівці ТМ «7Арт» постійно працюють над поповненням каталогу картин. Щиро дякуємо, що вибрали ТМ «7Арт» та бажаємо приємних покупок. Нехай наш живопис радує Вас довгі роки.</p>
          <div className={styles.aboutUs_decor}>
              <img src='https://res.cloudinary.com/dhguqxbi6/image/upload/v1643390800/7art/rectangle_iqiqhh.svg' alt='decor'/>
              <img src='https://res.cloudinary.com/dhguqxbi6/image/upload/v1643390799/7art/rectangle-star_ef6jrt.svg' alt='decor'/>
              <img src='https://res.cloudinary.com/dhguqxbi6/image/upload/v1643390800/7art/rectangle_iqiqhh.svg' alt='decor'/>

          </div>
      </div>

  )
};

export default InfoAboutPage;