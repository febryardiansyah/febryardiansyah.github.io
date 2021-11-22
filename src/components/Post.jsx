import React, { useEffect, useState } from 'react'
import FadeIn from 'react-fade-in';
import { Link } from 'react-router-dom';
import sanityClient from '../client'


export default function Post() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        sanityClient.fetch(`*[_type == "post"]{
            _id,
            title,
            slug,
            body,
            publishedAt,
            "categories":categories[]{
                _type == 'reference' => @->,
                _type != 'reference' => @,
            },
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
                Loading..
            </div>
        )
    }
    return (
        <div className="container mt-5">
            <FadeIn>
                <div className="row">
                    {
                        data && data.map(post => (
                            <div className="col-md-6 mb-3">
                                <Link to={`/post/${post.slug.current}`} className="link" key={post.slug.current} style={{
                                    color: 'black',
                                    textDecoration: 'none',
                                }}>
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title"><b>{post.title}</b></h4>
                                            {
                                                post.categories && post.categories.map(c => (
                                                    <div className="badge bg-secondary me-1">{c.title}</div>
                                                ))
                                            }
                                            <p class="card-text">{
                                                post.body[0].children[0].text.length > 120?
                                                `${post.body[0].children[0].text.substring(0, 120)}..`:
                                                post.body[0].children[0].text
                                            }</p>
                                        </div>
                                        <div class="card-footer text-muted font-monospace">
                                            {new Date(post.publishedAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
                {/* <div className="row">
                    <div className="col-md-6">
                        <a href="">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title"><b>Card title</b></h4>
                                    <div className="badge bg-secondary">Flutter</div>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <div class="card-footer text-muted">
                                    2 days ago
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-6">
                        <a href="">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title"><b>Card title</b></h4>
                                    <div className="badge bg-secondary">Flutter</div>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <div class="card-footer text-muted">
                                    2 days ago
                                </div>
                            </div>
                        </a>
                    </div>
                </div> */}
            </FadeIn>
        </div>
    )
}