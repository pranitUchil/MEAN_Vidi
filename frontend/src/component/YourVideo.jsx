import React, { useEffect, useState } from 'react'
import SideNavBar from './SideNavBar'
import Header from './Header'
import Footer from './Footer'
import Spinner from './Spinner'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import YourVideoCard from './YourVideoCard'

const YourVideo = () => {
  const [videos , setVideos] = useState([]);
  const getVideos = () =>{
    axios.get("/api/uservideos")
    .then((res)=>{
      setVideos(res.data.reverse());
      document.querySelector('#spinner').classList.remove('show');
    })
  }
  useEffect(()=>{
    getVideos()
  },[])

  return (
    <>
     <div className="container-fluid position-relative d-flex p-0">
     <Spinner/>
          <SideNavBar />
          <div className="content">
            <Header />
              <div className="container-fluid pt-4 px-4">
              {
                        videos.length == 0?<h1 className='text-primary m-1' style={{"text-align": "center"}}> No video available</h1>:''
                    }
                {
                  videos.map((e,i)=>{
                    return <YourVideoCard id={e._id} title={e.videoTitle} time={e.time} url={e.thumbnailURL} description={e.videoDescription} getVideos={getVideos}/>
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

export default YourVideo
