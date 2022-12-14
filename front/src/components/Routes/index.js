import React from "react";
import { 
    BrowserRouter as Router,
    Routes,
    Route
  } from 'react-router-dom';
import Auth from '../../pages/Auth';
import Navbar from '../Navbar'
import Home from '../../pages/Home';
import NewPost from '../../pages/NewPost';


function IndexRoutes() {
    return(
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Auth />} />
                <Route path='/home' element={<Home />} />
                <Route path='/newpost' element={<NewPost />} />
            </Routes>
        </Router>
    )
}
export default IndexRoutes;