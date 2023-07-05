import React, { useEffect, useState } from 'react'
import Header from './Header'
import SideNavBar from './SideNavBar'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SearchCard from './SearchCard'
import Spinner from './Spinner'

function Results() {
    const [videos,setVideos] = useState([]);
    useEffect(() => {
        const currentURL = window.location.href;
        const url = new URL(currentURL);
        const searchParams = new URLSearchParams(url.search);
        const vParam = searchParams.get('search_query');
    
        console.log('Value of "v" parameter:', vParam);
        axios.post("/api/searchvideo",{title:vParam})
        .then((res)=>{
            setVideos(res.data);
            document.querySelector('#spinner').classList.remove('show');
        })
        
      },[]);
    return (
        <>
            <div className="container-fluid position-relative d-flex p-0">
                <Spinner/>
                <SideNavBar />
                <div className="content">
                    <Header />
                    <div className="container-fluid pt-4 px-4">
                    {
                        videos.length == 0?<h1 className='text-primary m-1' style={{"text-align": "center"}}> No results found</h1>:''
                    }
                        {
                            videos.map((e,i)=>{
                                return <SearchCard id={e._id} thumbnail={e.thumbnailURL} title={e.videoTitle} fullname={e.fullname} date={e.time}/>
                            })
                        }
                    </div>
                    <Footer />
                </div>
                <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
                    <i className="bi bi-arrow-up" />
                </a>
            </div>
        </>
    )
}

export default Results
