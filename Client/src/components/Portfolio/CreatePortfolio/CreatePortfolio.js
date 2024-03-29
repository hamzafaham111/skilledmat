import React, { useState, useEffect } from 'react'
import useStyles from './Style';

import axios from 'axios'
import { useCookies } from 'react-cookie'
import AddTages from '../AddTages/AddTages';
const CreatePortfolio = () => {
    const classes = useStyles();
    const [cookies] = useCookies();
    const [done, setDone] = useState(false)
    const [skills, setSkills] = useState([])

    console.log(skills);
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        fatherName: "",
        email: "",
        phoneNumber: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        field: "",
        previousProjects: ""
    });
    const [education, setEducation] = useState({
        institution: "",
        degree: "",
        educationCity: ""
    })
    const handleEducation = (e) => {
        const { value, name } = e.target;
        setEducation((preVal) => {
            return {
                ...preVal,
                [name]: value
            }
        })
    }
    const handleChange = (e) => {
        const { value, name } = e.target;
        setValues((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const callback = (tags) => {
        setSkills(tags)
        alert(tags);
    }

    const Data = {
        data: values,
        token: cookies.JWT,
        skills,
        education,
    }
    const submitData = async (e) => {
        await axios.post(`${process.env.REACT_APP_DOMAIN}/createportfolio`, Data).then(() => { console.log("request is successfull") }).catch(() => { console.log("request not successfull"); })
    }

    return (
        <>
            {done ? <div>
                <h1>My portfolio</h1>
            </div> :
                <div className={classes.portfolioRoot}>
                    <h1 className={classes.portfolioHeading}>Crate Portfolio</h1>
                    <form onSubmit={submitData}>
                        <div>
                            <span>Persnal Information</span>
                            <div className={classes.portfolioInputsDiv}>
                                <input
                                    type="text"
                                    className={classes.portfolioInputs}
                                    name='firstName'
                                    placeholder="First Name"
                                    onChange={handleChange}
                                    value={values.firstName}
                                />
                                <input
                                    type="text"
                                    className={classes.portfolioInputs}
                                    name='lastName'
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                    value={values.lastName}
                                />
                            </div>
                            <div className={classes.portfolioInputsDiv}>
                                <input
                                    type="text"
                                    className={classes.portfolioInputs}
                                    name='fatherName'
                                    placeholder="Father Name"
                                    onChange={handleChange}
                                    value={values.fatherName}
                                />
                                <input
                                    type="text"
                                    className={classes.portfolioInputs}
                                    name='phoneNumber'
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    value={values.phoneNumber}
                                />
                            </div>
                            <div className={classes.portfolioInputsDiv}>
                                <input
                                    type="text"
                                    className={classes.portfolioInputs}
                                    name='email'
                                    placeholder="email"
                                    onChange={handleChange}
                                    value={values.email}
                                />
                                <input
                                    type="text"
                                    className={classes.portfolioInputs}
                                    name='field'
                                    placeholder="field of profession"
                                    onChange={handleChange}
                                    value={values.field}
                                />
                            </div>
                            <div className={classes.portfolioInputsDiv}>
                                <input
                                    type="text"
                                    className={classes.portfolioInputs}
                                    name='country'
                                    placeholder="Country"
                                    onChange={handleChange}
                                    value={values.country}
                                />
                                <input
                                    type="text"
                                    className={classes.portfolioInputs}
                                    name="state"
                                    placeholder="State"
                                    onChange={handleChange}
                                    value={values.state}
                                />
                            </div>
                            <div className={classes.portfolioInputsDiv}>
                                <input
                                    type="text"
                                    className={classes.portfolioInputs}
                                    name='city'
                                    placeholder="city"
                                    onChange={handleChange}
                                    value={values.city}
                                />
                                <input
                                    type="text"
                                    className={classes.portfolioInputs}
                                    name='postalCode'
                                    placeholder="Postel Code"
                                    onChange={handleChange}
                                    value={values.postalCode}
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: "40px" }}>
                            <span>Education</span>
                            <div className={classes.portfolioInputsDiv}>
                                <input
                                    type="text"
                                    className={classes.educationInput}
                                    value={education.institution}
                                    name='institution'
                                    placeholder='Institution'
                                    onChange={handleEducation}
                                />
                                <input
                                    type="text"
                                    className={classes.educationInput}
                                    value={education.degree}
                                    name='degree'
                                    placeholder='Degree'
                                    onChange={handleEducation}
                                />
                                <input
                                    type="text"
                                    className={classes.educationInput}
                                    value={education.educationCity}
                                    name='educationCity'
                                    placeholder='City'
                                    onChange={handleEducation}
                                />

                            </div>
                        </div>
                        <AddTages parentCallBack={callback} />
                        <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
                            <span>Previous Projects:</span>
                            <textarea style={{ width: "85%", height: "100px", margin: "auto", borderRadius: "5px", marginTop: "10px" }} name='previousProjects' onChange={handleChange} value={values.previousProjects} placeholder="past your previous projects links here" />
                        </div>
                        <div className={classes.portfolioInputsDiv}>
                            <button className={classes.createPortfolioBtn}>Create portfolio</button>
                        </div>
                    </form >
                </div >
            }</>
    )
}

export default CreatePortfolio;