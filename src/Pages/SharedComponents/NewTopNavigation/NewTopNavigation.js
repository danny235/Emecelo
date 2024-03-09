import React from "react";
import styles from "./NewTopNavigation.module.css";
import Logo from '../../../assets/images/logo.jpeg';
import Logo2 from '../../../assets/images/logo.jpeg';
import HeaderLogo from '../../../assets/logo.png';
import svgArray from "../../../assets/NewHomeImages/icons/svg/svg";

const NewTopNavigation = () => {
  return (
    <div className={styles.main}>
    <figure className={styles.imageContainer}>
      <img src={HeaderLogo} alt="Logo" />
    </figure>
    <nav>
      <p>+234-704-800-0910</p>
      <a href="">Home</a>
      <a href="">Contact</a>
    </nav>
    <section>
    <img src={svgArray[10]} />
     <span>
      Account
     </span>
     <img src={svgArray[11]} />
     <img src={svgArray[12]} />
    </section>
    </div>
  );
};

export default NewTopNavigation;
