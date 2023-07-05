
import React from 'react'
import { Link } from 'react-router-dom'

const VideoCard = ({videoURL,videoTitle,thumbnailURL,fullname,time,id}) => {
  
  return (
    <>
    
       <div className="col-lg-4 col-md-6 col-sm-12 mt-3" style={{cursor:"pointer"}}>
       <Link to={`/video?v=${id}`}>
                <div className="bg-secondary rounded ">
                  <img className='img-fluid  rounded' src={"/thumbnail/"+thumbnailURL} alt="" width={'100%'} style={{height:'201px'}}/>
                  <h5 className='text-primary m-1' style={{"fontSize":"1.6rem","lineHeight":"2.2rem","fontWeight":"500","overflow":"hidden","display":"-webkit-box","maxHeight":"4.4rem","WebkitLineClamp":"2","WebkitBoxOrient":"vertical","textOverflow":"ellipsis","whiteSpace":"normal"}}>{videoTitle}</h5>
                  <h6 className='text-danger m-1' style={{"width":"349px",overflow:"hidden","text-overflow":" ellipsis","whiteSpace": "nowrap",display:'inline'}}>{fullname}</h6>
                  <h6 className='text-danger mt-1 ' style={{"width":"349px",overflow:"hidden","text-overflow":" ellipsis","whiteSpace": "nowrap",display:'inline'}}>on {time}</h6>
                </div>
        </Link>
              </div>
    </>
  )
}

export default VideoCard
