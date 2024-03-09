import React from "react";
import styles from "./SecondSection.module.css";
import TestImg from "../../../assets/NewHomeImages/productImages/FirstSectionBackground.jpg";
import pepper from "../../../assets/NewHomeImages/productImages/black pepper.png"
import spiceIcon from "../../../assets/NewHomeImages/icons/png/spiceIcon.png"
import artIcon from "../../../assets/NewHomeImages/icons/png/artIcon.png"
import beauty from "../../../assets/NewHomeImages/icons/png/beutyProducts.png"
import carrots from "../../../assets/NewHomeImages/productImages/carrots.png"
import avacado from "../../../assets/NewHomeImages/productImages/avacado.png"
import spinach from "../../../assets/NewHomeImages/productImages/spinach.png"
import mushroom from "../../../assets/NewHomeImages/productImages/mushroom.png"
import blackPepper from "../../../assets/NewHomeImages/productImages/pepper.png"
import svgArray from "../../../assets/NewHomeImages/icons/svg/svg";

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
                <li><img src={spiceIcon} />Spices</li>
                <li><img src={beauty} />Beauty Products</li>
                <li><img src={artIcon} />Art</li>
                <li><img src={svgArray[4]} />Food Stuff</li>
                <li><img src={svgArray[3]} />African Fabrics</li>
                <li><img src={svgArray[13]} />Herbs</li>
                
              </ul>
           </section>

           <section className={styles.contact}>
               <h1>CONTACT US</h1>
                <ul>
                  <li><img src={svgArray[14]} />info@emcelo.com</li>
                  <li><img src={svgArray[15]} />+234 704 800 0910</li>
                  <li><img src={svgArray[15]} />+234 704 800 0910</li>
                  <li><img src={svgArray[16]} />Lagos State Nigeria</li>
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

                <div className={styles.productBox}>
                   <figure>
                    <img src={TestImg} />
                   </figure>
                   <section>
                     <h3>Ofada Rice</h3>
                     <p>4.5 <span>(5,345)</span></p>
                     <h4><img src={svgArray[21]} />90,000</h4>
                     <span>44 items left</span>
                   </section>

                </div>

                <div className={styles.productBox}>
                <figure>
                 <img src={TestImg} />
                </figure>
                <section>
                  <h3>Ofada Rice</h3>
                  <p>4.5 <span>(5,345)</span></p>
                  <h4><img src={svgArray[21]} />90,000</h4>
                  <span>44 items left</span>
                </section>

             </div>





             <div className={styles.productBox}>
                   <figure>
                    <img src={TestImg} />
                   </figure>
                   <section>
                     <h3>Ofada Rice</h3>
                     <p>4.5 <span>(5,345)</span></p>
                     <h4><img src={svgArray[21]} />90,000</h4>
                     <span>44 items left</span>
                   </section>

                </div>








                <div className={styles.productBox}>
                   <figure>
                    <img src={TestImg} />
                   </figure>
                   <section>
                     <h3>Ofada Rice</h3>
                     <p>4.5 <span>(5,345)</span></p>
                     <h4><img src={svgArray[21]} />90,000</h4>
                     <span>44 items left</span>
                   </section>

                </div>









                <div className={styles.productBox}>
                   <figure>
                    <img src={TestImg} />
                   </figure>
                   <section>
                     <h3>Ofada Rice</h3>
                     <p>4.5 <span>(5,345)</span></p>
                     <h4><img src={svgArray[21]} />90,000</h4>
                     <span>44 items left</span>
                   </section>

                </div>










                <div className={styles.productBox}>
                   <figure>
                    <img src={TestImg} />
                   </figure>
                   <section>
                     <h3>Ofada Rice</h3>
                     <p>4.5 <span>(5,345)</span></p>
                     <h4><img src={svgArray[21]} />90,000</h4>
                     <span>44 items left</span>
                   </section>

                </div>


                <div className={styles.productBox}>
                <figure>
                 <img src={TestImg} />
                </figure>
                <section>
                  <h3>Ofada Rice</h3>
                  <p>4.5 <span>(5,345)</span></p>
                  <h4><img src={svgArray[21]} />90,000</h4>
                  <span>44 items left</span>
                </section>

             </div>


             <div className={styles.productBox}>
             <figure>
              <img src={TestImg} />
             </figure>
             <section>
               <h3>Ofada Rice</h3>
               <p>4.5 <span>(5,345)</span></p>
               <h4><img src={svgArray[21]} />90,000</h4>
               <span>44 items left</span>
             </section>

          </div>


          <div className={styles.productBox}>
          <figure>
           <img src={TestImg} />
          </figure>
          <section>
            <h3>Ofada Rice</h3>
            <p>4.5 <span>(5,345)</span></p>
            <h4><img src={svgArray[21]} />90,000</h4>
            <span>44 items left</span>
          </section>

       </div>


       <div className={styles.productBox}>
       <figure>
        <img src={TestImg} />
       </figure>
       <section>
         <h3>Ofada Rice</h3>
         <p>4.5 <span>(5,345)</span></p>
         <h4><img src={svgArray[21]} />90,000</h4>
         <span>44 items left</span>
       </section>

    </div>


    <div className={styles.productBox}>
    <figure>
     <img src={TestImg} />
    </figure>
    <section>
      <h3>Ofada Rice</h3>
      <p>4.5 <span>(5,345)</span></p>
      <h4><img src={svgArray[21]} />90,000</h4>
      <span>44 items left</span>
    </section>

 </div>


 <div className={styles.productBox}>
 <figure>
  <img src={TestImg} />
 </figure>
 <section>
   <h3>Ofada Rice</h3>
   <p>4.5 <span>(5,345)</span></p>
   <h4><img src={svgArray[21]} />90,000</h4>
   <span>44 items left</span>
 </section>

