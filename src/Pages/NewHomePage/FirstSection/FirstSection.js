import React, { useState, useEffect } from "react";
import styles from "./FirstSection.module.css";
import svgArray from "../../../assets/NewHomeImages/icons/svg/svg";
import backgroundImages from "../../SharedComponents/NewTopNavigation/functions"; 

const FirstSection = () => {
  const [backgroundImage, setBackgroundImage] = useState(""); 
  // Define backgroundImage state

  useEffect(() => {
    // Function to change the background image
    const changeBackgroundImage = () => {
      const randomIndex = Math.floor(Math.random() * backgroundImages.length);
      const randomImage = backgroundImages[randomIndex];
      setBackgroundImage(randomImage); // Update backgroundImage state
    };

    // Call the function initially
    changeBackgroundImage();

    // Change background image every 3 seconds
    const intervalId = setInterval(changeBackgroundImage, 2000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div className={styles.main} id={styles.main} style={{ backgroundImage: `url(${backgroundImage})` }}>

      <i className={styles.absoluteText}><marquee behavior="scroll" direction="left">. . . . . . . . .Your e-commerce mall for African indigenous products, foods and supplies</marquee></i>
      <h1>Welcome to Emcelo</h1>
      <h4>...Your Portal for Authentic African Goods</h4>
    
      <section>
        <article>
          At Emcelo, we're passionate about bringing the vibrant flavors and rich culinary heritage of Nigeria directly to your doorstep. Explore our curated selection of premium raw foods sourced from the finest farms and producers across Nigeria.
        </article>
      </section>

      <figure>
        <input
          type="text"
          placeholder="Search for product"
        />
        <a href="/search">Search</a>
        <img src={svgArray[19]} className={styles.searchIcon} alt="Search" />
      </figure>
    </div>
  );
};

export default FirstSection;
