import React, { useEffect, useState } from 'react'
import SideNavBar from './SideNavBar'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import VideoCard from './VideoCard'
import Spinner from './Spinner'

const Home = () => {
  const [videos,setVideos] = useState([]);
  useEffect(()=>{
    axios.get("/api/videos")
    .then((res)=>{
      setVideos(res.data);
      document.querySelector('#spinner').classList.remove('show');

    })
    .catch((res)=>{
      console.log(res)
    })
  },[])
  return (
    <>
      <div className="container-fluid position-relative d-flex p-0">
        <SideNavBar />
        <div className="content">
          <Header />
          <div className="container-fluid pt-4 px-4">
            <div className="row">
              <Spinner/>
              {
                videos.map((e,i)=>{
                  return <VideoCard videoURL={e.videoURL} videoTitle={e.videoTitle} thumbnailURL={e.thumbnailURL} fullname={e.fullname} time={e.time} id={e._id}/>
                })
              }
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

export default Home
