import React, { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SingleCategory from "./Pages/CategoriesPage/SingleCategory/SingleCategory";
import AddReview from "./Pages/DashboardPage/AddReview/AddReview";
import MyOrders from "./Pages/DashboardPage/MyOrders/MyOrders";
import Profile from "./Pages/DashboardPage/Profile/Profile";
import PreLoader from "./Pages/SharedComponents/PreLoader/PreLoader";
import ScrollToTop from "./Pages/SharedComponents/ScrollToTop/ScrollToTop";
// import CheckoutPage from "./Pages/CheckOutPage/CheckoutPage";
import SearchResults from "./Pages/Search/SearchResults";
import {NewHome} from "./Pages/NewHomePage/Home/Home"
// const Home = lazy(() => import("./Pages/NewHomePage/Home/Home"));
const Login = lazy(() => import("./Pages/AuthPage/LogIn/Login"));
const AboutUs = lazy(() => import("./Pages/AboutUsPage/AboutUs/AboutUs"));
const Register = lazy(() => import("./Pages/AuthPage/Register/Register"));
const Dashboard = lazy(() =>
  import("./Pages/DashboardPage/Dashboard/Dashboard")
);
const ContactUs = lazy(() => import("./Pages/ContactUsPage/ContactUs"));
const Categories = lazy(() =>
  import("./Pages/CategoriesPage/Categories/Categories")
);
const PlaceOrderPage = lazy(() => import("./Pages/CheckOutPage/PlaceOrderPage"));
const  CheckoutPage = lazy(() => import("./Pages/CheckOutPage/MainCheckOutPage"));

const NotFoundPage = lazy(() => import("./Pages/NotFoundPage/NotFoundPage"));
const PrivacyPolicy = lazy(() =>
  import("./Pages/PrivacyPolicyPage/PrivacyPolicy")
);
const ResetPassword = lazy(() =>
  import("./Pages/AuthPage/ResetPassword/ResetPassword")
);
const TermsAndCondition = lazy(() =>
  import("./Pages/TermsAndConditionPage/TermsAndCondition")
);

function App() {
  const { token } = useSelector((state) => state.user);
  
  return (
    <>
      <ScrollToTop />
      <Toaster  position="top-center"
  reverseOrder={false} />
      <Suspense fallback={<PreLoader />}>
        <Routes>
          <Route exact path="/" element={<NewHome />} />
          <Route path="/home" element={<NewHome />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
          {!token && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </>
          )}
          <Route path="/categories" element={<Categories />}>
            <Route
              path="/categories/:searchString"
              element={<SingleCategory />}
            />
          </Route>
          <Route path="/place-order" element={<PlaceOrderPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard" element={<Profile />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/edit-profile" element={<Profile />} />
            <Route path="/dashboard/review" element={<AddReview />} />
            <Route path="/dashboard/my-orders" element={<MyOrders />} />
            
            {/* <Route
              path='/dashboard/manage-product'
              element={
                <IsAdmin>
                  <ManageProduct />
                </IsAdmin>
              }
            /> */}
            {/* <Route
              path='/dashboard/add-product'
              element={
                <IsAdmin>
                  <AddProduct />
                </IsAdmin>
              }
            /> */}
            {/* <Route
              path='/dashboard/manage-orders'
              element={
                <IsAdmin>
                  <ManageOrders />
                </IsAdmin>
              }
            /> */}
            {/* <Route
              path='/dashboard/make-admin'
              element={
                <IsAdmin>
                  <AddAdmin />
                </IsAdmin>
              }
            /> */}
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
