import React, { useState } from 'react'
import Navbar from "./components/Navbar/Navbar";
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import Home from './components/Home/Home';
import Message from './components/Message/Message';
import { Routes, Route } from 'react-router-dom';
import Search from './components/Search/Search';
import Catogries from './components/Jobs/Jobs';
import Notifications from './components/Notifications/Notifications';
import Auth from './components/Auth/Auth';
import Inbox from './components/Message/Inbox/Inbox';
import Profile from './components/Profile/Profile';
import Portfolio from './components/Portfolio/Portfolio';
import PostJob from './components/PostJob/PostJob';
import UserProfile from './components/UserProfile/UserProfile';
const theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 700,
            md: 960,
            lg: 1050,
            xl: 1920,
        },
    }
})
const Master = () => {
    const [id, setId] = useState();
    const callBack = (data) => {
        setId(data)
    }
    return (
        <div >
            <ThemeProvider theme={theme}>
                <div >
                    <Routes Routes >
                        <Route path='/' element={<Auth />} />
                        <Route path='/home' element={<Navbar />} >
                            <Route path='' element={<Home />} />
                            <Route path='message' element={<Message />} />
                            <Route path='inbox' element={<Inbox />} />
                            <Route path='search' element={<Search />} />
                            <Route path='jobs' element={<Catogries />} />
                            <Route path='notifications' element={<Notifications />} />
                            <Route path='profile' element={<Profile />} />
                            <Route path='portfolio' element={<Portfolio />} />
                            <Route path='postjob' element={<PostJob />} />
                            <Route path='userprofile/:userProfileID' element={<UserProfile />} />

                        </Route>
                    </Routes>
                </div>
            </ThemeProvider >
        </div >
    )
}
export default Master;