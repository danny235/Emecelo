import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import emailIcon from "../../../assets/images/login/email.svg";
import passwordIcon from "../../../assets/images/login/password.svg";
import CustomInput from "../../../components/CustomInput";
import { LOGIN_USER } from "../../../components/api";
import Footer from "../../SharedComponents/Footer/Footer";
import TopNavigation from "../../SharedComponents/TopNavigation/TopNavigation";
import styles from "./Login.module.css";
import { updateIsLoggedIn, updateToken, updateUserProfile } from "../../../redux/user/userSlice";

const loginSchema = yup.object().shape({
  email: yup.string().required().label("Email").email(),
  password: yup
    .string()
    .required()
    .label("Password")
    .min(8, "Seems a bit short"),
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // const { googleSignIn, gitHubSignIn, emailSignIn, isDisable } = useAuth();
  const [isDisable, setIsDisable] = useState(false);

  const handleSubmit = async (email, password) => {
    setIsDisable(true);
    try {
      const data = await LOGIN_USER(email, password);

      if (data) {
        setIsDisable(false);
        console.log(data.access_token, "from login");
        dispatch(updateUserProfile(data?.user))
        dispatch(updateToken(data?.access_token))
        toast.success("Logged in successfully 🎉")
        navigate("/")
      }
    } catch (err) {
      setIsDisable(false);
      if(err?.response?.data?.detail) {
        toast.error(err?.response?.data?.detail)
      } else {

        toast.error(err.message);
      }
      console.log(err.message, err?.response?.data?.detail)
    }
  };

  useEffect(() => {
    document.title = "Login | Kacha Bazar";
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      <TopNavigation />
      <section id={styles.login}>
        <Container>
          <h3>Sign In!</h3>

          {/* <Row className={styles.third__party}>
            <Col lg={4} className='g-4'>
              <button className={styles.method1} onClick={() => googleSignIn(navigate, location)}>
                <img src={googleIcon} alt='googleIcon' />
                <h5>Google</h5>
              </button>
            </Col>
            <Col lg={4} className='g-4'>
              <button className={styles.method2} onClick={() => toast.error('Sorry Facebook auth not work in deployment')}>
                <img src={facebookIcon} alt='facebookIcon' />
                <h5>Facebook</h5>
              </button>
            </Col>
            <Col lg={4} className='g-4'>
              <button className={styles.method3} onClick={() => gitHubSignIn(navigate, location)}>
                <img src={gitHubIcon} alt='gitHubIcon' />
                <h5>GitHub</h5>
              </button>
            </Col>
          </Row> */}

          <p className={styles.another}>OR</p>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values, actions) => {
              // console.log(values.email, values.password);
              handleSubmit(values.email, values.password);
            }}
            validationSchema={loginSchema}
          >
            {(formikProps) => (
              <>
                <span className={styles.inputs}>
                  <CustomInput
                    formikKey="email"
                    formikProps={formikProps}
                    value={formikProps.values.email}
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    spellCheck="false"
                    placeholder="Enter Your Email Address"
                    required
                  />
                  <label htmlFor="email">
                    <img src={emailIcon} alt="emailIcon" />
                  </label>
                </span>
                <span className={styles.inputs}>
                  <CustomInput
                    formikProps={formikProps}
                    formikKey="password"
                    value={formikProps.values.password}
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    spellCheck="false"
                    placeholder="Enter Your Secret Password"
                    required
                  />
                  <label htmlFor="password">
                    <img src={passwordIcon} alt="passwordIcon" />
                  </label>
                </span>
                <span className={styles.options}>
                  <NavLink to="/reset-password">Forget Password?</NavLink>
                  <NavLink to="/register">New User?</NavLink>
                </span>
                <button style={styles.button} onClick={formikProps.handleSubmit} type="submit" disabled={isDisable}>
                  {isDisable ? "Signing...." : "Sign In"}{" "}
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </>
            )}
          </Formik>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default Login;
