import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import axios from 'axios';
import { StepOne, StepOneSchema } from "./StepOne";
import { StepTwo, StepTwoSchema } from "./StepTwo";
import { StepThree, StepThreeSchema } from "./StepThree";
import { StepFour, StepFourSchema } from "./StepFour";
import "./signup.css";
import branelogo from "assets/HomePage_Assets/branelogo_signup.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getSignUpData } from 'services/signup_services/getSignUpData';

const MultistepForm = () => {
  const dispatch = useDispatch();
  const signup_data = useSelector((state) => state.signupdata_slice)
  const { data, loading, isSuccess, message } = signup_data;
  const [signupData, setSignupData] = useState([]);
  useEffect(() => {
    dispatch(getSignUpData());
  }, []);

  useEffect(() => {
    if (!loading && isSuccess) {
      const { mothertounge, firstlanguage, secondlanguage, thirdlanguage, classes,
        moi, nationality, syllabus } = data;
      const mothertongue_data = mothertounge[0].mother_tongue;
      const firstlanguage_data = firstlanguage[0].firstlanguage;
      const secondlanguage_data = secondlanguage[0].secondlanguage;
      const thirdlanguage_data = thirdlanguage[0].thirdlanguage;
      const syllabus_data = syllabus[0].syllabus;
      const classes_data = classes[0].class;
      const moi_data = moi[0].medium_of_instruction;
      const nationality_data = nationality[0].nationality;

      setSignupData([
        {
          "StepThreeData": { "mothertongue_data": mothertongue_data }
        },
        {
          "StepFourData": {
            "firstlanguage_data": firstlanguage_data,
            "secondlanguage_data": secondlanguage_data,
            "thirdlanguage_data": thirdlanguage_data,
            "syllabus_data": syllabus_data,
            "classes_data": classes_data,
            "moi_data": moi_data,
            "nationality_data": nationality_data
          }
        }
      ])

      // const { bannerimg, bannerdescription, bannerquote } = banner_data;
      // setBannerData({ "bannerimg": bannerimg, "bannerquote": bannerquote, "bannerdescription": bannerdescription })
    }
  }, [loading, isSuccess, data]);

  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const initialValues = {
    parentsmobileno: "",
    parentsmobileotp: "",
    parentspassword: "",
    parentsconfirmpassword: "",
    parentsname: "",
    parentssurname: "",
    parentsalternateno: "",
    parentsalternateotp: "",
    parentsemail: "",
    country: "",
    pincode: "",
    state: "",
    city: "",
    district: "",
    address: "",
    mothertongue: "",
    child: [
      {
        childname: "",
        childsurname: "",
        childdob: "",
        childgender: "",
        childnationality: "",
        childclass: "",
        childsyllabus: "",
        childschool: "",
        mediumofinstruction: "",
        firstlanguage: "",
        secondlanguage: "",
        thirdlanguage: "",
        childpassword: "",
        childconfirmpassword: "",
        childimageurl: "",
      },
    ],
  };

  const handleKeyPress = (e) => {
    const digitPattern = /^[0-9]*$/;
    const key = String.fromCharCode(e.which);

    if (!digitPattern.test(key)) {
      e.preventDefault();
    }
  };

  const handleNext = (step) => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const steps = [
    { component: StepOne, validationSchema: StepOneSchema },
    { component: StepTwo, validationSchema: StepTwoSchema },
    { component: StepThree, validationSchema: StepThreeSchema },
    { component: StepFour, validationSchema: StepFourSchema },
  ];

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Make a POST request to the API endpoint with the form data
      await axios.post("http://localhost:8080/signup", values);

      // If the request is successful, you can handle the next steps or show a success message.
      // For example, you can proceed to the next step or show a success message to the user.
      setCurrentStep(1);
      resetForm();
      // Add your logic to handle the next steps or success message here.
      navigate("/login");

    } catch (error) {
      // Handle errors if the request fails
      console.error("Error submitting form:", error);
      // Add your error handling logic here, e.g., showing an error message to the user.
    }
  };

  return (
    <section className="signup">
      <section className="signup__container">
        <article className="signup__container__form">
          <article className="signup__container__form__logo">
            <Link to="/"><img src={branelogo} alt="logo" /></Link>
          </article>
          <article className="signup__container__form__div">
            <article className="signup__container__form__div__steps">
              <p>
                Step {currentStep} of {totalSteps}
              </p>
              <article className="signup__container__form__animation">
                <div className="progress-container">
                  <ul>
                    {[...Array(totalSteps)].map((_, index) => (
                      <li key={index} style={{ left: `${(index / (totalSteps - 1)) * 100}%`, background: index < currentStep - 1 ? "#2ce36a" : "#7c69f2", }}>{index + 1}</li>
                    ))}
                  </ul>
                  <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                </div>

              </article>
            </article>
            <Formik
              initialValues={initialValues}
              validationSchema={
                currentStep === 1
                  ? StepOneSchema
                  : currentStep === 2
                    ? StepTwoSchema
                    : currentStep === 3
                      ? StepThreeSchema
                      : StepFourSchema
              }
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, isValid, setFieldValue, values, errors, touched, resetForm }) => (
                <Form className="signup__container__form__div__form">
                  {currentStep === 1 && (
                    <StepOne
                      handleNext={handleNext}
                      isValid={isValid}
                      setFieldValue={setFieldValue}
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleKeyPress={handleKeyPress}
                    />
                  )}

                  {currentStep === 2 && (
                    <StepTwo
                      handleNext={handleNext}
                      isValid={isValid}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      touched={touched}
                      handleKeyPress={handleKeyPress}
                    />
                  )}
                  {currentStep === 3 && (
                    <StepThree
                      handlePrevious={handlePrevious}
                      handleNext={handleNext}
                      isValid={isValid}
                      setFieldValue={setFieldValue}
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleKeyPress={handleKeyPress}
                      StepThreeData = {signupData[0]?.StepThreeData}
                    />
                  )}

                  {currentStep === 4 && (
                    <StepFour
                      handlePrevious={handlePrevious}
                      handleSubmit={handleSubmit}
                      isValid={isValid}
                      setFieldValue={setFieldValue}
                      values={values}
                      errors={errors}
                      resetForm={resetForm}
                      touched={touched}
                      StepFourData = {signupData[1]?.StepFourData}
                    />
                  )}
                </Form>
              )}
            </Formik>
            <div style={{ textAlign: 'center', padding: "1rem 0" }}>Already Have An Account? <Link to='/login'>Sign In</Link></div>
          </article>
        </article>
        <article className="signup__container__animation">

        </article>
      </section>
    </section>
  );
};

export default MultistepForm;
