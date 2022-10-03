import React from "react";
import { 
    BrowserRouter as Router,
    Routes,
    Route
  } from 'react-router-dom';
import Home from '../../pages/Home';
import Auth from '../../pages/Auth';
import NewPost from '../../pages/Post';
import Error from '../../pages/Error'

function IndexRoutes() {
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Auth />} />
                <Route path='/home' element={<Home />} />
                <Route path='/newpost' element={<NewPost />} />
                <Route path='/error' element={<Error />} />
            </Routes>
        </Router>
    )
}
export default IndexRoutes;