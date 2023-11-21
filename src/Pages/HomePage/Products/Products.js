import React, { useEffect, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  loadProductsAsync,
} from "../../../redux/feathers/productsSlice";
import { fetchUserCountry } from "../../../redux/user/userSlice";
import LoadingSpinner from "../../SharedComponents/LoadingSpinner/LoadingSpinner";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./Products.module.css";
import { addCommas } from "../../../fuctions";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeProduct, setActiveProduct] = useState({});
  const [isDisable, setIsDisable] = useState(false);
  const cart = useSelector((state) => state.products.cart);
  const { country, } = useSelector((state) => state.user);

  useEffect(() => {
    const pd = cart.find((pd) => pd.item.id === activeProduct?.id);
    if (pd) {
      setIsDisable(true);
    }
  }, [activeProduct?.id, cart]);

  

  const handleClick = (item) => {
    const pd = {};
    pd.item = item;
    pd.quantity = 1;
    pd.totalPrice = pd.item.price;
    pd.totalNairaPrice = pd.item.price_naira
    dispatch(addToCart(pd));
  };

  useEffect(() => {
    dispatch(loadProductsAsync());
    dispatch(fetchUserCountry());
  }, [dispatch]);

  const state = useSelector((state) => state.products);


  return (
    <section id={styles.products}>
      <Container>
        <h3>Popular Products for Daily Shopping</h3>
        <p>
          See all our popular products in this week. You can choose your daily
          needs products from this list and get some special offer with free
          shipping.
        </p>
        <div className={styles.products__container}>
          {state.productsState.slice(0, 20)?.filter((product)=> product?.show)?.map((product) => (
            <ProductCard
              onClick={() => {
                setIsModalVisible(true);
                setActiveProduct(product);
               
              }}
              key={product.id}
              product={product}
            />
          ))}
        </div>
        {state.status === "Pending" && <LoadingSpinner />}

        <span className={styles.category__button}>
          <button onClick={() => navigate("categories/Fresh%20Vegetable")}>
            All Categories
          </button>
        </span>
      <Modal
        centered={true}
        show={isModalVisible}
        onHide={() => {
          setIsModalVisible(false);
          setActiveProduct({});
          setIsDisable(false)
        }}
        dialogClassName={styles.modalStyle}
      >
        <div className={styles.activeProduct}>
          <img src={activeProduct?.image_url} alt={activeProduct?.title} />

          <div className={styles.productContent}>
            <h4>{activeProduct?.title}</h4>
            <span className={styles.productStock}>
              <small>Stock:</small>
              <small>{activeProduct?.quantity}</small>
            </span>

            <p>{activeProduct?.description}</p>
            <h4> {country === "Nigeria" ? `₦${addCommas(activeProduct?.price_naira)}` :`$${addCommas(activeProduct?.price)}`}</h4>
            <span>
              <button
                onClick={() => handleClick(activeProduct)}
                disabled={isDisable}
              >
                <svg
                  stroke="currentColor"
                  fill="#10b981"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="23px"
                  width="23px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M460 160h-88v-12A116.13 116.13 0 00258.89 32h-5.78A116.13 116.13 0 00140 148v12H52a4 4 0 00-4 4v300a16 16 0 0016 16h384a16 16 0 0016-16V164a4 4 0 00-4-4zm-280-11c0-41.84 33.41-76.56 75.25-77A76.08 76.08 0 01332 148v12H180zm156 187h-64v64h-32v-64h-64v-32h64v-64h32v64h64z"></path>
                </svg>
              </button>
            </span>
          </div>
        </div>
      </Modal>
      </Container>
    </section>
  );
};

export default Products;
