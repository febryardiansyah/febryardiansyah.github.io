import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'

export default function NavBar() {
    return (
        <header>
            <nav className="navbar navbar-light navbar-expand-lg scrolling-navbar">
                <div className="container">
                    <NavLink activeClassName="" to="/" index className="navbar-brand" >
                        <img src="/assets/logo.svg" alt="" width="24" height="24" class="d-inline-block align-text-top me-2" />
                        febryardiansyah;
                    </NavLink>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className='collapse navbar-collapse' id="navbarSupportedContent">
                        <div className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <NavLink activeClassName="" to="/posts" className="nav-link nav-item">Blog</NavLink>
                            <NavLink activeClassName="" to="/projects" className="nav-link nav-item">Projects</NavLink>
                            <NavLink activeClassName="" to="/about" className="nav-link nav-item">About me</NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}