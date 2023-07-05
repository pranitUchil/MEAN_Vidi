import React, { useEffect, useRef, useState } from 'react'
import SideNavBar from './SideNavBar'
import Header from './Header'
import Footer from './Footer'
import {DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import axios from 'axios';
import Spinner from './Spinner';

const PlayVideo = () => {
    let [video,setVideo] = useState({});
    let [active , setActive] = useState(false)
    useEffect(() => {
        const currentURL = window.location.href;
        const url = new URL(currentURL);
        const searchParams = new URLSearchParams(url.search);
        const vParam = searchParams.get('v');
    
        console.log('Value of "v" parameter:', vParam);
        axios.get("/api/videos/"+vParam)
        .then((res)=>{
            setVideo(res.data);
            document.querySelector('#spinner').classList.remove('show');
            setActive(true);
        })
      },[]);
    useEffect(()=>{
          var sidebar = document.querySelector('.sidebar');
          var content = document.querySelector('.content');
          sidebar.classList.toggle('open');
          content.classList.toggle('open');

      },[])
    return (
        <>
            <div className="container-fluid position-relative d-flex p-0">
            <Spinner/>
                <SideNavBar />
                <div className="content">
                    <Header />
                    <div className='bg-secondary text-center rounded p-3 m-2'>
                        <div className="row">
                            <div className="col-lg-8 col-sm-12">
                                {active &&
                                    <Video  autoPlay loop >
                                        <source src={`/videos/${video.videoURL}`} type="video/mp4" />
                                    </Video>
                                }
                            </div>
                            <div className="col-lg-4 col-sm-12">
                                <h3 className='text-primary' style={{"textAlign":" left"}}>{video.videoTitle}</h3>
                                <h6 className='text-danger'  style={{"textAlign":" left"}}>Description</h6>
                                <p className='text-light' style={{"textAlign":" left"}}>
                                    {video.videoDescription}
                                </p>
                            </div>
                        </div>
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

export default PlayVideo
