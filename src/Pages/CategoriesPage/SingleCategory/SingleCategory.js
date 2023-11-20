import React, { useEffect, useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart, emptyPrev, loadQueryProductsAsync, productSorting } from '../../../redux/feathers/productsSlice';
import ProductCard from '../../HomePage/ProductCard/ProductCard';
import LoadingSpinner from '../../SharedComponents/LoadingSpinner/LoadingSpinner';
import styles from './SingleCategory.module.css';
import { addCommas } from '../../../fuctions';

const SingleCategory = () => {
  const { searchString } = useParams();
  const dispatch = useDispatch();
  const {categories} = useSelector((state) => state.products);
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
    window.scrollTo({
      top: 0,
    });
   
  }, [dispatch, searchString]);

  return (
    <Container>
     
   
          <div className='d-flex justify-content-between mb-4'>
            
            
            <form onSubmit={(e) => e.preventDefault()}>
              <select name='price' onChange={(e) => dispatch(productSorting(e.target.value))}>
                <option value='high'>High to Low</option>
                <option value='low'>Low to High</option>
              </select>
            </form>
          </div>



          <div className={styles.category__container}>
            {categories?.filter((cat)=>cat.slug === searchString)?.map((product) => 
              product?.products.length !== 0 ?
              product?.products?.filter((product)=> product?.show)?.map((prod)=> <ProductCard  onClick={() => {
                setIsModalVisible(true);
                setActiveProduct(prod);
               
              }} product={prod} key={prod.id} />) : (
                <div>
                  <p>Oops! There are no products in this category 🥲</p>
                </div>
              ))}
              
              
            
          </div>
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
  );
};

export default SingleCategory;
