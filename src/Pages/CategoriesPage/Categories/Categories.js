import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import apple from '../../../assets/images/categories/apple.webp';
import baby from '../../../assets/images/categories/baby.webp';
import beauty from '../../../assets/images/categories/beauty.webp';
import breakfast from '../../../assets/images/categories/Breakfast.webp';
import vegetable from '../../../assets/images/categories/cabbage.webp';
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
import drink from '../../../assets/images/categories/soft-drink.webp';
import jam from '../../../assets/images/categories/strawberry-jam.webp';
import { loadCategoriesAsync, loadProductsAsync } from '../../../redux/feathers/productsSlice';
import CartTracker from '../../HomePage/CartTracker/CartTracker';
import DailyNeeds from '../../SharedComponents/DailyNeeds/DailyNeeds';
import Footer from '../../SharedComponents/Footer/Footer';
import TopNavigation from '../../SharedComponents/TopNavigation/TopNavigation';
import styles from './Categories.module.css';
import LoadingSpinner from '../../SharedComponents/LoadingSpinner/LoadingSpinner';

const Categories = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadProductsAsync());
  // }, [dispatch]);

  const {categories, categoriesStatus} = useSelector((state) => state.products);

  


  useEffect(() => {
    document.title = 'All Categories | Emecelo';
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(()=>{
    dispatch(loadCategoriesAsync())
  }, [])





  return (
    <>
      <TopNavigation />
      <CartTracker />
      <section id={styles.categories}>
        <Container>
          <Row>
            
            <Col lg={3}>
              <h3 className='mb-4'>Categories</h3>
              <aside id={styles.aside}>
                {categories.map((pd, idx) => (
                  <NavLink key={idx} to={`/categories/${pd.slug}`} className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                    <span>
                      <img src={pd.icon? pd.icon : cooking} alt={pd.title} />
                      <h4>{pd.title}</h4>
                    </span>
                    {pd.name}
                  </NavLink>
                ))}
                {categoriesStatus === "Pending" && <LoadingSpinner />}
              </aside>
            </Col>
            <Col lg={9}>
              <Outlet />
            </Col>
          </Row>


        </Container>
        
        
      </section>

      <DailyNeeds />
      <Footer />
    </>
  );
};

export default Categories;
