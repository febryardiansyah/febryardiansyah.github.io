import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'

export default function NavBar() {
    return (
        <header>
            <nav className="navbar navbar-light navbar-expand-lg scrolling-navbar">
                <div className="container navbar-nav">
                    <NavLink activeClassName="" to="/" index className="navbar-brand item">
                        <img src="/assets/logo.svg" alt="" width="24" height="24" class="d-inline-block align-text-top me-2" />
                        febryardiansyah</NavLink>
                    <div className="d-flex nav-item ">
                        <NavLink activeClassName="" to="/posts" className="nav-link item">Blog</NavLink>
                        <NavLink activeClassName="" to="/projects" className="nav-link item">Projects</NavLink>
                        <NavLink activeClassName="" to="/about" className="nav-link item">About me</NavLink>
                    </div>
                </div>
            </nav>
        </header>
    )
}