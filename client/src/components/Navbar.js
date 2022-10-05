import React, { useState } from "react";

const Navbar = () => {
    const logout = useState('')
    return(
        <li onClick={logout}>
            <i class="fa-duotone fa-right-from-bracket"></i>
        </li>
    )
}  

export default Navbar;