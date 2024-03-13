import React, { useState } from "react";
import styles from "./NewTopNavigation.module.css";
import HeaderLogo from '../../../assets/logo.png';
import svgArray from "../../../assets/NewHomeImages/icons/svg/svg";
import MobileViewNav from "./mobileVeiwNav";

const NewTopNavigation = () => {
  const [isDivVisible, setIsDivVisible] = useState(false);

  const toggleDivVisibility = () => {
    setIsDivVisible(!isDivVisible);
    console.log("Visibility toggled:", isDivVisible);
  };

  return (
    <div className={styles.main}>
      <figure className={styles.imageContainer}>
        <img src={HeaderLogo} alt="Logo" />
      </figure>
      <nav className={styles.desktopNav}>
        <p>+234-704-800-0910</p>
        <a href="/">Home</a>
        <a href="/contact-us">Contact</a>
      </nav>
      <section className={styles.desktopNav}>
        <img src={svgArray[10]} />
        <a href="/login">Account</a>
        <img src={svgArray[11]} />
        <img src={svgArray[12]} />
      </section>
      <section className={styles.mobileView}>
        <img src={svgArray[12]} />
        <img src={svgArray[18]} id={styles.hamburger} onClick={toggleDivVisibility} />
        
        {isDivVisible && <MobileViewNav />}
      </section>
    </div>
  );
};

export default NewTopNavigation;
