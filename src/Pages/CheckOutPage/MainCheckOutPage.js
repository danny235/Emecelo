import { faFedex, faUps } from "@fortawesome/free-brands-svg-icons";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
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
import { loadOrder, validatePayment } from "../../redux/feathers/ordersSlice";
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

const CheckoutPage = () => {
  const [data, setData] = useState({});
  const [isDisable, setIsDisable] = useState(false);

  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user.userProfile);
  const token = useSelector((state) => state.user.token);
  const [show, setShow] = useState(false);

  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const orderId = new URLSearchParams(window.location.search).get(
    "order_id"
  );




  const config = {
    public_key: 'FLWPUBK_TEST-7519aba9ae9e61e0d172347148c37654-X',
    tx_ref: Date.now(),
    amount: order?.order_total,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'test@gmail.com',
      phone_number: '070********',
      name: 'name',
    },
    customizations: {
      title: 'Emcelo',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Make Payment',
    className: 'btn btn-block w-100',
    callback: (response) => {
       console.log("flutter", response);
       saveTransaction(response);
      closePaymentModal() // this will close the modal programmatically
    },
    onClose: () => {},
  };


  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setTimeout(() => window.location.reload(), 200);
    navigate("/dashboard/my-orders");
  };


  const saveTransaction = async (payload) => {
    const saveData = await validatePayment(order.order_id, payload)
    console.log("save transaction", saveData)
    handleShow();
  
  }

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
  };

  console.log("order items", orderItems);

  return (
    <>
      <TopNavigation />
      <section id={styles.checkout}>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{ justifyContent: "center" }}>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ fontWeight: 600 }}
          >
           Payment Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ textAlign: "center", alignSelf: "center" }}
          className="mb-5"
        >
          {/* <FontAwesomeIcon
            icon={faCheckCircle}
            size="6x"
            color={Colors.BES_PURPLE}
            className="mb-5"
          /> */}
          <p style={{ fontWeight: 500 }}>
            🎉 Payment for order #{order?.order_id} was successfull! </p>

          <p>Thank you.</p>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button
            onClick={handleClose}
            style={{
              borderRadius: 10,
              backgroundColor: "green",
              color: "#FFFFFF",
              fontSize: 16,
              width: 150,
              marginTop: 20,
              height: 50,
              border: "none",
            }}
          > Done
          </Button>
        </Modal.Footer>
      </Modal>
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
                  <span className="d-flex justify-content-center" >
                    <FlutterWaveButton {...fwConfig} />
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

export default CheckoutPage;
