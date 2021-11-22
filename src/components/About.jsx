import React from 'react'
import { animations } from 'react-animation'

export default function About() {
    return (
        <div className="container">
            <div className="mt-3">
                <h1><b>About me</b></h1>
                <div className="desc" style={{
                    animation:animations.fadeIn
                }}>
                    <p className='mt-5'>Hi, iam Febry Ardiansyah ✋</p>
                    <p>Software engineering student at Institute Teknologi Telkom Purwokerto that currently learning Flutter, NodeJs, and ReactJS.I have a lot of experience building an Android and IOS app using Flutter SDK. I've finished a lots of project related to Flutter, i also familiar using nodejs, reactJs, mongoDB, and Firebase</p>
                </div>
                <div className="skills mt-5" style={{
                    animation:animations.fadeInUp
                }}>
                    <h2>Programming Skills</h2>
                    {/* Flutter */}
                    Flutter
                    <div className="row">
                        <div className="col-md-10">
                            <div class="progress">
                                <div class="progress-bar bg-info" role="progressbar" style={{ width: '90%' }} aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div className="col-md-2 font-monospace">
                            90%
                        </div>
                    </div>
                    {/* react */}
                    NodeJs
                    <div className="row">
                        <div className="col-md-10">
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style={{ width: '70%' }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div className="col-md-2 font-monospace">
                            70%
                        </div>
                    </div>
                    {/* react */}
                    ReactJs
                    <div className="row">
                        <div className="col-md-10">
                            <div class="progress">
                                <div class="progress-bar bg-warning" role="progressbar" style={{ width: '60%' }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div className="col-md-2 font-monospace">
                            60%
                        </div>
                    </div>
                    {/* react */}
                    MongoDB
                    <div className="row">
                        <div className="col-md-10">
                            <div class="progress">
                                <div class="progress-bar bg-danger" role="progressbar" style={{ width: '40%' }} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div className="col-md-2 font-monospace">
                            40%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}