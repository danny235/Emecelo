import { faFacebook, faGithub, faInstagram, faLinkedin, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Logo from '../../../assets/images/logo.jpeg';
import paymentLogo from '../../../assets/images/payment-logo.webp';
import styles from './Footer.module.css';
import { useDispatch, useSelector } from "react-redux";

const Footer = () => {
  const { categories } = useSelector((state) => state.products);

  return (
    <>
      <footer className={styles.footer}>
        <Container>
          <Row>
            <Col lg={6} md={12} className={styles.logo}>
            <img src={Logo} alt="Emcelo" />
              <p>
                There are many popular products you will find our shop, Choose your daily necessary product from our Emcelo shop and get some special offer.
              </p>
              <h6>Follow Us</h6>
              <ul className={styles.social__link}>
                <li>
                  <a href='https://www.facebook.com/profile.php?id=61556167539112&mibextid=2JQ9oc' target='_blank' rel='noopener noreferrer'>
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                </li>
                <li>
                  <a href='https://x.com/emcelo?t=rbjOleb8_HC8s9tRzYyb0g&s=09' target='_blank' rel='noopener noreferrer'>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
                    <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>
                    </svg>
                    </a>
                </li>
                <li>
                  <a href='https://www.instagram.com/_emcelo?igsh=MWc3a3NnOG84MDg5Zg==' target='_blank' rel='noopener noreferrer'>
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
            
              </ul>
            </Col>
            <Col lg={2} md={4} sm={6} xs={6} className={styles.footer__column}>
              <h5>Company</h5>
              <ul>
                <li>
                  <NavLink to='/'>About Us</NavLink>
                </li>
                <li>
                  <NavLink to='/'>Contact us</NavLink>
                </li>
                <li>
                  <NavLink to='/'>Careers</NavLink>
                </li>
                <li>
                  <NavLink to='/'>Latest news</NavLink>
                </li>
                <li>
                  <NavLink to='/'>Latest Discount</NavLink>
                </li>
              </ul>
            </Col>
            <Col lg={2} md={4} sm={6} xs={6} className={styles.footer__column}>
              <h5>Top Category</h5>
              <ul>
                {categories.map((category, index) => (
                  <li key={index}>
                    <NavLink to={`/categories/${category.slug}`}>{category.title}</NavLink>
                  </li>
                ))}
              </ul>
            </Col>
          <Col lg={2} md={4} sm={6} xs={6} className={styles.footer__column}>
              <h5>My Account</h5>
              <ul>
                <li>
                  <NavLink to='/'>Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to='/'>My Orders</NavLink>
                </li>
                <li>
                  <NavLink to='/'>Recent Orders</NavLink>
                </li>
                <li>
                  <NavLink to='/'>Updated Profile</NavLink>
                </li>
                <li>
                  <NavLink to='/'>Change Password</NavLink>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
      <section id={styles.copyright__area} className='container'>
        <small>
          Copyright 2023 @
          <a href='#' target='_blank' rel='noopener noreferrer' className='mx-1'>
            Emcelo
          </a>
          , All rights reserved.
        </small>
        <img src={paymentLogo} alt='paymentLogo' />
      </section>
    </>
  );
};

export default Footer;
