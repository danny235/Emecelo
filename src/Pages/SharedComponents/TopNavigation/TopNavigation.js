import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Col, Container, Offcanvas, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import aboutUsIcon from "../../../assets/images/aboutUs.svg";
import cartIcon from "../../../assets/images/cart.svg";
import cooking from "../../../assets/images/categories/Cooking.webp";
import contactUsIcon from "../../../assets/images/contactUs.svg";
import faqIcon from "../../../assets/images/faq.svg";
import offerIcon from "../../../assets/images/checkout.svg";
import menuBarIcon from "../../../assets/images/menuBar.svg";
import notifyIcon from "../../../assets/images/notifyIcon.svg";
import privacyIcon from "../../../assets/images/privacy.svg";
import searchIcon from "../../../assets/images/search.svg";
import termsIcon from "../../../assets/images/terms.svg";
import userIcon from "../../../assets/images/user.svg";
import { addCommas } from "../../../fuctions";
import useRedux from "../../../hooks/useRedux";
import { updateCountry } from "../../../redux/user/userSlice";
import Cart from "../Cart/Cart";
import ProfileDetails from "../ProfileDetails/ProfileDetails";
import styles from "./TopNavigation.module.css";

const TopNavigation = ({ page }) => {
  const [menuShow, setMenuShow] = useState(false);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const { show, handleClose, handleShow } = useRedux();
  const cart = useSelector((state) => state.products.cart);
  const loggedInUser = useSelector((state) => state.user.isLoggedIn);
  const { country } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.products);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const currency = [
    {
      id: 1,
      currency: "NGN",
      country: "Nigeria",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_Nigeria.svg/2000px-Flag_of_Nigeria.svg.png",
    },
    {
      id: 2,
      currency: "USD",
      country: "USA",
      icon: "https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg",
    },
  ];

  let total = 0;
  for (const pd of cart) {
    total = total + Number(pd.quantity);
  }

  let totalPrice = 0;
  for (const pd of cart) {
    totalPrice =
      totalPrice +
      Number(country === "Nigeria" ? pd.totalNairaPrice : pd.totalPrice);
  }

  const handleMenuShow = () => setMenuShow(true);
  const location = useLocation();
  const handleMenuClose = () => setMenuShow(false);

  const handleButtonClick = () => {
    const searchParams = new URLSearchParams();
    searchParams.set("results", searchText);

    // Check if the current location is already /search
    if (location.pathname === "/search/") {
      // Update search parameters without full navigation
      navigate({ search: `?${searchParams.toString()}` });
    } else {
      // Navigate to the /search route with the specified search parameters
      navigate(`search/?${searchParams.toString()}`);
    }
  };
  const handelClick = () => {
    if (loggedInUser) {
      navigate("/place-order");
    } else {
      navigate("/login");
    }
    handleClose();
  };

  return (
    <>
      <header id={styles.header__top}>
        <Container>
          <Row>
            <Col lg={2} md={2} className="d-flex align-self-center">
              <NavLink to="/" className={styles.logo}>
                <h6 style={{ color: "#ffffff" }}>Emecelo</h6>
              </NavLink>
            </Col>
            <Col lg={7} md={7} sm={12} xs={12}>
              <form
                onSubmit={(e) => e.preventDefault()}
                className={styles.input}
              >
                <input
                  type="text"
                  placeholder="Search for products (e.g. fish, apple, oil)"
                  autoComplete="off"
                  spellCheck="false"
                  value={searchText}
                  onChange={(e) => {
                    e.preventDefault();
                    setSearchText(e.target.value);
                  }}
                />
                <button onClick={() => handleButtonClick()} type="submit">
                  <img src={searchIcon} alt="searchIcon" />
                </button>
              </form>
            </Col>
            <Col
              lg={3}
              md={3}
              className="d-flex justify-content-end align-self-center"
            >
              <div className="d-none d-md-block">
                <ul className={styles.top__nav__icon}>
                  <li>
                    <img src={notifyIcon} alt="notifyIcon" />
                  </li>

                  <li className={styles.cart__icon}>
                    <img src={cartIcon} alt="cartIcon" onClick={handleShow} />
                    <span>{total}</span>
                  </li>
                  <li>
                    {token === "" ? (
                      <img
                        src={userIcon}
                        alt="userIcon"
                        onClick={() => navigate("/login")}
                      />
                    ) : (
                      <ProfileDetails />
                    )}
                  </li>
                  <Offcanvas
                    show={show}
                    onHide={handleClose}
                    placement="end"
                    scroll={true}
                    style={{ zIndex: 10000000 }}
                  >
                    <Offcanvas.Header closeButton className="offCanvas__header">
                      <Offcanvas.Title>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 512 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="32"
                            d="M320 264l-89.6 112-38.4-44.88"
                          ></path>
                          <path
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="32"
                            d="M80 176a16 16 0 00-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 00-16-16zm80 0v-32a96 96 0 0196-96h0a96 96 0 0196 96v32"
                          ></path>
                        </svg>
                        Shopping Cart
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      {!cart.length && (
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
                          <h6>Your cart is empty</h6>
                          <p>
                            No items added in your cart. Please add product to
                            your cart list.
                          </p>
                        </div>
                      )}

                      <div className={styles.cart__item__container}>
                        {cart.map((pd) => (
                          <Cart key={pd.item.id} pd={pd} />
                        ))}
                      </div>

                      <button
                        className={styles.cart__button}
                        onClick={handelClick}
                        disabled={totalPrice ? false : true}
                      >
                        Proceed To Checkout
                        <span>
                          {country === "Nigeria"
                            ? `₦${addCommas(totalPrice)}`
                            : `$${addCommas(totalPrice)}`}
                        </span>
                      </button>
                    </Offcanvas.Body>
                  </Offcanvas>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
      <nav className={styles.nav__items}>
        <Container>
          <div className="d-none d-md-block">
            <Row className={styles.nav__links}>
              <Col lg={8} md={7} sm={12} className="p-0">
                <ul className={styles.left__item}>
                  <li>
                    <span className={styles.category}>
                      Categories
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        style={{ fontSize: "10px", margin: "0 0 0 8px" }}
                      />
                      <ul>
                        {categories.map((category) => (
                          <NavLink
                            to={`/categories/${category.slug}`}
                            key={category.id}
                          >
                            <img
                              src={category?.icon ? category?.icon : cooking}
                              alt={category?.title}
                            />
                            <p style={{ textTransform: "capitalize" }}>
                              {category?.title}
                            </p>
                          </NavLink>
                        ))}
                      </ul>
                    </span>
                    <span className={styles.category}>
                      Currency
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        style={{ fontSize: "10px", margin: "0 0 0 8px" }}
                      />
                      <ul>
                        {currency.map((curr) => (
                          <div
                            onClick={() =>
                              dispatch(updateCountry(curr.country))
                            }
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                            }}
                            key={curr.id}
                          >
                            <img src={curr?.icon} alt={curr?.country} />
                            <p style={{ textTransform: "capitalize" }}>
                              {curr?.currency}
                            </p>
                            {curr.country === country && <div style={{backgroundColor: "tomato", width: 10, height: 10, borderRadius: 10}} />}
                          </div>
                        ))}
                      </ul>
                    </span>
                    <NavLink
                      to="/about-us"
                      className={(navInfo) =>
                        navInfo.isActive ? styles.active : ""
                      }
                    >
                      About Us
                    </NavLink>
                    <NavLink
                      to="/contact-us"
                      className={(navInfo) =>
                        navInfo.isActive ? styles.active : ""
                      }
                    >
                      Contact Us
                    </NavLink>
                    <span className={styles.dropdown}>
                      Pages
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        style={{ fontSize: "10px", marginLeft: "8px" }}
                      />
                      <ul>
                        {/* <li>
                          <NavLink
                            to="/offer"
                            className={(navInfo) =>
                              navInfo.isActive ? styles.active : ""
                            }
                          >
                            <img src={offerIcon} alt="offerIcon" /> Offer
                          </NavLink>
                        </li> */}
                        {/* <li>
                          <NavLink
                            to="/checkout"
                            className={(navInfo) =>
                              navInfo.isActive ? styles.active : ""
                            }
                          >
                            <img src={checkoutIcon} alt="checkoutIcon" />
                            Checkout
                          </NavLink>
                        </li> */}

                        <li>
                          <NavLink
                            to="/faq"
                            className={(navInfo) =>
                              navInfo.isActive ? styles.active : ""
                            }
                          >
                            <img src={faqIcon} alt="faqIcon" /> FAQ
                          </NavLink>
                        </li>

                        <li>
                          <NavLink
                            to="/about-us"
                            className={(navInfo) =>
                              navInfo.isActive ? styles.active : ""
                            }
                          >
                            <img src={aboutUsIcon} alt="aboutUsIcon" /> About Us
                          </NavLink>
                        </li>

                        <li>
                          <NavLink
                            to="/contact-us"
                            className={(navInfo) =>
                              navInfo.isActive ? styles.active : ""
                            }
                          >
                            <img src={contactUsIcon} alt="contactUsIcon" />
                            Contact Us
                          </NavLink>
                        </li>

                        <li>
                          <NavLink
                            to="/privacy-and-policy"
                            className={(navInfo) =>
                              navInfo.isActive ? styles.active : ""
                            }
                          >
                            <img src={privacyIcon} alt="privacyIcon" />
                            Privacy Policy
                          </NavLink>
                        </li>

                        <li>
                          <NavLink
                            to="/terms-and-condition"
                            className={(navInfo) =>
                              navInfo.isActive ? styles.active : ""
                            }
                          >
                            <img src={termsIcon} alt="termsIcon" />
                            Terms & Conditions
                          </NavLink>
                        </li>
                      </ul>
                    </span>
                    {/* <NavLink to='/offers' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      Offers
                    </NavLink> */}

                    {token && (
                      <NavLink
                        to="/dashboard"
                        className={(navInfo) =>
                          navInfo.isActive ? styles.active : ""
                        }
                      >
                        Dashboard
                      </NavLink>
                    )}
                  </li>
                </ul>
              </Col>
              <Col lg={4} md={5} sm={12} className="p-0">
                <ul className={styles.right__item}>
                  <li>
                    <NavLink
                      to="/privacy-policy"
                      className={(navInfo) =>
                        navInfo.isActive ? styles.active : ""
                      }
                    >
                      Privacy Policy
                    </NavLink>
                    <NavLink
                      to="/terms-and-conditions"
                      className={(navInfo) =>
                        navInfo.isActive ? styles.active : ""
                      }
                    >
                      Terms & Conditions
                    </NavLink>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>
        </Container>
        <div id={styles.mobile__menu} className="d-block d-md-none">
          <Container className="d-flex justify-content-between align-self-center">
            <span
              onClick={handleMenuShow}
              className={styles.mobile__menu__icons}
            >
              <img src={menuBarIcon} alt="menuBarIcon" />
            </span>

            <span className={styles.mobile__menu__icons}>
              <img src={notifyIcon} alt="notifyIcon" />
            </span>

            <span
              className={styles.mobile__menu__icons}
              id={styles.mobile__cart}
            >
              <img src={cartIcon} alt="cartIcon" onClick={handleShow} />
              <span>{cart.length}</span>
            </span>

            <span className={styles.mobile__menu__icons}>
              {token === "" ? (
                <img
                  src={userIcon}
                  alt="userIcon"
                  onClick={() => navigate("/login")}
                />
              ) : (
                <ProfileDetails />
              )}
            </span>
            <Offcanvas
              show={show}
              onHide={handleClose}
              placement="end"
              scroll={true}
            >
              <Offcanvas.Header closeButton className="offCanvas__header">
                <Offcanvas.Title>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                      d="M320 264l-89.6 112-38.4-44.88"
                    ></path>
                    <path
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                      d="M80 176a16 16 0 00-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 00-16-16zm80 0v-32a96 96 0 0196-96h0a96 96 0 0196 96v32"
                    ></path>
                  </svg>
                  Shopping Cart
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {!cart.length && (
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
                    <h6>Your cart is empty</h6>
                    <p>
                      No items added in your cart. Please add product to your
                      cart list.
                    </p>
                  </div>
                )}

                <div className={styles.cart__item__container}>
                  {cart.map((pd) => (
                    <Cart key={pd.item._id} pd={pd} />
                  ))}
                </div>

                <button
                  className={styles.cart__button}
                  onClick={handelClick}
                  disabled={totalPrice ? false : true}
                >
                  Proceed To Checkout
                  <span>${totalPrice}.00</span>
                </button>
              </Offcanvas.Body>
            </Offcanvas>
            <Offcanvas
              show={menuShow}
              onHide={handleMenuClose}
              className={styles.offCanvas__mobile__menu}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                  <NavLink to="/" onClick={handleMenuClose}>
                    <h2 style={{ color: "#10B981" }}>Emecelo</h2>
                  </NavLink>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className={styles.mobile__offCanvas__body}>
                <ul>
                  <li>
                    {token && (
                      <NavLink
                        to="/dashboard"
                        className={(navInfo) =>
                          navInfo.isActive ? styles.active : ""
                        }
                      >
                        Dashboard
                      </NavLink>
                    )}
                  </li>
                  {/* <li>
                    <NavLink
                      to="/offer"
                      className={(navInfo) =>
                        navInfo.isActive ? styles.active : ""
                      }
                    >
                      <img src={offerIcon} alt="offerIcon" /> Offer
                    </NavLink>
                  </li> */}
                  {/* <li>
                    <NavLink
                      to="/checkout"
                      className={(navInfo) =>
                        navInfo.isActive ? styles.active : ""
                      }
                    >
                      <img src={checkoutIcon} alt="checkoutIcon" />
                      Checkout
                    </NavLink>
                  </li> */}

                  {/* <li>
                    <NavLink
                      to="/faq"
                      className={(navInfo) =>
                        navInfo.isActive ? styles.active : ""
                      }
                    >
                      <img src={faqIcon} alt="faqIcon" /> FAQ
                    </NavLink>
                  </li> */}

                  <span className={styles.category}>
                  <img src={offerIcon} alt="offerIcon" />
                    Currency
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      style={{ fontSize: "10px", margin: "0 0 0 8px" }}
                    />
                    <ul>
                      {currency.map((curr) => (
                        <div
                          onClick={() => dispatch(updateCountry(curr.country))}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                          key={curr.id}
                        >
                          <img src={curr?.icon} alt={curr?.country} />
                          <p style={{ textTransform: "capitalize" }}>
                            {curr?.currency}
                          </p>
                          {curr.country === country && <div style={{backgroundColor: "tomato", width: 10, height: 10, borderRadius: 10}} />}
                        </div>
                      ))}
                    </ul>
                  </span>

                  <li>
                    <NavLink
                      to="/about-us"
                      className={(navInfo) =>
                        navInfo.isActive ? styles.active : ""
                      }
                    >
                      <img src={aboutUsIcon} alt="aboutUsIcon" /> About Us
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/contact-us"
                      className={(navInfo) =>
                        navInfo.isActive ? styles.active : ""
                      }
                    >
                      <img src={contactUsIcon} alt="contactUsIcon" />
                      Contact Us
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/privacy-and-policy"
                      className={(navInfo) =>
                        navInfo.isActive ? styles.active : ""
                      }
                    >
                      <img src={privacyIcon} alt="privacyIcon" />
                      Privacy Policy
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/terms-and-condition"
                      className={(navInfo) =>
                        navInfo.isActive ? styles.active : ""
                      }
                    >
                      <img src={termsIcon} alt="termsIcon" />
                      Terms & Conditions
                    </NavLink>
                  </li>
                </ul>
              </Offcanvas.Body>
            </Offcanvas>
          </Container>
        </div>
      </nav>
    </>
  );
};

export default TopNavigation;
