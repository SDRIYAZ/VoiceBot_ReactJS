import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const API_KEY = "Ru3XGBqDaVcjtwJU7IbmhzWCkoFP0i9Z5sA8T1l64NEgfQdSYeJB5fA1Cm2iDGYZw09tLszd74EIvyMg";

const generateRandomOTP = () => {
  return Math.floor(1000 + Math.random() * 9000); // Generate a random 6-digit OTP
};

const sendOTPSMS = async (mobile, otp) => {
  const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${API_KEY}&variables_values=${otp}&route=otp&numbers=${mobile}`;
  console.log(url);
  try {
    const response = await axios.get(url);
    console.log(response.data);
    if (response.data.return === true) {
      return true;
    } else {
      alert("Failed to send OTP. Please try again.");
      return false;
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while sending OTP. Please try again later.");
    return false;
  }
};

const StepOneSchema = Yup.object().shape({
  parentsmobileno: Yup.string().required("Required").matches(/^\d{10}$/, "Enter only 10 digits"),
  parentsmobileotp: Yup.string().required("Required").matches(/^\d{6}$/, "Enter only 4 digits"),
});


const StepOne = ({ handleNext, isValid, setFieldValue, values, errors, touched, handleKeyPress }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(false);
  const [isOTPMatched, setIsOTPMatched] = useState(false);

  const generateOtp = async (mobile) => {
    const otp = generateRandomOTP();
    setGeneratedOTP(otp.toString());
    const sent = await sendOTPSMS(mobile, otp);
    if (sent) {
      setOtpSent(true);
    }
  };

  const handleMobileNumberChange = async (e) => {
    const mobileNumber = e.target.value;
    setFieldValue("parentsmobileno", mobileNumber);

    if (/^\d{10}$/.test(mobileNumber)) {
      await generateOtp(mobileNumber);
    } else {
      setOtpSent(false);
    }
  };

  const handleOTPChange = (e) => {
    const otpNumber = e.target.value;
    setFieldValue("parentsmobileotp", otpNumber);
    if (/^\d{4}$/.test(otpNumber)) {
      if (otpNumber === generatedOTP) {
        setIsOTPMatched(true);
        setIsFieldsDisabled(true); // Disable the input fields after OTP match
      } else {
        setIsOTPMatched(false);
      }
    } else {
      setIsOTPMatched(false); // Handle the case when OTP is not 4 digits
    }
  };

  return (
    <>
      <h2>Get Started Now</h2>
      <article className="signup__container__form__div__form__sec">
        <div className="signup__container__form__div__form__sec__input-container">
          <i className="bi bi-telephone icon"></i>
          <Field
            className="signup__container__form__div__form__sec__input-container__input-field"
            type="text"
            id="parentsmobileno"
            name="parentsmobileno"
            onChange={handleMobileNumberChange}
            placeholder="Mobile Number"
            onKeyPress={handleKeyPress}
          />
        </div>
        {
          (touched.parentsmobileno && errors.parentsmobileno) &&(
            <small>{errors.parentsmobileno}</small>
          )
        }

        <div className="signup__container__form__div__form__sec__input-container">
          <i className="bi bi-telephone icon"></i>
          <Field
            className="signup__container__form__div__form__sec__input-container__input-field"
            type="text"
            id="parentsmobileotp"
            name="parentsmobileotp"
            onChange={handleOTPChange}
            placeholder="OTP"
            onKeyPress={handleKeyPress}
          />

        </div>

        {(isFieldsDisabled && isOTPMatched) ?
          (<span style={{ position: "relative", top: "-44px", left: "280px"}}><i className="bi bi-check-lg" style={{ color: "green", fontSize:"1.75rem" }}></i>
          </span>) :
          (
            (touched.parentsmobileotp && errors.parentsmobileotp) &&(
                <small>{errors.parentsmobileotp}</small>
              )
          )
        }
        {(!isFieldsDisabled && !isOTPMatched && values.parentsmobileotp.length === 4) &&
          <span style={{ position: "relative", top: "-44px", left: "182px"}}><i className="bi bi-x-lg" style={{ color: "red", fontSize:"1.75rem" }}></i></span>
        }
      </article>

      <button 
        className="signup__container__form__div__button"
        type="button" 
        onClick={()=>handleNext("step1")} disabled={!isOTPMatched}
      >
        Next
      </button>
    </>
  );
};

export { StepOne, StepOneSchema };
