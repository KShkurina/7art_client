import PropTypes from "prop-types";
import React, { memo } from "react";
import styles from "./Logo.module.scss";

const Logo = (props) => {
  const { spec } = props;
  return (
    <div className={styles.logo_wrapper}>
      <h1 className={styles.logo_name}>
        <span>7</span>ART.UA
      </h1>
      <h2 className={styles.logo_store}>{spec}</h2>
    </div>
  );
};

Logo.propTypes = {
  spec: PropTypes.string,
};

Logo.defaultProps = {
  spec: "",
};

export default memo(Logo);
