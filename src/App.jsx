import React from "react";
import AppRoutes from "./Routes/Routes.jsx";
import styles from "./App.module.scss";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer";
import "antd/dist/antd.min.css";
import "./assets/css/font.css";

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
