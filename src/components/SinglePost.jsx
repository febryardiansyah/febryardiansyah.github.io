import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import sanityClient from '../client'
import BlockContent from '@sanity/block-content-to-react'

export default function SinglePost() {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const { slug } = useParams();
    useEffect(() => {
        setLoading(true)
        sanityClient.fetch(`*[slug.current == "${slug}"]{
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
        }`).then(data => {
            setLoading(false);
            setData(data[0])
        })
            .catch(err => console.log(err))
    }, {})
    console.log(data);
    if (loading) {
        return <div className="container">Loading..</div>
    }
    return (
        <article>
            <div className="container mt-5">
                <h1>{data.title}</h1>
                <div className="text-muted">{data.publishedAt}</div>
                <span className='d-flex mt-2'>
                    <div className="text-muted">Categories : </div>
                    {
                        data.categories && data.categories.map(c => (
                            <div className="badge bg-secondary me-1">{c.title}</div>
                        ))
                    }
                </span>
                <div className="mt-5">
                    <BlockContent blocks={data.body} projectId='wdc0uzak' dataset='production'/>
                </div>
            </div>
        </article>
    )
}
