import React, { useEffect, useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./ui.css";
import branelogo from "../../assets/HomePage_Assets/Branelogo.png";
import TabSwitch from "./Tabswitch";
import "./formspeech.css";
import image from '../../assets/HomePage_Assets/animation.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Webcam from "react-webcam";
import AudioRecorderSignin from "./AudioRecorderSignin";

const Ui = () => {
  const navigate = useNavigate();

  const passwordRef=useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const [activeTab, setActiveTab] = useState("left");
  const [loginStatus, setLoginStatus] = useState(null);
  const [childDetails, setChildDetails] = useState(null);
  const [signupImage, setSignupImage] = useState(null);
  const [signinImage, setSigninImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const webcamRef = useRef(null);
  

  const initialValues = {
    phoneNumber: "",
    password: "",
  };

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "Only digits are allowed")
      .length(10, "Phone number must be exactly 10 digits")
      .required("Required"),
    password: Yup.string()
      .length(4, "Pin number must be exactly 4 digits")
      .required("Required"),
  });

  //   const handleSubmit = (values, { resetForm }) => {
  //     console.log("Form Values:", values);
  //     resetForm();
  //   };

  const handleSubmit = (values, { resetForm }) => {
    const { phoneNumber, password } = values;

    // Make the Axios GET request to fetch the user data for the provided phone number
    axios.get(`http://localhost:8080/login`).then((response) => {
      const userData = response.data;

      // Find the user data for the entered phone number
      const user = userData.find(
        (user) => user.parentsmobileno === phoneNumber
      );
      if (!user) {
        //   console.log("User not found!");
        setLoginStatus("User not found!");

        // Handle user not found scenario, e.g., show an error message
        return;
      }

      // Check if the provided password matches the parent's password
      if (password === user.parentspassword) {
        //   console.log("Parent login successful!");
        // Perform any actions or redirect here after successful parent login
        // setLoginStatus("Parent login successful!");
        // setChildDetails(null);
        // return;
        navigate('/parentspage');
      }

      // Check if the provided password matches any child's password
      const matchingChild = user.child.find(
        (child) => child.childpassword === password
      );
      if (matchingChild) {
        //   console.log("Child login successful!");
        //   console.log("Child Details:", matchingChild);
        // Perform any actions or redirect here after successful child login
        // setLoginStatus("Child login successful!");
        // setChildDetails(matchingChild);
        // return;
        navigate('/childpage');
      }

      // console.log("Login failed!");
      setLoginStatus("Login failed!");
      setChildDetails(null);
      // Handle login failure here, e.g., show an error message
    })

      .catch((error) => {
        console.error("Error occurred during login:", error);
        setLoginStatus("Error occurred during login");
        setChildDetails(null);
        // Handle any errors that occurred during the login process
      });

    resetForm();
  };

  const handleKeyPress = (e) => {
    const digitPattern = /^[0-9]*$/;
    const key = String.fromCharCode(e.which);

    if (!digitPattern.test(key)) {
      e.preventDefault();
    }
    const phoneNumberValue = e.target.value;

    if (phoneNumberValue.length === 10) {

      passwordRef.current.focus(); // Focus on the password input

    }
  };



    const handleSignin = async () => {
      // event.preventDefault();
      const pictureSrc = webcamRef.current.getScreenshot();
      // const blob = dataURLtoBlob(pictureSrc);
      // const file = new File([blob], "signinImage.jpeg", { type: "image/jpeg" });
      // setSigninImage(file);
  
      const formData = new FormData();
      formData.append("image", pictureSrc.split(",")[1]);
      try {
        setLoading(true);
        setError("");
        const response = await axios.post(
          "http://127.0.0.1:8000/signin/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response)
        if (response.statusText == "OK") {
          const response_message = response.data.success;
          console.log(response_message)
          if (response_message) {
            const child_number = response.data.child;
            navigate(`/childpage`)
          } else {
            setVerificationStatus("login failed")
          }
        }
        else {
          setError("Error During Signin")
        }
      }
      catch (err) {
        setError("login failed")
      }
      finally {
        setLoading(false)
      }
    };

  useEffect(()=>{
    setTimeout(()=>{
      handleSignin();
    },4000)
  },[]);










//   useEffect(()=>{
//     const handleSignin = async (event) => {
//       event.preventDefault();
//       const pictureSrc = webcamRef.current.getScreenshot();
//       // const blob = dataURLtoBlob(pictureSrc);
//       // const file = new File([blob], "signinImage.jpeg", { type: "image/jpeg" });
//       // setSigninImage(file);
  
//       const formData = new FormData();
//       formData.append("image", pictureSrc.split(",")[1]);
//       try {
//         setLoading(true);
//         setError("");
//         const response = await axios.post(
//           "http://127.0.0.1:5000/signin/",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         console.log(response)
//         if (response.statusText == "OK") {
//           const response_message = response.data.success;
//           console.log(response_message)
//           if (response_message) {
//             const child_number = response.data.child;
//             navigate(`/childpage`)
//           } else {
//             setVerificationStatus("login failed")
//           }
//         }
//         else {
//           setError("Error During Signin")
//         }
//       }
//       catch (err) {
//         setError("login failed")
//       }
//       finally {
//         setLoading(false)
//       }
//     }
//   });
 
// setTimeout(()=>{
//   handleSignin();
// }, 5000);
// },[]);

  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    }
  };
  return (
    <section className="bg-signin">
      <section className="signin">
        <section className="signin__container">
          <article className="signin__container__form">
            <article className="signin__container__form__logo">
              <Link to="/"><img src={branelogo} alt="logo" /></Link>
            </article>
            <article className="signin__container__form__left">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values }) => (
                  <Form className="login-form">
                    <fieldset>
                      {/* <legend>
                      Fill Out Form With Speech Recognition (Chrome)
                    </legend> */}
                      {/* <div id="result">live transcript here ...</div> */}
                      {/* <button
                        type="button"
                        id="toggle"
                        className={isListening ? "listening" : ""}
                        onClick={() => setIsListening((prevState) => !prevState)}
                      >
                        {isListening ? "Listening ..." : "Toggle listening"}
                      </button> */}
                      <div className="white-box">
                        <TabSwitch
                          activeTab={activeTab}
                          switchTab={setActiveTab}
                        />
                        <div className="form-container">
                          <div className={`tab-content ${activeTab}`}>
                            {activeTab === "left" && (
                              <div style={{ padding: "1rem 0" }}>
                                <div className="input-container">
                                  <i className="bi bi-telephone icon"></i>
                                  <Field
                                    className="input-field"
                                    type="tel"
                                    name="phoneNumber"
                                    onKeyPress={handleKeyPress}
                                    placeholder="Mobile Number"
                                   
                                    innerRef={(el) => { // Attach a ref to the phone number input 
                                      if (el) { 
                                        el.oninput = handleKeyPress; // Attach the event handler
                                       if (el.value.length === 10) { 
                                        passwordRef.current.focus(); // Focus on the password input 
                                      } } }}
                                  />
                                </div>
                                <ErrorMessage
                                  name="phoneNumber"
                                  component="small"
                                  className="error"
                                />
                                <div className="input-container">
                                  <i className="bi bi-lock-fill icon"></i>
                                  <Field
                                    className="input-field-password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    onKeyPress={handleKeyPress}
                                    placeholder="4 Digit PIN"
                                    innerRef={passwordRef}
                                  />
                                  <i
                                    className={`bi bi-eye${showPassword ? "-slash" : ""} password-icon`}
                                    onClick={() => togglePasswordVisibility("password")}
                                  ></i>
                                </div>
                                <ErrorMessage
                                  name="password"
                                  component="small"
                                  className="error"
                                /><br></br>
                                <button className="loginform-btn" type="submit" id="loginButton">
                                  Login
                                </button>
                              </div>


                            )}
                            {activeTab === "center" && (
                              <form className="login-form" onSubmit={handleSignin}>
                                {/* <div className="input-container">
                                  <i className="bi bi-telephone icon"></i>
                                  <Field
                                    className="input-field"
                                    type="tel"
                                    name="phoneNumber"
                                    onKeyPress={handleKeyPress}
                                    placeholder="Mobile Number"
                                  />
                                </div>
                                <ErrorMessage
                                  name="phoneNumber"
                                  component="small"
                                  className="error"
                                /> */}
                                <label>
                                  <div className="webcam-container">
                                    <Webcam
                                      audio={false}
                                      ref={webcamRef}
                                      screenshotFormat="image/jpeg"
                                    />
                                  </div>
                                  <br />
                                  {/* <button className="loginform-btn"  disabled type="submit" onClick={(e) => handleSignin(e, values)}> {loading ? "Signing In..." : "Sign In"}</button>  */}
                                </label>
                                {verificationStatus && <div style={{ fontSize: "1.35rem", color: "red", paddingTop: "1rem" }}>{verificationStatus}</div>}
                              </form>

                            )}
                            {activeTab === "right" && (
                              <form className="login-form">
                                <div className="input-container">
                                  <i className="bi bi-telephone icon"></i>
                                  <Field
                                    className="input-field"
                                    type="tel"
                                    name="phoneNumber"
                                    onKeyPress={handleKeyPress}
                                    placeholder="Mobile Number"
                                  />
                                </div>
                                <ErrorMessage
                                  name="phoneNumber"
                                  component="small"
                                  className="error"
                                />
                                <AudioRecorderSignin />
                              </form>
                            )}
                            {/* <button type="submit" id="loginButton">
                            Login
                          </button> */}
                            {/* <div>
                                {loginStatus && (
                                  <p>Login Status: {loginStatus}</p>
                                )}
                                {childDetails && (
                                  <div>
                                    <p>Child Details:</p>
                                    <pre>
                                      {JSON.stringify(childDetails, null, 2)}
                                    </pre>
                                  </div>
                                )}
                              </div> */}
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </Form>
                )}
              </Formik>
              <div>Dont have an Account? <Link to='/signup'>Sign Up</Link></div>
            </article>
          </article>
          <article className="signup__container__right">
          </article>
        </section>
      </section >
    </section >
  );
};

export default Ui;
