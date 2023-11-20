import React from 'react';
import { Col } from 'react-bootstrap';
import styles from './CategoryCard.module.css';
import cooking from "../../../assets/images/categories/Cooking.webp";
import { NavLink } from 'react-router-dom';

const CategoryCard = ({ category: { title, icon, slug } }) => {
  return (
    <Col lg={2} md={3} sm={4} xs={6}>
      <NavLink to={`/categories/${slug}`}>

      <div className={styles.card}>
        <img src={icon ? icon : cooking} alt={title} />
        <h6 style={{textTransform: "capitalize"}}>{title}</h6>
      </div>
      </NavLink>
    </Col>
  );
};

export default CategoryCard;
