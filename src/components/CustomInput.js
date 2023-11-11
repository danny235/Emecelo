
import React from "react";
import styles from "../Pages/AuthPage/LogIn/Login.module.css";

const CustomInput = ({ label, formikProps, formikKey, onChangeText, ...rest }) => {
  const inputStyles = {};

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = "red";
  }

  return (
  
      <input
        onChange={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        style={inputStyles}
        {...rest}
        
      />

  );
};
const FieldWrapper = ({ children, label, formikProps, formikKey }) => {


//   if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
//     labelStyles.color = Colors.ashShade;
//   }
  return (
    <span className={styles.inputs}>
      <label style={{marginBottom: 10}}>{label}</label>
      {children}
      <p style={styles.error}>
        {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
      </p>
    </span>
  );
};


export default CustomInput;
