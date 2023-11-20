import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import apple from '../../../assets/images/categories/apple.webp';
import baby from '../../../assets/images/categories/baby.webp';
import beauty from '../../../assets/images/categories/beauty.webp';
import breakfast from '../../../assets/images/categories/Breakfast.webp';
import fruits from '../../../assets/images/categories/cabbage.webp';
import fish from '../../../assets/images/categories/carp-fish.webp';
import cat from '../../../assets/images/categories/cat.webp';
import chili from '../../../assets/images/categories/chili-sauce.webp';
import chips from '../../../assets/images/categories/chips.webp';
import cleaner from '../../../assets/images/categories/cleaner.webp';
import cookie from '../../../assets/images/categories/cookie.webp';
import cooking from '../../../assets/images/categories/Cooking.webp';
import dumbbell from '../../../assets/images/categories/dumbbell.webp';
import honey from '../../../assets/images/categories/honey.webp';
import milk from '../../../assets/images/categories/milk.webp';
import shrimp from '../../../assets/images/categories/shrimp.webp';
import drink from '../../../assets/images/categories/soft-drink.webp';
import jam from '../../../assets/images/categories/strawberry-jam.webp';
import CategoryCard from '../CategoryCard/CategoryCard';
import styles from './FeaturedCategories.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategoriesAsync } from '../../../redux/feathers/productsSlice';
import LoadingSpinner from '../../SharedComponents/LoadingSpinner/LoadingSpinner';

const FeaturedCategories = () => {
  const {categories, categoriesStatus} = useSelector(state=>state.products)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(loadCategoriesAsync())
  },[])

  return (
    <section id={styles.categories}>
      <Container>
        <h3>Featured Categories</h3>
        <p>Choose your necessary products from this feature categories.</p>
        <Row className='mt-3 pb-4 g-4'>
          {
            // map category data
            categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))
          }
        </Row>
        {categoriesStatus === "Pending" && <LoadingSpinner />}
      </Container>
    </section>
  );
};

export default FeaturedCategories;
