import React from 'react'
import './home.css'
import { animations } from 'react-animation'

export default function Home() {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center mt-5" style={{
            height: 'calc(100vh - 110px)',

        }}>
            <div className="row">
                <div className="col-md-8">
                    <h1 style={{
                        animation:animations.fadeInUp
                    }}>hello, i’m</h1>
                    <div style={{
                        color:'#EB5757',
                        fontSize:'80px',
                        fontWeight:'bold',
                        animation:animations.fadeInUp
                    }}>Febry Ardiansyah</div>
                    <h4 style={{
                        animation:animations.fadeInUp
                    }}>Software engineering student at Institute Teknologi Telkom Purwokerto that currently learning Flutter, NodeJs, and ReactJS.</h4>
                    <div>
                        <div className="social-icon text-center mt-5 mb-3" style={{
                            animation:animations.slideIn
                        }}>
                            <a href="https://github.com/febryardiansyah" className="link-secondary"><i className="fab fa-github me-2"> </i></a> 
                            <a href="https://instagram.com/febry_ardiansyah24" className="link-secondary"><i className="fab fa-instagram me-2"></i></a>
                            <a href="mailto:febryardiansyah27@gmail.com" className="link-secondary"><i className="far fa-envelope me-2"></i></a>
                            <a href="https://twitter.com/febryar69" className="link-secondary"><i className="fab fa-twitter me-2"></i></a>
                            <a href="https://www.linkedin.com/in/febry-ardiansyah-a4b580170/" className="link-secondary"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-center">
                    <img src="/assets/me2.jpeg" alt="" className='rounded-circle' style={{
                        width:'370px',height:'370px',objectFit:'cover',
                        animation:animations.bounceIn
                    }}/>
                </div>
            </div>
        </div>
    )
}