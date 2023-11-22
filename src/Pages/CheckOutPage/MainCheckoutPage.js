import { faFedex, faUps } from "@fortawesome/free-brands-svg-icons";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import useAuth from "../../hooks/useAuth";
import { postOrdersAsync } from "../../redux/feathers/ordersSlice";
import { emptyCart } from "../../redux/feathers/productsSlice";
import {CheckoutCart} from "../SharedComponents/Cart/Cart";
import Footer from "../SharedComponents/Footer/Footer";
import TopNavigation from "../SharedComponents/TopNavigation/TopNavigation";
import styles from "./CheckoutPage.module.css";
import { loadOrder } from "../../redux/feathers/ordersSlice";

const MainCheckoutPage = () => {
  const [data, setData] = useState({});
  const [isDisable, setIsDisable] = useState(false);

  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user.userProfile);
  const token = useSelector((state) => state.user.token);

  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const orderId = new URLSearchParams(window.location.search).get(
    "order_id"
  );
  console.log("orderIn", orderId);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderData = await loadOrder(orderId);
        console.log("orderData", orderData);
        setOrder(orderData[0]);
        setOrderItems(orderData[0].items)
      } catch (error) {
        setError(error.message || "Error loading order");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId]);

  const cart = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();
  console.log("order", order);

  const handelChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  let totalPrice = 0;
  for (const pd of cart) {
    totalPrice = totalPrice + Number(pd.totalPrice);
  }

  const shipping = data.shipping ? data.shipping : 0;
  const total = totalPrice + Number(shipping);

  useEffect(() => {
    document.title = "Checkout | Kacha Bazar";
    window.scrollTo({
      top: 0,
    });
    if (!totalPrice) {
      setIsDisable(true);
    }
  }, [totalPrice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisable(true);
    data.address = e.target.street.value;
    data.items = cart;
    data.token = token;

    dispatch(postOrdersAsync(data)).then((res) => {
      console.log("place order");
      navigate("/dashboard");
    });
  };

  console.log("order items", orderItems);

  return (
    <>
      <TopNavigation />
      <section id={styles.checkout}>
        <Container>
          <Row>
            <Col lg={6} className="mt-4 mt-md-0">
              <Container>
                <h4>01. Personal Details</h4>
                <form onSubmit={(e) => e.preventDefault()}>
                  <Row className="g-4">
                    <Col lg={6}>
                      <label htmlFor="userName">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        id="userName"
                        value={
                          loggedInUser.first_name + " " + loggedInUser.last_name
                        }
                        readOnly
                        disabled
                      />
                    </Col>
                    <Col lg={6}>
                      <label htmlFor="userEmail">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        id="userEmail"
                        value={loggedInUser.email}
                        readOnly
                        disabled
                      />
                    </Col>
                  </Row>
                </form>

                <h4>02. Shipping Details</h4>
                <form className="mt-4" onSubmit={handleSubmit}>
                  <Row className="g-4">
                    <Col lg={12}>
                      <label htmlFor="street">Street Address</label>
                      <input
                        type="text"
                        name="street"
                        id="street"
                        placeholder="123 Boulevard Rd, Beverley Hills"
                        value={order?.shipping_address}
                        autoComplete="off"
                        disabled
                      />
                    </Col>
                    <Col lg={4} className="mt-4">
                      <label htmlFor="city">Your City</label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="Los Angeles"
                        autoComplete="off"
                        value={order?.shipping_address}
                        disabled
                      />
                    </Col>
                    <Col lg={4} className="mt-4">
                      <label htmlFor="country">Your Country</label>
                      <input
                        type="text"
                        name="country"
                        id="country"
                        placeholder="United State"
                        autoComplete="off"
                        disabled
                      />
                    </Col>
                    <Col lg={4} className="mt-4">
                      <label htmlFor="zip">Country Code</label>
                      <input
                        type="number"
                        name="zip"
                        id="zip"
                        placeholder="12345"
                        autoComplete="off"
                        disabled
                      />
                    </Col>
                  </Row>

                  {/* <h4 className='my-5'>04. Payment Details</h4>

                  <Row>
                    <Col lg={6} className={styles.payment__methods}>
                      <label htmlFor='money'>
                        <FontAwesomeIcon icon={faMoneyBillWave} />
                        <span className='ms-3'>Cash On Delivery</span>
                      </label>
                      <input type='radio' name='payment' id={styles.money} required onChange={handelChange} value='COD' />
                    </Col>
                  </Row> */}
                  <span className="d-flex justify-content-center">
                    <button type="submit" disabled={isDisable}>
                      Checkout
                    </button>
                  </span>
                </form>
              </Container>
            </Col>
            <Col lg={6}>
              <div className={styles.order__summery}>
                <h4 className="mb-4">Your Order #{order?.order_id} Summary </h4>
                {orderItems && <CheckoutCart key={order?.id} items={orderItems} />}
                              
                <ul className={styles.total__cost}>
                  <li>
                    <span>Subtotal</span> <span>${order?.amount}</span>
                  </li>
                  <li>
                    <span>Shipping Cost</span>{" "}
                    <span>${order?.shipping_cost}.00</span>
                  </li>
                  <li>
                    <small className="text-secondary">Freight Fee</small>{" "}
                    <small className="text-secondary">${order?.shipping_fee}</small>
                  </li>
                  <li>
                    <small className="text-secondary">Handling Fee</small>{" "}
                    <small className="text-secondary">${order?.handling_fee}</small>
                  </li>
                 
                  <li>
                    <small className="text-secondary">Packaging Fee</small>{" "}
                    <small className="text-secondary">${order?.packaging_fee}</small>
                  </li>
                  <li>
                    <small className="text-secondary">Insurance Fee</small>{" "}
                    <small className="text-secondary">${order?.insurance_fee}</small>
                  </li>
                  <li>
                    <span>TOTAL COST</span>{" "}
                    <span>${order?.order_total}</span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default MainCheckoutPage;
