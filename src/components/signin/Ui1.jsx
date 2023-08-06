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

const Ui = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    init();
  }, []);

  function init() {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      let speech = {
        enabled: true,
        listening: false,
        recognition: new window.SpeechRecognition(),
        text: "",
      };
      speech.recognition.continuous = true;
      speech.recognition.interimResults = true;
      speech.recognition.lang = "en-US";
      speech.recognition.addEventListener("result", (event) => {
        const audio = event.results[event.results.length - 1];
        speech.text = audio[0].transcript;
        const tag = document.activeElement.nodeName;
        if (tag === "INPUT" || tag === "TEXTAREA") {
          if (audio.isFinal) {
            document.activeElement.value += speech.text;
          }
        }
        setSpeechText(speech.text);
        if (
          speech.text.toLowerCase().includes("login") ||
          speech.text.toLowerCase().includes("sign in")
        ) {
          document.getElementById("loginButton").click();
        }
      });

      document.getElementById("toggle").addEventListener("click", () => {
        speech.listening = !speech.listening;
        setIsListening(speech.listening);
        if (speech.listening) {
          speech.recognition.start();
        } else {
          speech.recognition.stop();
        }
      });
    }
  }

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
  };


  // const handleSignin = async (event) => {
  //   event.preventDefault();
  //   const pictureSrc = webcamRef.current.getScreenshot();
  //   const blob = dataURLtoBlob(pictureSrc);
  //   const file = new File([blob], "signinImage.jpeg", { type: "image/jpeg" });
  //   setSigninImage(file);

  //   // Convert the image file to base64
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = async () => {
  //     const base64Image = reader.result; // This will contain the base64 representation of the image

  //     // Now you can send the base64Image to your server or perform any other action
  //     // For example, you can use axios to send it as a part of your formData
  //     const formData = new FormData();
  //     formData.append("image_file", base64Image.split(',')[1]);
  //     formData.append("mobile_number", "8290393139");
  //     // console.log(base64Image)
  //     // formData.append("base64Image", base64Image); // Append the base64 image to the formData

  //     try {
  //       setLoading(true);
  //       setError("");
  //       const response = await axios.post(
  //         "http://127.0.0.1:8000/signin/",
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       console.log(response)
  //       if (response.ok) {
  //         console.log(response)
  //         const data = await response.json();
  //         const verified = data.verified;
  //         if (verified) {
  //           setVerificationStatus("Login successful");
  //         } else {
  //           setVerificationStatus("Login failed");
  //         }
  //       } else {
  //         setError("Error during sign-in");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setError("An error occurred");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   // The rest of your code...
  // };

  const handleSignin = async (event) => {
    event.preventDefault();
    const pictureSrc = webcamRef.current.getScreenshot();
    // const blob = dataURLtoBlob(pictureSrc);
    // const file = new File([blob], "signinImage.jpeg", { type: "image/jpeg" });
    // setSigninImage(file);

    const formData = new FormData();
    formData.append("image_file", pictureSrc.split(",")[1]);
    formData.append("mobile_number", "8290393139")
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
        const response_message = response.data.message;
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
  }


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
                  <Form>
                    <fieldset>
                      {/* <legend>
                      Fill Out Form With Speech Recognition (Chrome)
                    </legend> */}
                      {/* <div id="result">live transcript here ...</div> */}
                      <button
                        type="button"
                        id="toggle"
                        className={isListening ? "listening" : ""}
                        onClick={() => setIsListening((prevState) => !prevState)}
                      >
                        {isListening ? "Listening ..." : "Toggle listening"}
                      </button>
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
                                />
                                <button type="submit" id="loginButton">
                                  Login
                                </button>
                              </div>


                            )}
                            {activeTab === "center" && (
                              <form onSubmit={handleSignin}>
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
                                <label>
                                  <div className="webcam-container">
                                    <Webcam
                                      audio={false}
                                      ref={webcamRef}
                                      screenshotFormat="image/jpeg"
                                    />
                                  </div>
                                  <button type="submit" onClick={handleSignin}> {loading ? "Signing In..." : "Sign In"}</button>
                                </label>
                                {verificationStatus && <div style={{ fontSize: "1.35rem", color: "red", paddingTop: "1rem" }}>{verificationStatus}</div>}
                              </form>

                            )}
                            {activeTab === "right" && (
                              <div className="input-wrapper">
                                <label>
                                  Password
                                  <Field
                                    type="password"
                                    name="password"
                                    onKeyPress={handleKeyPress}
                                  />
                                  <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="error"
                                  />
                                </label>
                              </div>
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
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quas
          necessitatibus consequatur itaque veritatis exercitationem voluptatum
          amet, tempora, fugit soluta natus unde. Incidunt animi eveniet est
          illo dolore iusto ipsa vel voluptatibus possimus mollitia. Sed est
          laboriosam, et odit inventore consequatur repellat necessitatibus
          reiciendis corrupti eaque ab in dolores tempore ex placeat quasi earum
          omnis sequi unde accusamus? Atque cupiditate esse, aliquam dolore
          incidunt perferendis quasi nam dolorem in, quidem enim nostrum
          reprehenderit rem modi sint? Quis nam beatae quos magni ratione
          commodi eligendi consectetur. Dignissimos adipisci obcaecati
          doloremque impedit! Alias est numquam vel eius, commodi id. Veniam
          vitae deleniti et molestiae blanditiis consequuntur vero libero
          voluptatibus rem similique exercitationem, ex nobis. Maiores itaque
          omnis quas veritatis voluptatibus. Asperiores labore architecto a
          saepe quisquam magnam placeat eligendi natus, necessitatibus debitis
          impedit optio earum possimus aspernatur eius praesentium? Debitis
          accusantium minus adipisci aspernatur, unde nostrum incidunt vel dicta
          qui laboriosam eos sed officiis dolore repudiandae facere! Consectetur
          voluptas explicabo nostrum veniam sit! Eaque ad illum nobis nam
          nostrum ab voluptatibus et cum eos illo reprehenderit, repudiandae
          quidem molestiae atque libero vero labore recusandae tempora adipisci.
          Voluptatibus, nihil beatae sunt similique cum esse minima animi ipsum
          adipisci quibusdam repudiandae provident enim repellendus. */}
            {/* <img style={{ height: '25rem', marginTop: '5rem' }} src={image}></img> */}
          </article>
        </section>
      </section >
    </section >
  );
};

export default Ui;
