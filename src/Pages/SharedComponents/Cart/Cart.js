import { faMinus, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCommas } from "../../../fuctions";
import {
  handleCancelOrder,
  handleDecrease,
  handleIncrease,
  handleNairaDecrease,
  handleNairaIncrease,
} from "../../../redux/feathers/productsSlice";
import styles from "./Cart.module.css";

const Cart = ({ pd: { item, quantity, totalPrice, totalNairaPrice } }) => {
  const dispatch = useDispatch();
  const { country } = useSelector((state) => state.user);
  return (
    <div className={styles.cart__item}>
      <div className="d-flex align-self-center">
        <img src={item.image_url} alt={item.title} />
        <span className="ms-3">
          <h6>{item.title}</h6>
          {country === "Nigeria" ? (
            <small>₦{addCommas(item.price_naira)}</small>
          ) : (
            <small>${addCommas(item.price)}</small>
          )}
          {country === "Nigeria" ? (
             <h5>{totalNairaPrice ? addCommas(totalNairaPrice) : addCommas(item.price_naira)}</h5>
          ): (

          <h5>{totalPrice ? addCommas(totalPrice) : addCommas(item.price)}</h5>
          )}
        </span>
      </div>
      <div className={styles.counter}>
        <span onClick={() => {country === "Nigeria" ? dispatch(handleNairaDecrease(item.id)) : dispatch(handleDecrease(item.id))}}>
          <FontAwesomeIcon icon={faMinus} />
        </span>
        <span>{quantity}</span>
        <span onClick={() => { country === "Nigeria" ? dispatch(handleNairaIncrease(item.id)) :dispatch(handleIncrease(item.id))}}>
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </div>
      <div
        className={styles.delete__icon}
        onClick={() => dispatch(handleCancelOrder(item.id))}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </div>
    </div>
  );
};

export default Cart;
