import React from "react"; 
import styles from "./mobileVeiwNav.module.css";
import svgArray from "../../../assets/NewHomeImages/icons/svg/svg";
import "./functions"


const MobileViewNav = () => {
 
 return (
   <div className={styles.main} id={styles.mobileNav}>

  <div className={styles.background}></div>
  <div className={styles.hiddenDiv}>
  <section className={styles.firstSection}>
  <a>Home</a>
  <a>Contact</a>
  <a>About Us</a>
  <a>Products</a>
  </section>

  <button>
  Sign-in
  </button>

  <section className={styles.lastSection}>
   <a> <img src={svgArray[13]} />My Account</a>
   <a><img src={svgArray[13]} />orders</a>
   <a><img src={svgArray[13]} />Save items</a>

  </section>

  </div>
  
  </div>
 
 );
};
export default MobileViewNav;