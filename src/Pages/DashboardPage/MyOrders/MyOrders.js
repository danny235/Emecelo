import { NavLink, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import useAuth from "../../../hooks/useAuth";
import {
  cancelOrdersAsync,
  loadOrdersAsync,
  loadOrder,
  ordersCount,
} from "../../../redux/feathers/ordersSlice";
import LoadingSpinner from "../../SharedComponents/LoadingSpinner/LoadingSpinner";
import styles from "./MyOrders.module.css";
import moment from "moment";
import { Col, Modal, Row } from "react-bootstrap";
import { CheckoutCart } from "../../SharedComponents/Cart/Cart";
import {
  FiCheck,
  FiFileText,
  FiGrid,
  FiList,
  FiRefreshCw,
  FiSettings,
  FiShoppingCart,
  FiTruck,
} from "react-icons/fi";
import "./styles.scss";

export const orderStatusMapping = {
  null: "Awaiting confirmation",
  1: "Order opened",
  3: "Order processed",
  4: "Order Refunded",
  5: "Order delivered",
};

const Card = ({ title, Icon, quantity, className }) => {
  return (
    <div className="d-flex h-100">
    <div className="d-flex align-items-center border border-gray-200 w-100 rounded-lg p-4">
      <div
        className={`d-flex align-items-center justify-content-center p-3 rounded-circle h-12 w-12 text-xl text-center mr-4 ${className}`}
      >
        <Icon />
      </div>
      <div>
        <h5 className="m-0 mb-2 text-base font-weight-medium font-serif text-gray-700">
          {title}
        </h5>
        <p className="m-0 text-xl font-weight-bold font-serif text-gray-800">
          {quantity}
        </p>
      </div>
    </div>
  </div>
  
  );
};

const MyOrders = () => {
  // const { loggedInUser } = useAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userProfile } = useSelector((state) => state.user);
  const [orderDetails, setOrderDetails] = useState({});
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [orderItems, setOrderItems] = useState(null);
  const [orderDataCount, setOrderDataCount] = useState({
    total: 0,
    processed: 0,
    pending: 0,
    completed: 0,
  });

  const orders = useSelector((state) => state.orders);
  console.log("orders", orders);
  useEffect(() => {
    dispatch(loadOrdersAsync());
  }, [dispatch]);

  const handleDeleteOrder = (id) => {
    swal({
      title: "Are you sure?",
      text: "After deleted you will not be able to recover this Order!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      willDelete
        ? dispatch(cancelOrdersAsync(id))
        : swal("Your Order is safe!!");
    });
  };

  const getOrderDetails = async (orderId) => {
    try {
      const orderData = await loadOrder(orderId);
      console.log("orderData", orderData);
      setOrderDetails(orderData[0]);
      setOrderItems(orderData[0].items);
    } catch (error) {
      setError(error.message || "Error loading order");
    } finally {
    }
  };


  const handleClose = () => setShow(false);

  useEffect(() => {
    const getOrdersCount = async () => {
      try {
        const data = await ordersCount();
        // console.log("ordersCount", data);
        setOrderDataCount(data);
      } catch (error) {
        setError(error.message || "Error loading order");
      } finally {
        // Any cleanup or additional logic can go here
      }
    };

    // Call the function
    getOrdersCount();
  }, []); // The empty dependency array ensures that the effect runs only once


  const handleShow = (orderId) => {
    getOrderDetails(orderId);
    setShow(true);
  };
  console.log("orderDataCount", orderDataCount);

  return (
    <section id={styles.my__order}>
      <Modal
        className="modal-content-z"
        show={show}
        size="lg"
        onHide={handleClose}
        backdrop="static"
        centered
      >
       
       <div className="p-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >ITEMS</div>
          <div onClick={handleClose} className="mr-1"><i class="fa fa-2x fa-window-close"></i></div>
        </div>
        <hr/>
        <Modal.Body style={{ height: "inherit" }}>
       
          {orderItems && (
            <CheckoutCart key={orderDetails?.order_id} items={orderItems} />
          )}
          <Row>
            <Col lg={4}>
              {" "}
              {/* <p>
                        <span style={{ fontWeight: "bold" }}>
                          Delivery Type:
                        </span>{" "}
                        {orderDetails.delivery_type === "PUP"
                          ? "Pickup"
                          : "Door-to-Door"}
                      </p> */}
              <p>
                <span style={{ fontWeight: "bold" }}>Delivery Address:</span>{" "}
                {orderDetails?.shipping_address}
              </p>
            </Col>
            <Col lg={8}>
              <p>
                <span style={{ fontWeight: "bold" }}>Freight Cost:</span> $
                {orderDetails?.shipping_fee}
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              {" "}
              <p>
                <span style={{ fontWeight: "bold" }}>Handling Fee:</span> $
                {orderDetails?.handling_fee}
              </p>
            </Col>
            <Col lg={4}>
              {" "}
              <p>
                <span style={{ fontWeight: "bold" }}>Packaging Fee:</span> $
                {orderDetails?.packaging_fee}
              </p>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <h1 className="font-bold mb-3">My Orders</h1>
      <div className="d-flex gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <Card
          title={"Total Orders"}
          Icon={FiShoppingCart}
          quantity={orderDataCount.total}
          className="text-danger border-2"
        />
        <Card
          title={"Pending Orders"}
          Icon={FiRefreshCw}
          quantity={orderDataCount.pending}
          className="text-orange border-2"
        />
        <Card
          title={"Processing Order"}
          Icon={FiTruck}
          quantity={orderDataCount.processed}
          className="text-primary border-2"
        />
        <Card
          title={"Complete Orders"}
          Icon={FiCheck}
          quantity={orderDataCount.completed}
          className="text-secondary border-2"
        />
      </div>

      {orders.status === "Pending" ? (
        <LoadingSpinner />
      ) : (
        <>
          {!orders.ordersState.length ? (
            <div className={styles.placeholder__text}>
              <span className={styles.placeholder__image}>
                <svg
                  stroke="currentColor"
                  fill="#10b981 "
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="30px"
                  width="30px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176zm192 96a112 112 0 01-224 0v-16a16 16 0 0132 0v16a80 80 0 00160 0v-16a16 16 0 0132 0z"></path>
                </svg>
              </span>
              <h6>Your Don't Order Any Product</h6>
              <p>
                No items added in your Order List. Please add product to your
                Order list.
              </p>
            </div>
          ) : (
            <>
              <Table bordered size="sm" className="border-none" responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Order ID</th>

                    <th>Status</th>

                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.ordersState.map((order, idx) => (
                    <tr key={order.order_id}>
                      <td className="fw-bold">{idx + 1}</td>
                      <td>{order.order_id}</td>
                      <td className="text-sm font-sm">
                        <small className={`text-sm status-${order.status}`}>
                          {orderStatusMapping[order.status]}
                        </small>
                      </td>
                      
                      <td className="flex gap-2">
                        <small
                          className="ml-5 cursor badge bg-secondary"
                          onClick={() => handleShow(order.order_id)}
                        >
                          <i className="fas fa-eye"></i> View
                        </small>
                        {order.status === null && (
                          <small
                            className="cursor badge text-dark bg-light"
                            onClick={() => handleDeleteOrder(order.id)}
                          >
                            <i className="fas fa-trash"></i> Cancel
                          </small>
                        )}
                      </td>
                      <td>
                        {order.order_reviewed === true &&
                          order.status === null && (
                            <button
                              className="px-3 py-1 button-main rounded border-0 text-white"
                              onClick={() =>
                                navigate(`/checkout?order_id=${order.order_id}`)
                              }
                            >
                              Make Payment (${order.order_total})
                            </button>
                          )}
                      </td>
                     
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default MyOrders;
