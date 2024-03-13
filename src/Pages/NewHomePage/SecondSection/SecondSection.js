import React from "react";
import styles from "./SecondSection.module.css";
import TestImg from "../../../assets/NewHomeImages/productImages/FirstSectionBackground.jpg";
import pepper from "../../../assets/NewHomeImages/productImages/black pepper.png"
import emptyDivBack from "../../../assets/NewHomeImages/icons/svg/emptyDivBack.png"
import shareIcon from "../../../assets/NewHomeImages/icons/svg/shareIcon.png"
import copyIcon from "../../../assets/NewHomeImages/icons/svg/copyIcon.svg"
import spiceIcon from "../../../assets/NewHomeImages/icons/png/spiceIcon.png"
import artIcon from "../../../assets/NewHomeImages/icons/png/artIcon.png"
import beauty from "../../../assets/NewHomeImages/icons/png/beutyProducts.png"
import carrots from "../../../assets/NewHomeImages/productImages/carrots.png"
import avacado from "../../../assets/NewHomeImages/productImages/avacado.png"
import spinach from "../../../assets/NewHomeImages/productImages/spinach.png"
import mushroom from "../../../assets/NewHomeImages/productImages/mushroom.png"
import blackPepper from "../../../assets/NewHomeImages/productImages/pepper.png"
import svgArray from "../../../assets/NewHomeImages/icons/svg/svg";
import productArray from "../../../assets/NewHomeImages/icons/svg/productImages";
import star from "../../../assets/NewHomeImages/icons/svg/star.svg"
const SecondSection = () => {
  return (
    <div className={styles.main}>
      <div className={styles.firstDiv}>
        <section className={styles.sectionWithArrows}>
          <p className={styles.arrow}>
          <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="23.2813" cy="22.7034" r="22.4006" transform="rotate(-180 23.2813 22.7034)" fill="#F0EFEF"/>
          <path d="M26.8654 29.8716L20.3308 23.337C19.9809 22.987 19.9809 22.4197 20.3308 22.0698L26.8654 15.5352" stroke="#959595" stroke-width="2.68807" stroke-linecap="round"/>
          </svg>
          
          </p>
          <div className={styles.roller}>

            <figure>
              <img src={pepper} alt="Dry Pepper" />
              <p>Dry Pepper</p>
            </figure>

            <figure>
              <img src={carrots} alt="Dry Pepper" />
              <p>Carrots</p>
            </figure>

            <figure>
              <img src={avacado} alt="Dry Pepper" />
              <p>Chiveser</p>
            </figure>

            <figure>
              <img src={spinach} alt="Dry Pepper" />
              <p>Spinach</p>
            </figure>

            <figure>
              <img src={mushroom} alt="Dry Pepper" />
              <p>Mushrooms</p>
            </figure>

            <figure>
              <img src={blackPepper} alt="Dry Pepper" />
              <p>Pepper</p>
            </figure>
 
          </div>
          <p className={styles.arrow}>
          <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="22.7186" cy="22.7034" r="22.4006" fill="#F0EFEF"/>
          <path d="M19.1346 15.5352L25.6692 22.0698C26.0191 22.4197 26.0191 22.987 25.6692 23.337L19.1346 29.8716" stroke="#959595" stroke-width="2.68807" stroke-linecap="round"/>
          </svg>
          
          </p>
        </section>
        <section className={styles.sectionWithoutArrows}>
          <span>SPICES</span>
        </section>
      </div>

      <div className={styles.secondDiv}>
         <div className={styles.sideDiv}>
           <section className={styles.categories}>
              <h1>CATEGORIES.</h1>
              <ul>
                <a href="/categories/spices"><img src={spiceIcon} />Spices</a>
                <a href="/categories/beauty-products"><img src={beauty} />Beauty Products</a>
                <a  href="/categories/art"><img src={artIcon} />Art</a>
                <a  href="/categories/food-stuff"><img src={svgArray[4]} />Food Stuff</a>
                <a  href="/categories/african-fabrics"><img src={svgArray[3]} />African Fabrics</a>
                <a  href="/categories/herbs"><img src={svgArray[13]} />Herbs</a>
                
              </ul>
           </section>

           <section className={styles.contact}>
               <h1>CONTACT US</h1>
                <ul>
                  <a><img src={svgArray[14]} />info@emcelo.com</a>
                  <a><img src={svgArray[15]} />+234 704 800 0910</a>
                  <a><img src={svgArray[15]} />+234 704 800 0910</a>
                  <a><img src={svgArray[16]} />Lagos State Nigeria</a>
                </ul>
           </section>

           <section className={styles.popUp}>
             <figure>

               <img src={svgArray[17]} />

               <h4>Embrace Culinary Experience</h4>

               <p>Elevate Your Dining Experience  With Emcelo's Premium 
               Food Delivery Service, Bringing Top-Quality Cuisine Staright To Your Home & Office.</p>

               <button>Order now</button>

             </figure>
           </section>
         </div>

         <div className={styles.gridDiv}>
              <section className={styles.topSection}>
                <h2>PRODUCTS</h2>
                <figure>
                  <span> Currency Mode</span>
                  <img src={svgArray[20]} />
                  <img src={svgArray[21]} />
                  <p>Naira</p>
                </figure>
              </section>
             
              <div className={styles.mainGrid}>

              

              {productArray.map((product, index) => ( 
              <div className={styles.productBox}  key={index}>
                  <figure>
                    <img src={product.img} />
                  </figure>
                  <section>
                    <h3>{product.productName}</h3>
                    <p>
                    <img src={star} />{product.productRating}
                    <span className={styles.span}>
                    {product.productRatingCount}
                    </span>
                    </p>
                    <h4><img src={svgArray[21]} />{product.productPrice}</h4>
                    <span>{product.productQuantity}</span>
                  </section>
               
                  </div>
              ))}

             
         


                </div>
              
         </div>
      </div>
      <div className={styles.emptyDiv}>
      <section className={styles.topSection}>
      <h1>Embrace Africa with Emcelo</h1>
      <article>Embrace Africa with Emcelo: Journey through flavors, elegance, and artistry. Experience the richness of our spices, the luxury of our beauty products, the beauty of our fabrics, and the inspiration of our art. Welcome to Emcelo where Africa comes alive.</article>
      </section>
         
          <figure>
            <img src={emptyDivBack} />
          </figure>
          <figure>
          <img src={shareIcon} />
          <img src={copyIcon} />
          </figure>
      </div>
    </div>
  );
};

export default SecondSection;
