import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./mobileVeiwNav.module.css";
import blackBox from "../../../assets/NewHomeImages/productImages/blackBox.svg"
import blackHeart from "../../../assets/NewHomeImages/productImages/blackHeart.svg"
import closeArrow from "../../../assets/NewHomeImages/productImages/closeArrow.svg"
import svgArray from "../../../assets/NewHomeImages/icons/svg/svg";
import "./functions"

const MobileViewNav = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const closeMobileNav = () => {
    if (ref.current) {
      ref.current.classList.add(styles.slideOut); // Add the slideOut class
      ref.current.classList.remove(styles.slideIn); // Remove the hiddenDiv class
      
      setTimeout(() => {
        ref.current.style.display = 'none'; 
      }); 
    }
  };
  

  return (
    <div className={styles.main} ref={ref} style={{ display: 'none' }}>
     
  <div className={styles.background}></div>
  <div className={`${styles.hiddenDiv} ${styles.slideIn}`}>

  <figure>

  <img src={closeArrow} id={styles.closeArrow} onClick={closeMobileNav}/>
  
  </figure>
  <section className={styles.firstSection}>
  <a onClick={() => navigate("/home")} >Home</a>
  <a onClick={() => navigate("/contact-us")} >Contact</a>
  <a onClick={() => navigate("/about-us")} >About Us</a>
  <a onClick={() => navigate("/categories")} >Products</a>
  </section>

  <button onClick={() => navigate("/login")} >
  Sign-in
  </button>

  <section className={styles.lastSection}>
   <a  onClick={() => navigate("/login")} > <img src={svgArray[10]} />My Account</a>
   <a><img src={blackBox} />orders</a>
   <a><img src={blackHeart} />Save items</a>

  </section>

  </div>
  
  </div>
  );
});

export default MobileViewNav;
