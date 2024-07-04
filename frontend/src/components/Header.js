import React from "react";
import"./Header.css";
import logo from "./logo.png"; 
const Header =()=>{

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-custom" >
        <a class="navbar-brand" href="#">Salon Suwani</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/az">Vacancy</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Admin
              </a>
              <div class="dropdown-menu"  aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="/students" >Applications</a>
                <a class="dropdown-item" href="/add">Add Vacancy</a>
                <a class="dropdown-item" href="/az">Vacancy List </a>
                
                </div>
            </li>
          
          </ul>
          
          
                    <img src={logo} alt="Logo" width="120" height="90" className="d-inline-block align-top" />
                
         
        </div>
      </nav>

    )
}

export default Header;