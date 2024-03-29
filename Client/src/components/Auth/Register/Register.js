import React, { useState } from 'react'
import './Register.css'
import axios from 'axios';
import IconName from '../Assets/icons/firstname.png'
import IconEmail from '../Assets/icons/email.png'
import IconUserName from '../Assets/icons/username.png'
import IconPassword from '../Assets/icons/password.png'

const Register = () => {
    const [fieldData, setFieldData] = useState({
        name: "",
        email: "",
        userName: "",
        password: "",
        cpassword: ""
    })
    const [message, setMessage] = useState('Please fill in the following information to have access to our system')
    const [status, setStatus] = useState(202)
    console.log(fieldData);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFieldData((preValue) => {
            return {
                ...preValue,
                [name]: value,

            }
        })
    }

    const submitValue = async (e) => {
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_DOMAIN}/register`, fieldData).then(() => {
            setMessage("Registered Successfully");
            setStatus(202);
            setFieldData({
                name: "",
                email: "",
                userName: "",
                password: "",
                cpassword: ""
            })
        }).catch((error) => {
            setMessage(error.response.data.err);
            setStatus(error.response.status)
        })
    }

    return (
        <form>
            {
                status === 500 ?
                    <p className='instruction-text' style={{ color: "red" }} >{message}</p> :
                    <p className='instruction-text' style={{ color: "#5c636e" }}>{message}</p>
            }
            <div className='inputs-div'>
                <div className='input-div' >

                    <div className='register-input-root'>
                        <img className='register-input-icon' src={IconName} alt="icon" />
                        <input className='register-input' name="name" value={fieldData.name} type="text" placeholder="Enter Your Name" onChange={handleChange} />
                    </div>
                </div>
                <div className='input-div' >

                    <div className='register-input-root'>
                        <img className='register-input-icon' src={IconEmail} alt="icon" />
                        <input className='register-input' name="email" value={fieldData.email} type="text" placeholder="email" onChange={handleChange} />
                    </div>
                </div>
                <div className='input-div' >

                    <div className='register-input-root'>
                        <img className='register-input-icon' src={IconUserName} alt="icon" />
                        <input className='register-input' name="userName" value={fieldData.userName} type="text" placeholder="username" onChange={handleChange} />
                    </div>
                </div>
                <div className='input-div' >

                    <div className='register-input-root' >
                        <img className='register-input-icon' src={IconPassword} alt="icon" />
                        <input className='register-input' name="password" value={fieldData.password} type="text" placeholder="password" onChange={handleChange} />
                    </div>
                </div>
                <div className='input-div' >

                    <div className='register-input-root' >
                        <img className='register-input-icon' src={IconPassword} alt="icon" />
                        <input className='register-input' name="cpassword" value={fieldData.cpassword} type="text" placeholder="conform password" onChange={handleChange} />
                    </div>
                </div>

            </div>
            <div className='form-btn-div' style={{}}>
                {/* <Link to="/uploadfile"><button className='form-btn'>REGISTER</button></Link> */}
                <button className='form-btn' onClick={submitValue}>REGISTER</button>
            </div>
            <p className='instruction-text'>After submission you will receive an email
                indicating your registration request status.</p>
        </form>
    )
}

export default Register