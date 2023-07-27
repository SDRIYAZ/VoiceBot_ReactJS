import {useState} from "react";
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

const StepThreeSchema = Yup.object().shape({
  parentsname: Yup.string().required("Name is required"),
  parentssurname: Yup.string().required("Surname is required"),
  parentsalternateno: Yup.string()
  .required("Alternate no is required")
  .matches(/^\d{10}$/, "Enter only 10 digits")
  .test(
    "uniqueMobileNo",
    "Alternate mobileno should not match with parentsmobile",
    function (value) {
      const { parentsmobileno } = this.parent;
      return value !== parentsmobileno;
    }
  ),
  parentsalternateotp: Yup.string().required("OTP is required"),
  parentsemail: Yup.string().email("Invalid email").required("Email is required"),
  country: Yup.string().required("Country is required"),
  pincode: Yup.string().required("Pin Code is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  district: Yup.string().required("District is required"),
  address: Yup.string().required("Address is required"),
  mothertongue: Yup.string().required("Mother Tongue is required"),
});


const StepThree = ({ handlePrevious, handleNext, isValid, setFieldValue, values, errors, touched }) => {
  const handleChange = (e, fieldname) => {
    const { value } = e.target
    setFieldValue(fieldname, value)
  }

  const [otpSent, setOtpSent] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(false);
  const [isOTPMatched, setIsOTPMatched] = useState(false);

  const generateOtp = async (mobile) => {
    if(mobile === values.parentsmobileno){
      setOtpSent(false);
    }
    else{
      const otp = generateRandomOTP();
      setGeneratedOTP(otp.toString());
      const sent = await sendOTPSMS(mobile, otp);
      if (sent) {
        setOtpSent(true);
      }
    }
  };

  const handleMobileNumberChange = async (e) => {
    const mobileNumber = e.target.value;
    setFieldValue("parentsalternateno", mobileNumber);

    if (/^\d{10}$/.test(mobileNumber)) {
      await generateOtp(mobileNumber);
    } else {
      setOtpSent(false);
    }
  };

  const handleOTPChange = (e) => {
    const otpNumber = e.target.value;
    setFieldValue("parentsalternateotp", otpNumber);
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

      <h2>Parent Details</h2>
      <article className="signup__container__form__div__form__sec">
        <div className="signup__container__form__div__form__sec__input-container">
          <i className="bi bi-person-fill icon"></i>
          <Field
            className="signup__container__form__div__form__sec__input-container__input-field"
            type="text"
            id="parentsname"
            name="parentsname"
            onChange={(e) => { handleChange(e, "parentsname") }}
            value={values.parentsname}
            placeholder="Name"
          />
        </div>
        {
          (touched.parentsname && errors.parentsname) && (
            <small>{errors.parentsname}</small>
          )
        }

        <div className="signup__container__form__div__form__sec__input-container">
          <i className="bi bi-person-fill icon"></i>
          <Field
            className="signup__container__form__div__form__sec__input-container__input-field"
            type="text"
            id="parentssurname"
            name="parentssurname"
            onChange={(e) => { handleChange(e, "parentssurname") }}
            value={values.parentssurname}
            placeholder="Surname"
          />
        </div>
        {
          (touched.parentssurname && errors.parentssurname) && (
            <small>{errors.parentssurname}</small>
          )
        }

        <div className="signup__container__form__div__form__sec__input-container">
          <i className="bi bi-telephone icon"></i>
          <Field
            className="signup__container__form__div__form__sec__input-container__input-field"
            type="text"
            id="parentsalternateno"
            name="parentsalternateno"
            onChange={handleMobileNumberChange}
            placeholder="Alternate Mobileno"
          />
        </div>
        {
          (touched.parentsalternateno && errors.parentsalternateno) && (
            <small>{errors.parentsalternateno}</small>
          )
        }

        <div className="signup__container__form__div__form__sec__input-container">
          <i className="bi bi-telephone icon"></i>
          <Field
            className="signup__container__form__div__form__sec__input-container__input-field"
            type="text"
            id="parentsalternateotp"
            name="parentsalternateotp"
            onChange={handleOTPChange}
            placeholder="OTP"
          />

        </div>

        {(isFieldsDisabled && isOTPMatched) ?
          (<span style={{ position: "relative", top: "-44px", left: "280px" }}><i className="bi bi-check-lg" style={{ color: "green", fontSize: "1.75rem" }}></i>
          </span>) :
          (
            (touched.parentsalternateotp && errors.parentsalternateotp) && (
              <small>{errors.parentsalternateotp}</small>
            )
          )
        }
        {(!isFieldsDisabled && !isOTPMatched && values.parentsalternateotp.length === 4) &&
          <span style={{ position: "relative", top: "-44px", left: "229px" }}><i className="bi bi-x-lg" style={{ color: "red", fontSize: "1.75rem" }}></i></span>
        }

        <div className="signup__container__form__div__form__sec__input-container">
          <i className="bi bi-envelope icon"></i>
          <Field
            className="signup__container__form__div__form__sec__input-container__input-field"
            type="email"
            id="parentsemail"
            name="parentsemail"
            onChange={(e) => { handleChange(e, "parentsemail") }}
            value={values.parentsemail}
            placeholder="Email Address"
          />
        </div>
        {
          (touched.parentsemail && errors.parentsemail) && (
            <small>{errors.parentsemail}</small>
          )
        }

        <div className="signup__container__form__div__form__sec__input-container">
          <i className="bi bi-globe2 icon"></i>
          <Field
            className="signup__container__form__div__form__sec__input-container__input-field"
            type="text"
            id="country"
            name="country"
            onChange={(e) => handleChange(e, "country")}
            value={values.country}
            placeholder="Country"
          />
        </div>
        {
          (touched.country && errors.country) && (
            <small>{errors.country}</small>
          )
        }

        <div className="signup__container__form__div__form__sec__input-container">
          <i className="bi bi-upc icon"></i>
          <Field
            className="signup__container__form__div__form__sec__input-container__input-field"
            type="text"
            id="pincode"
            name="pincode"
            onChange={(e) => handleChange(e, "pincode")}
            value={values.pincode}
            placeholder="Pincode"
          />
        </div>
        {
          (touched.pincode && errors.pincode) && (
            <small>{errors.pincode}</small>
          )
        }

        <div className="signup__container__form__div__form__sec__input-container">
          <i class="bi bi-pin-map icon"></i>
          <Field
            className="signup__container__form__div__form__sec__input-container__input-field"
            type="text"
            id="state"
            name="state"
            onChange={(e) => handleChange(e, "state")}
            value={values.state}
            placeholder="State"
          />
        </div>
        {
          (touched.state && errors.state) && (
            <small>{errors.state}</small>
          )
        }

        <div className="signup__container__form__div__form__sec__input-container">
          <i className="bi bi-buildings-fill icon"></i>          <Field
            className="signup__container__form__div__form__sec__input-container__input-field"
            type="text"
            id="city"
            name="city"
            onChange={(e) => handleChange(e, "city")}
            value={values.city}
            placeholder="City"
          />
        </div>
        {
          (touched.city && errors.city) && (
            <small>{errors.city}</small>
          )
        }

        <div className="signup__container__form__div__form__sec__input-container">
          <i class="bi bi-geo-fill icon"></i>
          <Field
            className="signup__container__form__div__form__sec__input-container__input-field"
            type="text"
            id="district"
            name="district"
            onChange={(e) => handleChange(e, "district")}
            value={values.district}
            placeholder="District"
          />
        </div>
        {
          (touched.district && errors.district) && (
            <small>{errors.district}</small>
          )
        }

        <div className="signup__container__form__div__form__sec__input-container">
          <i class="bi bi-geo-alt-fill icon"></i>
          <textarea
            className="signup__container__form__div__form__sec__input-container__input-field"
            name="address"
            id="address"
            onChange={(e) => handleChange(e, 'address')}
            value={values.address}
            placeholder="Address"
            required
          />
        </div>
        <ErrorMessage
          name="address"
          component="small"
        />

        <div className="signup__container__form__div__form__sec__input-container">
          <i className="bi bi-journal-text icon"></i>
          <Field
            className="signup__container__form__div__form__sec__input-container__input-field"
            type="text"
            id="mothertongue"
            name="mothertongue"
            onChange={(e) => handleChange(e, "mothertongue")}
            value={values.mothertongue}
            placeholder="Mother Tongue"
          />
        </div>
        {
          (touched.mothertongue && errors.mothertongue) && (
            <small>{errors.mothertongue}</small>
          )
        }
      </article>

      <article className="signup__container__form__div__form__buttons">
        <button
          className="signup__container__form__div__button"
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          className="signup__container__form__div__button"
          type="button"
          onClick={handleNext}
          disabled={!isValid}
        >
          Next
        </button>
      </article>
    </>
  );
};

export { StepThree, StepThreeSchema };
