import React from 'react'

export default function Post() {
    return (
        <div className="container mt-5">
            <div className="row">
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
            </div>
        </div>
    )
}