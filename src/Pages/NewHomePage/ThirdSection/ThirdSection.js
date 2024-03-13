import React from "react";
import styles from "./ThirdSection.module.css";
import svgArray from "../../../assets/NewHomeImages/icons/svg/svg";

const ThirdSection = () => {

  return (
   <div className={styles.background}>
    <div className={styles.main}>
      <section className={styles.topSection}>
        <h1>Our Services</h1>
        <h2>WHAT WE CAN DO FOR YOU</h2>
      </section>

      <div className={styles.grid}>
        <figure>
          <h2>PROCUREMENT</h2>
           <img src={svgArray[1]} />
        </figure>

        <figure>
        <h2>LOGISTICS</h2>
         <img src={svgArray[2]} />
      </figure>

      <figure>
      <h2>ECOMMERCE</h2>
       <img src={svgArray[6]} />
    </figure>

      </div>

      <section className={styles.writeUp}>
        <h3>Popular Products for Daily Shopping</h3>
        <article>
          See all our popular products in this week. You can choose your daily needs products from this list and get some special offer with free shipping.
        </article>
      </section>

      <div className={styles.lastDiv}>
        <section>
           <figure>
             <img src={svgArray[5]} />
           </figure>

           <article>
            <h4> Free Shipping</h4>
            <p>from $20</p>
           </article>
        </section>


        <section>
           <figure>
             <img src={svgArray[0]} />
           </figure>

           <article>
            <h4> Support 24/7</h4>
            <p>At Anytime</p>
           </article>
        </section>


        <section>
           <figure>
             <img src={svgArray[7]} />
           </figure>

           <article>
            <h4>Secure Payment</h4>
            <p>Totally Safe</p>
           </article>
        </section>


        <section>
           <figure>
             <img src={svgArray[8]} />
           </figure>

           <article>
            <h4>Latest Offer</h4>
            <p>Upto 20% off</p>
           </article>
        </section>
      
      </div>
    </div>
    </div>
    
  );
};

export default ThirdSection;
