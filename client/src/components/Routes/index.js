import React from "react";
import { 
    BrowserRouter as Router,
    Routes,
    Route
    //Navigate
  } from 'react-router-dom';
import Home from '../../pages/Home';
import Auth from '../../pages/Auth';
import NewPost from '../../pages/Post';

function IndexRoutes() {
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Auth />} />
                <Route path='/home' element={<Home />} />
                <Route path='/newpost' element={<NewPost />} />
            </Routes>
        </Router>
    )
}
export default IndexRoutes;