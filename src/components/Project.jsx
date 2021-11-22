import React, { useEffect, useState } from 'react'
import './project.css'
import FadeIn from 'react-fade-in';
import sanityClient from '../client'

export default function Project() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        sanityClient.fetch(`*[_type == "project"]{
            title,
            description,
            publishedAt,
            link,
            tags,
            mainImage{
                asset->{
                    _id,
                    url
                },
                alt
            }
        }`).then(res => {
            setLoading(false)
            setData(res)
        })
            .catch(err => console.log(err.responseBody))
    }, [])

    console.log(data);
    if (loading) {
        return (
            <div className="container">
                Loading...
            </div>
        )
    }
    return (
        <div className="container mt-5">
            <FadeIn>
                <div className="row">
                    {
                        data && data.map(project => (
                            <div className="col-md-6">
                                <a href={project.link}>
                                    <div class="card mb-3">
                                        <img src={project.mainImage.asset.url} class="card-img-top" alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title"><b>{project.title}</b></h5>
                                            <p class="card-text">{project.description}</p>
                                            {
                                                project.tags.map(tag =>(
                                                    <div className="card d-inline p-2 me-2 mt-2">{tag}</div>
                                                ))
                                            }
                                            <p class="card-text mt-4"><small class="text-muted">{new Date(project.publishedAt).toLocaleDateString()}</small></p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))
                    }
                </div>
                {/* <div className="row">
                    <div className="col-md-6">
                        <a href="">
                            <div class="card" >
                                <div className="row">
                                    <div className="col-md-4">
                                        <img src="https://storage.googleapis.com/cms-storage-bucket/70760bf1e88b184bb1bc.png" class="card-img-top" alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title"><b>Card title</b></h5>
                                            <p class="card-text">Nimeflix is an mobile application for streamin and download Anime subtitle Bahasa Indonesia</p>
                                            <div className="">
                                                <div className="card d-inline p-2 me-2">Flutter</div>
                                                <div className="card d-inline p-2">Flutter</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-6">
                        <a href="">
                            <div class="card" >
                                <div className="row">
                                    <div className="col-md-4">
                                        <img src="https://storage.googleapis.com/cms-storage-bucket/70760bf1e88b184bb1bc.png" class="card-img-top" alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title"><b>Card title</b></h5>
                                            <p class="card-text">Nimeflix is an mobile application for streamin and download Anime subtitle Bahasa Indonesia</p>
                                            <div className="">
                                                <div className="card d-inline p-2 me-2">Flutter</div>
                                                <div className="card d-inline p-2">Flutter</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div> */}
            </FadeIn>
        </div>
    )
}