</div>


<div className={styles.productBox}>
<figure>
 <img src={TestImg} />
</figure>
<section>
  <h3>Ofada Rice</h3>
  <p>4.5 <span>(5,345)</span></p>
  <h4><img src={svgArray[21]} />90,000</h4>
  <span>44 items left</span>
</section>

</div>


<div className={styles.productBox}>
<figure>
 <img src={TestImg} />
</figure>
<section>
  <h3>Ofada Rice</h3>
  <p>4.5 <span>(5,345)</span></p>
  <h4><img src={svgArray[21]} />90,000</h4>
  <span>44 items left</span>
</section>

</div>



<div className={styles.productBox}>
<figure>
 <img src={TestImg} />
</figure>
<section>
  <h3>Ofada Rice</h3>
  <p>4.5 <span>(5,345)</span></p>
  <h4><img src={svgArray[21]} />90,000</h4>
  <span>44 items left</span>
</section>

</div>


<div className={styles.productBox}>
<figure>
 <img src={TestImg} />
</figure>
<section>
  <h3>Ofada Rice</h3>
  <p>4.5 <span>(5,345)</span></p>
  <h4><img src={svgArray[21]} />90,000</h4>
  <span>44 items left</span>
</section>

</div>


<div className={styles.productBox}>
<figure>
 <img src={TestImg} />
</figure>
<section>
  <h3>Ofada Rice</h3>
  <p>4.5 <span>(5,345)</span></p>
  <h4><img src={svgArray[21]} />90,000</h4>
  <span>44 items left</span>
</section>

</div>


<div className={styles.productBox}>
<figure>
 <img src={TestImg} />
</figure>
<section>
  <h3>Ofada Rice</h3>
  <p>4.5 <span>(5,345)</span></p>
  <h4><img src={svgArray[21]} />90,000</h4>
  <span>44 items left</span>
</section>

</div>

              </div>
              
         </div>
      </div>
      <div className={styles.emptyDiv}>
      
      </div>
    </div>
  );
};

export default SecondSection;
