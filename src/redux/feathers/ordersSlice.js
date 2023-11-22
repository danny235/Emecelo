import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import {BASE_URL} from "../../components/api"
import { useDispatch, useSelector } from 'react-redux';


const initialState = {
  ordersState: [],
  status: 'idle',
};

const token = localStorage.getItem('userToken');

const headers = {
  Authorization: `Bearer ${token}`,
};


export const loadOrdersAsync = createAsyncThunk(
  'orders/loadOrdersAsync',
  async () => {
    const response = await axios.get(`${BASE_URL}orders/`, { headers });
    return response.data;
  }
);

export const loadOrder = async (order_id) => {
  try {
    const response = await axios.get(`${BASE_URL}orders/?order_id=${order_id}`, { headers });
    return response.data;
  } catch (error) {
    // Handle errors if needed
    console.log('Error loading order:', error);
    throw error; // You can choose to handle or propagate the error as needed
  }
};

export const validatePayment = async (order_id, payload) => {
  try {
    const response = await axios.post(`${BASE_URL}payment/${order_id}/`, payload, { headers });
    console.log("response payload", response.data)
    return response.data;
  } catch (error) {
    // Handle errors if needed
    console.log('Error loading order:', error);
    throw error; // You can choose to handle or propagate the error as needed
  }
};



export const postOrdersAsync = createAsyncThunk(
  'orders/postOrdersAsync',
  async (payload) => {    
    const response = await axios.post(
      `${BASE_URL}place-order/`, payload, { headers});
    return response.data;
  }
);

export const cancelOrdersAsync = createAsyncThunk(
  'orders/cancelOrdersAsync',
  async (payload) => {
    const response = await axios.delete(`${BASE_URL}orders/${payload}`, { headers });
    return response.data;
  }
);

export const updateOrdersAsync = createAsyncThunk(
  'orders/updateOrdersAsync',
  async (payload) => {
    const response = await axios.put(
      `https://kacha-bazar.up.railway.app/order/${payload.id}`,
      payload
    );
    return response;
  }
);


export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    updateOrders: (state, { payload }) => {
      state.ordersState = state.ordersState.map((item) => {
        let items = item;
        if (item._id === payload.id) {
          item.status = payload.status;
          items = { ...item };
        }
        return items;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postOrdersAsync.pending, (state, action) => {
      toast.loading('Processing... Please Wait!!');
    });
    builder.addCase(postOrdersAsync.fulfilled, (state, { payload }) => {
      toast.dismiss();
      toast.success('Your Order is Successfully post!!!');
    });
    builder.addCase(postOrdersAsync.rejected, (state, { error: { message } }) => {
      toast.dismiss();
      toast.error(message);
    });
    builder.addCase(loadOrdersAsync.pending, (state, action) => {
      state.status = 'Pending';
    });
    builder.addCase(loadOrdersAsync.fulfilled, (state, { payload }) => {
      state.ordersState = payload;
      state.status = 'Success';
      toast.success('Your Order is loaded!!!');
    });
    builder.addCase(loadOrdersAsync.rejected, (state, { error: { message } }) => {
      state.status = 'Rejected';
      toast.error(message);
    });
    builder.addCase(cancelOrdersAsync.pending, (state, action) => {
      toast.loading('Deleting... Please Wait!!');
    });
    builder.addCase(cancelOrdersAsync.fulfilled, (state, { payload, meta: { arg } }) => {
      toast.dismiss();
      state.ordersState = state.ordersState.filter((order) => order._id !== arg);
      toast.success('Your Order is canceled..');
    });
    builder.addCase(cancelOrdersAsync.rejected, (state, { error: { message } }) => {
      toast.dismiss();
      toast.error(message);
    });
    builder.addCase(updateOrdersAsync.pending, (state, action) => {
      toast.loading('updating... Please Wait!!');
    });
    builder.addCase(updateOrdersAsync.fulfilled, (state, { payload }) => {
      toast.dismiss();
      const data = JSON.parse(payload?.config?.data);
      toast.success(`Order is ${data.status}`);
    });

    builder.addCase(updateOrdersAsync.rejected, (state, { error: { message } }) => {
      toast.dismiss();
      toast.error(message);
    });
  },
});

export const { updateOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
