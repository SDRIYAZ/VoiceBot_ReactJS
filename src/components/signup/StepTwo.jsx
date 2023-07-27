import React from "react";
import { Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const StepTwoSchema = Yup.object().shape({
  parentspassword: Yup.string()
    .required("Required")
    .matches(/^\d{4}$/, "Password must be a 4-digit pin"),
  parentsconfirmpassword: Yup.string()
    .required("Required")
    .matches(/^\d{4}$/, "Password must be a 4-digit pin")
    .oneOf([Yup.ref("parentspassword")], "Passwords do not match"),
});

const StepTwo = ({ handleNext, isValid, setFieldValue, errors, touched }) => {
  const handleChange = (e, fieldname) => {
    const { value } = e.target
    setFieldValue(fieldname, value)
  }

  return (
    <>
      <h2>Password Setting</h2>
      <section className="signup__container__form__div__form__sec">
        <div className="signup__container__form__div__form__sec__input-container">
          <i className="bi bi-key icon"></i>
          <Field
            className="signup__container__form__div__form__sec__input-container__input-field"
            type="password"
            id="parentspassword"
            name="parentspassword"
            onChange={(e) => { handleChange(e, "parentspassword") }}
            placeholder="Enter Password"
          />
        </div>
        {
          (touched.parentspassword && errors.parentspassword) && (
            <small>{errors.parentspassword}</small>
          )
        }


        <div className="signup__container__form__div__form__sec__input-container">
          <i className="bi bi-key icon"></i>
          <Field
            className="signup__container__form__div__form__sec__input-container__input-field"
            type="text"
            id="parentsconfirmpassword"
            name="parentsconfirmpassword"
            onChange={(e) => { handleChange(e, "parentsconfirmpassword") }}
            placeholder="Re-enter Password"
          />
        </div>
        {
          (touched.parentsconfirmpassword && errors.parentsconfirmpassword) && (
            <small>{errors.parentsconfirmpassword}</small>
          )
        }
      </section>


      <button
       className="signup__container__form__div__button"
       type="button" 
       onClick={handleNext} 
       disabled={!isValid} 
      >
        Next
      </button>
    </>
  );
};

export { StepTwo, StepTwoSchema };
