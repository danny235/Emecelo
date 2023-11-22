import { NavLink, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import useAuth from "../../../hooks/useAuth";
import {
  cancelOrdersAsync,
  loadOrdersAsync,
} from "../../../redux/feathers/ordersSlice";
import LoadingSpinner from "../../SharedComponents/LoadingSpinner/LoadingSpinner";
import styles from "./MyOrders.module.css";
import moment from "moment";


export const orderStatusMapping = {
  null: "Awaiting confirmation",
  1: "Order opened",
  3: "Order processed",
  5: "Order delivered",
  6: "Order refunded",
};

const MyOrders = () => {
  // const { loggedInUser } = useAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { userProfile } = useSelector((state) => state.user);

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

  return (
    <section id={styles.my__order}>
      <h1>My Orders</h1>
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
              <Table bordered size="sm" responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Order ID</th>

                    <th>Status</th>
               
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.ordersState.map((order, idx) => (
                    <tr key={order.order_id}>
                      <td className="fw-bold">{idx + 1}</td>
                      <td>{order.order_id}</td>
                      <td className="text-sm font-sm"> 
                      <small className="text-sm">{orderStatusMapping[order.status]}</small>
                      </td>
                  
                      <td className="flex gap-5">
                        {/* <span className="bg bg-secondary text-sm text-white rounded mr-5" onClick={() => handleDeleteOrder(order.order_id)}>
                        <button className="btn btn-sm text-white rounded">Details</button>
                        </span> */}
                      {order.status === null  ? <button className="px-3 py-1 button-main rounded border-0 text-white" onClick={() => navigate(`/checkout?order_id=${order.order_id}`)}>
                          Checkout
                      </button>
                    :  
                    <button className="px-3 py-1 button-main border-0 rounded text-white" onClick={() => navigate('/')}>
                       View order
                    </button>
                    }
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
