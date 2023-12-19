import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import cooking from "../../../assets/images/categories/Cooking.webp";
import { loadCategoriesAsync } from "../../../redux/feathers/productsSlice";
import CartTracker from "../../HomePage/CartTracker/CartTracker";
import DailyNeeds from "../../SharedComponents/DailyNeeds/DailyNeeds";
import Footer from "../../SharedComponents/Footer/Footer";
import LoadingSpinner from "../../SharedComponents/LoadingSpinner/LoadingSpinner";
import TopNavigation from "../../SharedComponents/TopNavigation/TopNavigation";
import styles from "./Categories.module.css";

const Categories = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadProductsAsync());
  // }, [dispatch]);

  const { categories, categoriesStatus } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    document.title = "All Categories | Emcelo";
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    dispatch(loadCategoriesAsync());
  }, []);

  return (
    <>
      <TopNavigation />
      <CartTracker />
      <section id={styles.categories}>
        <Container>
          <Row>
            <Col lg={3}>
              <h3 className="mb-4">Categories</h3>
              <aside id={styles.aside}>
                {categories.map((pd, idx) => (
                  <NavLink
                    key={idx}
                    to={`/categories/${pd.slug}`}
                    className={(navInfo) =>
                      navInfo.isActive ? styles.active : ""
                    }
                  >
                    <span>
                      <img src={pd.icon ? pd.icon : cooking} alt={pd.title} />
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
