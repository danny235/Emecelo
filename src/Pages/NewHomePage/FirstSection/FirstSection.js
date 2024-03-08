import React, { useState } from "react";
import styles from "./FirstSection.module.css";

const FirstSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className={styles.main}>
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
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </figure>
    </div>
  );
};

export default FirstSection;
