import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./NewTopNavigation.module.css";
import HeaderLogo from '../../../assets/NewHomeImages/icons/svg/newLogo.svg';
import svgArray from "../../../assets/NewHomeImages/icons/svg/svg";
import MobileViewNav from "./mobileVeiwNav";

const NewTopNavigation = () => {
  const navigate = useNavigate();
  const importedDivRef = useRef(null);
  const displayDiv = () => {
    if (importedDivRef.current) {
          
        importedDivRef.current.style.display='block'

  
     
    }
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
        <img src={svgArray[10]}  onClick={() => navigate("/login")} />
        <a href="/login">Account</a>
        <img src={svgArray[11]} />
        <img src={svgArray[12]} />
      </section>
      <section className={styles.mobileView}>
        <img src={svgArray[12]} />
        <img src={svgArray[18]} id={styles.hamburger} onClick={displayDiv}  />
      </section>
      {/* Pass importedDivRef as a prop to MobileViewNav */}
      <MobileViewNav ref={importedDivRef} />
    </div>
  );
};

export default NewTopNavigation;
