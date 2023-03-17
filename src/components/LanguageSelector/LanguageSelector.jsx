import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import Icon from "@mdi/react";
import { mdiWeb } from "@mdi/js";
import styles from "./LanguageSelector.module.scss";

const LanguageSelector = () => {
  const [language, setLanguage] = useState("Українська");
  const origin = [
    { name: "Українська", code: "uk" },
    { name: "English", code: "en" },
  ];

  const onLanguageChange = (e) => {
    setLanguage(e.value);
  };

  return (
    <div className={styles.language_wrapper}>
      <div className={styles.selector}>
        <Icon path={mdiWeb} size={1} />
        <Dropdown
          value={language}
          options={origin}
          onChange={onLanguageChange}
          optionLabel="language"
          placeholder={language}
        />
      </div>
    </div>
  );
};
export default LanguageSelector;
