import React from "react";
import styles from "./FourthSection.module.css";
import svgArray from "../../../assets/NewHomeImages/icons/svg/svg";

const FourthSection = () => {

 return(

   <div className={styles.main}>
     <section>
      <h2>
      Get Your Daily Needs From Our <br /> Emcelo Store
      </h2>
      <article>
      Get Your Daily Needs From Our EmceloThere are many products you will find our shop, Choose your daily necessary product from our Emcelo shop and get some special offerStore.
      </article>
     </section>

     <figure>
      <img src={svgArray[9]} />
     </figure>

   </div>

 );

};
export default FourthSection;