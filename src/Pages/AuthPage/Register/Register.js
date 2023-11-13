import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import toast from "react-hot-toast";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import emailIcon from "../../../assets/images/login/email.svg";
import passwordIcon from "../../../assets/images/login/password.svg";
import userIcon from "../../../assets/images/login/user.svg";
import CustomInput from "../../../components/CustomInput";
import Footer from "../../SharedComponents/Footer/Footer";
import TopNavigation from "../../SharedComponents/TopNavigation/TopNavigation";
import styles from "./Register.module.css";
import { REGISTER_USER } from "../../../components/api";
import { useDispatch } from "react-redux";
import { updateToken, updateUserProfile } from "../../../redux/user/userSlice";

const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter your First Name")
    .label("First Name"),
  lastName: yup
    .string()
    .required("Please enter your Last Name")
    .label("Last Name"),
  email: yup.string().required().label("Email").email(),
  password: yup
    .string()
    .required()
    .label("Password")
    .min(8, "Seems a bit short"),
});

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { googleSignIn, gitHubSignIn, emailSignup, isDisable } = useAuth();
  const [isDisable, setIsDisable] = useState(false);
  const dispatch = useDispatch()
  const handleSubmit = async (firstName, lastName, email, password) => {
    setIsDisable(true);
    try {
      const data = await REGISTER_USER(firstName, lastName, email, password);

      if (data) {
        setIsDisable(false);
        // console.log(data, "from register");
        dispatch(updateUserProfile(data?.user))
        dispatch(updateToken(data?.access))
        toast.success("Created your account successfully 🎉")
        navigate("/")
      }
    } catch (err) {
      setIsDisable(false);
      if(err?.response?.data?.detail) {
        toast.error(err?.response?.data?.detail);
      } else {

        toast.error(err.message);
      }
      // console.log(err.message, err?.response?.data?.detail)
    }
  };

  useEffect(() => {
    document.title = "Register | Kacha Bazar";
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      <TopNavigation />

      <section id={styles.register}>
        <Container>
          <h3>Get started for free!</h3>

          {/* <Row className={styles.third__party}>
            <Col lg={4} className='g-4'>
              <div className={styles.method1} onClick={() => googleSignIn(navigate, location)}>
                <img src={googleIcon} alt='googleIcon' />
                <h5>Google</h5>
              </div>
            </Col>
            <Col lg={4} className='g-4'>
              <div className={styles.method2} onClick={() => toast.error('Sorry Facebook auth not work in deployment')}>
                <img src={facebookIcon} alt='facebookIcon' />
                <h5>Facebook</h5>
              </div>
            </Col>
            <Col lg={4} className='g-4'>
              <div className={styles.method3} onClick={() => gitHubSignIn(navigate, location)}>
                <img src={gitHubIcon} alt='gitHubIcon' />
                <h5>GitHub</h5>
              </div>
            </Col>
          </Row> */}

          <p className={styles.another}>OR</p>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            onSubmit={(values, actions) => {
              // console.log(values.email, values.password);
              handleSubmit(
                values.firstName,
                values.lastName,
                values.email,
                values.password
              );
            }}
            validationSchema={registerSchema}
          >
            {(formikProps) => (
              <>
                <span className={styles.inputs}>
                  <CustomInput
                    formikKey="firstName"
                    formikProps={formikProps}
                    value={formikProps.values.firstName}
                    type="text"
                    name="name"
                    id="firstName"
                    autoComplete="off"
                    spellCheck="false"
                    placeholder="Enter Your First Name"
                    required
                  />
                  <label htmlFor="firstName">
                    <img src={userIcon} alt="userIcon" />
                  </label>
                </span>
                <span className={styles.inputs}>
                  <CustomInput
                    formikKey="lastName"
                    formikProps={formikProps}
                    value={formikProps.values.lastName}
                    type="text"
                    name="name"
                    id="lastName"
                    autoComplete="off"
                    spellCheck="false"
                    placeholder="Enter Your Last Name"
                    required
                  />
                  <label htmlFor="lastName">
                    <img src={userIcon} alt="userIcon" />
                  </label>
                </span>
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
                  <label htmlFor="email2">
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
                  <label htmlFor="password1">
                    <img src={passwordIcon} alt="passwordIcon" />
                  </label>
                </span>

                <span className={styles.options}>
                  <NavLink to="/login">Already Have Account?</NavLink>
                </span>
                <button
                  onClick={formikProps.handleSubmit}
                  style={styles.button}
                  disabled={isDisable}
                  type="submit"
                >
                  {isDisable ? "Registering...." : "Get Started Now"}{" "}
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

export default Register;
