import React, { useState, useEffect } from 'react'
import useStyle from "./Style";
import { IoReorderThreeOutline } from "react-icons/io5";
import axios from 'axios';
import { useCookies } from 'react-cookie'
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'



const Navbar = (props) => {
    const [portfolioBtn, setPortfolioBtn] = useState("------")
    const [value, setValue] = useState({})
    const [cookies] = useCookies();
    const token = cookies.JWT;
    const history = useNavigate();
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_DOMAIN}/home`, cookies).then((res) => { setValue(res.data.res) }).catch(() => { history('/'); });

        axios.get(`${process.env.REACT_APP_DOMAIN}/myportfolio`, {
            headers: {
                token
            }
        }).then((res) => { setPortfolioBtn("My Portfolio"); console.log("alredy exist") }).catch(() => { setPortfolioBtn("Create Portfolio"); console.log("does not exist") })
    }, [])
    const { name } = value;
    const [click, setClick] = useState(false);
    const [expend, setExpend] = useState("none")
    const setDropDown = () => {
        expend == "none" ? setExpend("block") : setExpend("none");
    }
    const handleChange = () => {
        !click ? setClick(true) : setClick(false)
    }
    const clickManue = () => {
        setClick(false)
    }
    const classes = useStyle();


    return (
        <>
            <div className={classes.outeRoot}>
                {/* Nav for big screen */}
                <div style={{ display: "flex", padding: "10px 0", justifyContent: "flex-end", boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px" }}>
                    <button className={classes.navBtnInterview}>Interview</button>
                    <Link to="/home/portfolio"><button className={classes.navBtnProtfolio}>{portfolioBtn}</button></Link>
                </div>
                <nav className={classes.navRoot}>
                    <h1 className={classes.naveLogoName}>SkilledMat</h1>
                    <ul className={classes.naveManue}>
                        <Link to="/home" className={classes.navManueItem}><li>Home </li></Link>
                        <Link to="jobs" className={classes.navManueItem}><li>Jobs</li></Link>
                        <Link to="message" className={classes.navManueItem}><li>Messages </li></Link>
                        <Link to="search" className={classes.navManueItem}><li>Search </li></Link>
                        <Link to="notifications" className={classes.navManueItem}><li>Notifications </li></Link>
                    </ul>

                    <div>
                        <IoReorderThreeOutline className={classes.navToggle} onClick={handleChange} />
                    </div>
                    <div className={classes.accountRoot} onClick={setDropDown}>
                        <span >{name}</span>
                        <ul className={classes.accountDropdownItems} style={{ display: expend }}>
                            <Link to="profile" style={{ textDecoration: "none", color: "black" }}>
                                <li className={classes.accountDropdownItem}>My Profile</li>
                            </Link>
                            <hr />
                            <Link to="/"> <li className={classes.accountDropdownItem}>Logout</li></Link>
                        </ul>
                    </div>
                    <div><Link to='postjob'><button className={classes.navBtn}>Post a job</button></Link></div>
                </nav>
                {/* Nav For Mobile Screen */}
                {
                    click ? <nav className={classes.downNav}>
                        <ul className={classes.downNavManue}>
                            <Link to="/home" className={classes.downNavManueItem} onClick={clickManue}><li className={classes.downNavItemBackground}>Home </li></Link>
                            <Link to="/home/jobs" className={classes.downNavManueItem} onClick={clickManue}><li className={classes.downNavItemBackground}>Jobs </li></Link>
                            <Link to="/home/message" className={classes.downNavManueItem} onClick={clickManue}><li className={classes.downNavItemBackground}>Messages </li></Link>
                            <Link to="/home/search" className={classes.downNavManueItem} onClick={clickManue}><li className={classes.downNavItemBackground}>Search </li></Link>
                            <Link to="/home/notifications" className={classes.downNavManueItem} onClick={clickManue}><li className={classes.downNavItemBackground}>Notifications </li></Link>
                        </ul>
                    </nav> : <></>
                }
            </div>
            <Outlet />
        </>
    )
}
export default Navbar;