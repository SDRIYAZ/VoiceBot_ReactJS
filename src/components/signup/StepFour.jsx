import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import VideoRecorder from "./VideoRecorder";
import VideoRecorderComponent from "./VideoRecorderComponent";
import TakeImage from "./TakeImage";
import AudioRecorder from "./AudioRecorder";

const StepFourSchema = Yup.object().shape({
    child: Yup.array().of(
        Yup.object().shape({
            childname: Yup.string().required("Child's name is required"),
            childsurname: Yup.string().required("Child's surname is required"),
            childdob: Yup.string().required("Child's date of birth is required")
                .matches(
                    /^(0?[1-9]|[12]\d|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/,
                    "Invalid date format. Please use dd/mm/yyyy."
                ),
            childgender: Yup.string().required("Child's gender is required"),
            childnationality: Yup.string().required("Child's nationality is required"),
            childclass: Yup.string().notOneOf(["None"], "Please select a class").required("Child's class is required"),
            childsyllabus: Yup.string().notOneOf(["None"], "Please select a syllabus").required("Child's syllabus is required"),
            mediumofinstruction: Yup.string().notOneOf(["None"], "Please select a medium of instruction").required("Medium of instruction is required"),
            firstlanguage: Yup.string().notOneOf(["None"], "Please select First Language").required("First Language is required"),
            secondlanguage: Yup.string().notOneOf(["None"], "Please select Second Language").required("Second Language is required"),
            thirdlanguage: Yup.string().notOneOf(["None"], "Please select Third Language").required("Third Language is required"),
            childpassword: Yup.string()
                .required("Required")
                .matches(/^\d{4}$/, "Password must be a 4-digit pin"),
            childconfirmpassword: Yup.string()
                .required("Required")
                .matches(/^\d{4}$/, "Password must be a 4-digit pin")
                .oneOf([Yup.ref("childpassword")], "Passwords do not match"),
        })
    ),
});


const validatePasswords = (parentPassword, children) => {
    if (!parentPassword || !children) return {};

    const errors = {};
    const checkedPasswords = [parentPassword]; // Store the parent password in the array

    // Check each child password against the parent and previously checked child passwords
    children.forEach((child, index) => {
        if (checkedPasswords.includes(child.childpassword)) {
            errors[`child[${index}].childpassword`] =
                "Child's password should not match with the parent's password or other child's password.";
        }
        checkedPasswords.push(child.childpassword); // Store the current child password in the array
    });

    return errors;
};


const StepFour = ({ StepFourData, handlePrevious, handleSubmit, isValid, setFieldValue, values, errors, touched, resetForm }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [imageURL, setImageURL] = useState("")
    const { firstlanguage_data, secondlanguage_data, thirdlanguage_data, syllabus_data, classes_data, moi_data, nationality_data } = StepFourData;
    const handleInputChange = (index, fieldName, fieldValue) => {
        const updatedChild = [...values.child];
        updatedChild[index] = { ...updatedChild[index], [fieldName]: fieldValue };
        setFieldValue("child", updatedChild);
    };

    const handleSetChildImageURL = (index, imageURL) => {
        const updatedChild = [...values.child];
        updatedChild[index] = { ...updatedChild[index], childimageurl: imageURL };
        setFieldValue("child", updatedChild);
    };

    const handleAddChild = () => {
        const updatedChild = [...values.child, {}];
        setFieldValue("child", updatedChild);
    };

    const customHandleSubmit = (e) => {
        e.preventDefault()
        const childPasswordsValidation = validatePasswords(
            values.parentspassword,
            values.child
        );

        setFieldValue("child", values.child.map((child, index) => ({
            ...child,
            childpassword: child.childpassword,
            childconfirmpassword: child.childconfirmpassword,
            ...(child.childpassword === values.parentspassword && {
                childpassword: child.childpassword,
                childconfirmpassword: "Child's password should not match the parent's password.",
            }),
            ...(childPasswordsValidation[`child[${index}].childpassword`] && {
                childpassword: child.childpassword,
                childconfirmpassword: "Child's password should not match with the parent's password or other child's password.",
            }),
        })));

        if (Object.keys(childPasswordsValidation).length > 0) {
            return;
        }

        handleSubmit(values, { resetForm });
    };

    const handleDateChange = (date) => {
        setFieldValue(`child[${index}].childdob`, date);
        setShowDatePicker(false);
    };

    const handleRemoveChild = (index) => {
        if (values.child.length === 1) {
            return;
        }

        const updatedChild = [...values.child];
        updatedChild.splice(index, 1); // Remove the child at the specified index
        setFieldValue("child", updatedChild);
    };

    const [showPassword, setShowPassword] = useState(values.child.map(() => false)); // Array to store visibility state for each child's password
    const [showConfirmPassword, setShowConfirmPassword] = useState(values.child.map(() => false)); // Array to store visibility state for each child's confirm password

    const togglePasswordVisibility = (field, index) => {
        if (field === "childpassword") {
            setShowPassword((prevShowPassword) => {
                const updatedShowPassword = [...prevShowPassword];
                updatedShowPassword[index] = !updatedShowPassword[index];
                return updatedShowPassword;
            });
        } else if (field === "childconfirmpassword") {
            setShowConfirmPassword((prevShowConfirmPassword) => {
                const updatedShowConfirmPassword = [...prevShowConfirmPassword];
                updatedShowConfirmPassword[index] = !updatedShowConfirmPassword[index];
                return updatedShowConfirmPassword;
            });
        }
    };

    return (
        <>
            <h2>Child Details</h2>
            {values.child.map((childData, index) => (

                <article className="signup__container__form__div__form__sec__main" title={`Child ${index + 1} Details`} key={index}>
                    <article className="signup__container__form__div__form__sec__title">
                        <div>
                            {`Child ${index + 1} Details`}
                        </div>
                        <div>
                            {values.child.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveChild(index)}
                                >
                                    Remove child
                                </button>
                            )}
                        </div>

                    </article>
                    <article className="signup__container__form__div__form__sec">
                        <div className="signup__container__form__div__form__sec__input-container">
                            <i className="bi bi-person-fill icon"></i>
                            <Field
                                className="signup__container__form__div__form__sec__input-container__input-field"
                                placeholder="Name"
                                name={`child[${index}].childname`}
                                type="text"
                                value={childData.childname || ""}
                                onChange={(e) => handleInputChange(index, "childname", e.target.value)}
                            />
                        </div>
                        {touched.child && touched.child[index] && errors[`child[${index}].childname`] && (
                            <small>{errors[`child[${index}].childname`]}</small>
                        )}

                        <div className="signup__container__form__div__form__sec__input-container">
                            <i className="bi bi-person-fill icon"></i>
                            <Field
                                className="signup__container__form__div__form__sec__input-container__input-field"
                                placeholder="Surname"
                                name={`child[${index}].childsurname`}
                                type="text"
                                value={childData.childsurname || ""}
                                onChange={(e) => handleInputChange(index, "childsurname", e.target.value)}
                            />
                        </div>
                        {touched.child && touched.child[index] && errors.child && errors.child[index] && (
                            <small>{errors.child[index].childsurname}</small>
                        )}

                        {/* <div className="signup__container__form__div__form__sec__input-container">
                            <i class="bi bi-calendar-event-fill icon"></i>
                            <label className="dob-icon">D.O.B</label>
                            <Field
                                className="signup__container__form__div__form__sec__input-container__input-field"
                                placeholder="Date of Birth"
                                name={`child[${index}].childdob`}
                                type="date"
                                value={childData.childdob || ""}
                                onChange={(e) => handleInputChange(index, "childdob", e.target.value)}
                            />
                        </div>
                        <small><ErrorMessage name={`child[${index}].childdob`} component="div" /></small> */}

                        <div className="signup__container__form__div__form__sec__input-container">
                            <i className="bi bi-calendar-event-fill icon"></i>
                            <Field
                                className="signup__container__form__div__form__sec__input-container__input-field"
                                placeholder="Date of Birth (dd/mm/yyyy)"
                                name={`child[${index}].childdob`}
                                type="text"
                                value={childData.childdob || ""}
                                onChange={(e) => handleInputChange(index, "childdob", e.target.value)}
                            />
                        </div>
                        {touched.child && touched.child[index] && errors.child && errors.child[index] && (
                            <small>{errors.child[index].childdob}</small>
                        )}
                        {/* <div className="signup__container__form__div__form__sec__input-container">
                            <i
                                className="bi bi-calendar-event-fill icon"
                                onClick={() => setShowDatePicker(true)}
                            ></i>
                            <Field
                                className="signup__container__form__div__form__sec__input-container__input-field"
                                placeholder="Date of Birth (dd/mm/yyyy)"
                                name={`child[${index}].childdob`}
                                type="date"
                                value={childData.childdob || ""}
                                onChange={(e) => handleInputChange(index, "childdob", e.target.value)}
                            />
                        </div> */}
                        {/*
                            {showDatePicker && (
                                <DatePicker
                                    // className="signup__container__form__div__form__sec__input-container__input-field"
                                    selected={childData.childdob ? new Date(childData.childdob) : null}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    showYearDropdown
                                    scrollableYearDropdown
                                />
                            )}
                            <small>
                                <ErrorMessage name={`child[${index}].childdob`} component="div" />
                            </small>
                        </div> */}

                        <div className="signup__container__form__div__form__sec__input-container">
                            <i className="bi bi-people-fill icon"></i>
                            <select
                                className="signup__container__form__div__form__sec__input-container__input-field"
                                name={`child[${index}].childgender`}
                                onChange={(e) => handleInputChange(index, "childgender", e.target.value)} required
                            >
                                <option value="none">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        {touched.child && touched.child[index] && errors.child && errors.child[index] && (
                            <small>{errors.child[index].childgender}</small>
                        )}

                        <div className="signup__container__form__div__form__sec__input-container">
                            <i className="bi bi-globe2 icon"></i>
                            <Field
                                className="signup__container__form__div__form__sec__input-container__input-field"
                                placeholder="Nationality"
                                name={`child[${index}].childnationality`}
                                type="text"
                                value={childData.childnationality || ""}
                                onChange={(e) => handleInputChange(index, "childnationality", e.target.value)}
                            />
                        </div>
                        {touched.child && touched.child[index] && errors.child && errors.child[index] && (
                            <small>{errors.child[index].childnationality}</small>
                        )}

                        <div className="signup__container__form__div__form__sec__input-container">
                            <i className="bi bi-book-half icon"></i>
                            <select
                                className="signup__container__form__div__form__sec__input-container__input-field"
                                name={`child[${index}].childclass`}
                                onChange={(e) => handleInputChange(index, "childclass", e.target.value)} required
                            >
                                <option value="none">Select Class</option>
                                {classes_data.map((element, index) => (
                                    <option key={index} value={element}>{element}</option>
                                ))}
                            </select>
                        </div>
                        {touched.child && touched.child[index] && errors.child && errors.child[index] && (
                            <small>{errors.child[index].childclass}</small>
                        )}

                        <div className="signup__container__form__div__form__sec__input-container">
                            <i className="bi bi-journal-bookmark-fill icon"></i>
                            <select
                                className="signup__container__form__div__form__sec__input-container__input-field"
                                name={`child[${index}].childsyllabus`}
                                required
                                onChange={(e) => handleInputChange(index, "childsyllabus", e.target.value)}
                            >
                                <option value="none">Select Syllabus</option>
                                {syllabus_data.map((element, index) => (
                                    <option key={index} value={element}>{element}</option>
                                ))}
                            </select>
                        </div>
                        {touched.child && touched.child[index] && errors.child && errors.child[index] && (
                            <small>{errors.child[index].childsyllabus}</small>
                        )}

                        <div className="signup__container__form__div__form__sec__input-container">
                            <i className="bi bi-building icon"></i>
                            <Field
                                className="signup__container__form__div__form__sec__input-container__input-field"
                                placeholder="School/College Name (Optional)"
                                name={`child[${index}].childschool`}
                                type="text"
                                value={childData.childschool || ""}
                                onChange={(e) => handleInputChange(index, "childschool", e.target.value)}
                            />
                        </div>
                        {touched.child && touched.child[index] && errors.child && errors.child[index] && (
                            <small>{errors.child[index].childschool}</small>
                        )}

                        <div className="signup__container__form__div__form__sec__input-container">
                            <i className="bi bi-book-fill icon"></i>
                            <select
                                className="signup__container__form__div__form__sec__input-container__input-field"
                                name={`child[${index}].mediumofinstruction`}
                                onChange={(e) => handleInputChange(index, "mediumofinstruction", e.target.value)}
                                required
                            >
                                <option value="none">Medium of Instruction</option>
                                {moi_data.map((element, index) => (
                                    <option key={index} value={element}>{element}</option>
                                ))}
                            </select>
                        </div>
                        {touched.child && touched.child[index] && errors.child && errors.child[index] && (
                            <small>{errors.child[index].mediumofinstruction}</small>
                        )}


                        <div className="signup__container__form__div__form__sec__input-container">
                            <i className="bi bi-journal-text icon"></i>
                            <select
                                className="signup__container__form__div__form__sec__input-container__input-field"
                                name={`child[${index}].firstlanguage`}
                                type="text"
                                value={childData.firstlanguage || ""}
                                onChange={(e) => handleInputChange(index, "firstlanguage", e.target.value)}
                            >
                                <option value="none">First Language</option>
                                {firstlanguage_data.map((element, index) => (
                                    <option key={index} value={element}>{element}</option>
                                ))}
                            </select>
                        </div>
                        {touched.child && touched.child[index] && errors.child && errors.child[index] && (
                            <small>{errors.child[index].firstlanguage}</small>
                        )}

                        <div className="signup__container__form__div__form__sec__input-container">
                            <i className="bi bi-journal-text icon"></i>
                            <select
                                className="signup__container__form__div__form__sec__input-container__input-field"
                                name={`child[${index}].secondlanguage`}
                                type="text"
                                value={childData.secondlanguage || ""}
                                onChange={(e) => handleInputChange(index, "secondlanguage", e.target.value)}
                            >
                                <option value="none">Second Language</option>
                                {secondlanguage_data.map((element, index) => (
                                    <option key={index} value={element}>{element}</option>
                                ))}
                            </select>
                        </div>
                        {touched.child && touched.child[index] && errors.child && errors.child[index] && (
                            <small>{errors.child[index].secondlanguage}</small>
                        )}

                        <div className="signup__container__form__div__form__sec__input-container">
                            <i className="bi bi-journal-text icon"></i>
                            <select
                                className="signup__container__form__div__form__sec__input-container__input-field"
                                name={`child[${index}].thirdlanguage`}
                                type="text"
                                value={childData.thirdlanguage || ""}
                                onChange={(e) => handleInputChange(index, "thirdlanguage", e.target.value)}
                            >
                                <option value="none">Third Language</option>
                                {thirdlanguage_data.map((element, index) => (
                                    <option key={index} value={element}>{element}</option>
                                ))}
                            </select>
                        </div>
                        {touched.child && touched.child[index] && errors.child && errors.child[index] && (
                            <small>{errors.child[index].thirdlanguage}</small>
                        )}
                        {/* Render the child password input field */}
                        <div className="signup__container__form__div__form__sec__input-container">
                            <i className="bi bi-key icon"></i>
                            <Field
                                className="signup__container__form__div__form__sec__input-container__input-field-password"
                                placeholder="Child Account Password"
                                name={`child[${index}].childpassword`}
                                type={showPassword[index] ? "text" : "password"} // Use the showPassword state to toggle visibility
                                maxLength={4}
                                value={childData.childpassword || ""}
                                onChange={(e) => handleInputChange(index, "childpassword", e.target.value)}
                            />
                            <i
                                className={`bi bi-eye${showPassword[index] ? "-slash" : ""} password-icon`}
                                onClick={() => togglePasswordVisibility("childpassword", index)}
                            ></i>
                        </div>
                        {touched.child && touched.child[index] && errors.child && errors.child[index] && (
                            <small>{errors.child[index].childpassword}</small>
                        )}

                        {/* Render the child confirm password input field */}
                        <div className="signup__container__form__div__form__sec__input-container">
                            <i className="bi bi-key icon"></i>
                            <Field
                                className="signup__container__form__div__form__sec__input-container__input-field-password"
                                placeholder="Re-enter Password"
                                name={`child[${index}].childconfirmpassword`}
                                type={showConfirmPassword[index] ? "text" : "password"} // Use the showConfirmPassword state to toggle visibility
                                maxLength={4}
                                value={childData.childconfirmpassword || ""}
                                onChange={(e) => handleInputChange(index, "childconfirmpassword", e.target.value)}
                            />
                            <i
                                className={`bi bi-eye${showConfirmPassword[index] ? "-slash" : ""} password-icon`}
                                onClick={() => togglePasswordVisibility("childconfirmpassword", index)}
                            ></i>
                        </div>
                        {touched.child && touched.child[index] && errors.child && errors.child[index] && (
                            <small>{errors.child[index].childconfirmpassword}</small>
                        )}

                        <TakeImage mobileno={values.parentsmobileno} childno={index + 1} setChildImageURL={handleSetChildImageURL} />
                        <AudioRecorder />
                        {/* <VideoRecorder mobileno={values.parentsmobileno} childno={index + 1} /> */}
                        {/* <VideoRecorderComponent mobileno={values.parentsmobileno} childno={index + 1} /> */}
                        {/* <VideoRecorder mobileno="9390708854" childno="1" /> */}
                    </article>
                </article>
            ))}
            {values.child.length === 1 && <p style={{fontSize:".8rem"}}>At least one child form is required.</p>}
            {values.child.length < 5 && (
                <a style={{ background: "#007DFA" }} className="signup__container__form__div__button" href="#" onClick={handleAddChild}>
                    Add Child
                </a>
            )}
            <article className="signup__container__form__div__form__buttons">
                <button className="signup__container__form__div__button" onClick={handlePrevious}>Previous</button>
                <button className="signup__container__form__div__button" onClick={customHandleSubmit} disabled={!isValid}>
                    Submit
                </button>
            </article>

        </>
    );
};

export { StepFour, StepFourSchema };
