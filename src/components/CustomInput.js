
import React from "react";
import styles from "../Pages/AuthPage/LogIn/Login.module.css";

const CustomInput = ({ children, formikProps, formikKey, onChangeText, ...rest }) => {
  const inputStyles = {};

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = "red";
  }

  return (
    <FieldWrapper formikKey={formikKey} formikProps={formikProps} >
      <input
        onChange={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        style={inputStyles}
        {...rest}
        
      />
</FieldWrapper>
  );
};
const FieldWrapper = ({ children, formikProps, formikKey }) => {


//   if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
//     labelStyles.color = Colors.ashShade;
//   }
  return (
    <div >
      
      {children}
      <p style={{color: "red", marginBottom: 10}}>
        {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
      </p>
    </div>
  );
};


export default CustomInput;
