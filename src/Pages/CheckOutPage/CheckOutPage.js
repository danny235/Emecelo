import { faFedex, faUps } from '@fortawesome/free-brands-svg-icons';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import useAuth from '../../hooks/useAuth';
import { postOrdersAsync } from '../../redux/feathers/ordersSlice';
import { emptyCart } from '../../redux/feathers/productsSlice';
import Cart from '../SharedComponents/Cart/Cart';
import Footer from '../SharedComponents/Footer/Footer';
import TopNavigation from '../SharedComponents/TopNavigation/TopNavigation';
import styles from './CheckoutPage.module.css';



const CheckOutPage = () => {
  const [data, setData] = useState({});
  const [isDisable, setIsDisable] = useState(false);
  const [modalShow, setModalShow] = React.useState(true);
  const [show, setShow] = useState(false);
  const [order, setOrder] = useState([])

  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user.userProfile);
  const token = useSelector((state) => state.user.token);


  
  const cart = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();
  console.log("cart", cart)


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
    document.title = 'Checkout | Kacha Bazar';
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
    // const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // const date = new Date();
    // const year = date.getFullYear();
    // const day = date.getDate();
    // const monthName = month[date.getMonth()];
    data.address = e.target.street.value;
    data.items = cart;
    data.token = token


    dispatch(postOrdersAsync(data)).then((res) => {

      console.log("place order", res?.payload)
      setOrder(res?.payload);
      handleShow();
      
      // if (res.payload.insertedId) {
      //   swal({
      //     title: `Well Done ${loggedInUser.displayName}!!`,
      //     text: `You Have To Pay Us ${total}$!`,
      //     icon: 'success',
      //     button: 'OK!',
      //     position: 'center',
      //   });
      //   navigate('/dashboard/my-orders');
      //   dispatch(emptyCart());
      //   setIsDisable(false);
      // }
    });
  };

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setTimeout(() => window.location.reload(), 200);
    navigate("/dashboard/my-orders");
    dispatch(emptyCart());
  };

  console.log("here data", order)
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
            Order Placed Successfully
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
          <p style={{ fontWeight: 600 }}>Order ID: {order?.order_id}</p>
       
            Your order has been received, it will be ready for payment within 2
            working hours. Kindly check pending orders in your profile if you
            did not get a mail notification.
      
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
            <Col lg={6} className='mt-4 mt-md-0'>
              <Container>
                <h4>01. Personal Details</h4>
                <form onSubmit={(e) => e.preventDefault()}>
                  <Row className='g-4'>
                    <Col lg={6}>
                      <label htmlFor='userName'>Your Name</label>
                      <input type='text' name='name' id='userName' value={loggedInUser.first_name + " " + loggedInUser.last_name} readOnly />
                    </Col>
                    <Col lg={6}>
                      <label htmlFor='userEmail'>Email Address</label>
                      <input type='email' name='email' id='userEmail' value={loggedInUser.email} readOnly />
                    </Col>
                    
                  
                  </Row>
                </form>

                <h4>02. Shipping Details</h4>
                <form className='mt-4' onSubmit={handleSubmit}>
                  <Row className='g-4'>
                    <Col lg={12}>
                      <label htmlFor='street'>Street Address</label>
                      <input type='text' name='street' id='street' placeholder='123 Boulevard Rd, Beverley Hills' autoComplete='off' required />
                    </Col>
                    <Col lg={4} className='mt-4'>
                      <label htmlFor='city'>Your City</label>
                      <input type='text' name='city' id='city' placeholder='Los Angeles' autoComplete='off' required />
                    </Col>
                    <Col lg={4} className='mt-4'>
                      <label htmlFor='country'>Your Country</label>
                      <input type='text' name='country' id='country' placeholder='United State' autoComplete='off' required />
                    </Col>
                    <Col lg={4} className='mt-4'>
                      <label htmlFor='zip'>Country Code</label>
                      <input type='number' name='zip' id='zip' placeholder='12345' autoComplete='off' required />
                    </Col>
                  </Row>
                 
             
                    <button className='btn btn-block w-100' type='submit' disabled={isDisable}>
                     Place your Order
                    </button>
            
                </form>
              </Container>
            </Col>
            <Col lg={6}>
              <div className={styles.order__summery}>
                <h4 className='mb-4'>Order Summary</h4>
                {cart.length ? (
                  <div className={styles.product__container}>
                    {
                      // map category data
                      cart.map((pd) => (
                        <Cart key={pd.item._id} pd={pd} />
                      ))
                    }
                  </div>
                ) : (
                  <div className={styles.placeholder__text}>
                    <span className={styles.placeholder__image}>
                      <svg
                        stroke='currentColor'
                        fill='#10b981 '
                        strokeWidth='0'
                        viewBox='0 0 512 512'
                        height='30px'
                        width='30px'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176zm192 96a112 112 0 01-224 0v-16a16 16 0 0132 0v16a80 80 0 00160 0v-16a16 16 0 0132 0z'></path>
                      </svg>
                    </span>
                    <h6>Your cart is empty</h6>
                    <p>No items added in your cart. Please add product to your cart list.</p>
                  </div>
                )}
                
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default CheckOutPage;
