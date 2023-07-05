import React from 'react'
import { Link } from 'react-router-dom'

const SearchCard = ({id,thumbnail,title,fullname,date}) => {
    
  return (
    <>
      <Link to={`/video?v=${id}`}>
                            <div className="row">
                                <div className="col-lg-4 col-sm-12 mb-4">
                                    <img className='img-fluid  rounded' style={{ width: "100%" }} src={`/thumbnail/${thumbnail}`} alt="" />
                                </div>
                                <div className="col-lg-8 col-sm-12">
                                    <h2 className='text-primary m-1' style={{  "lineHeight": "2.2rem", "fontWeight": "500", "overflow": "hidden", "display": "-webkit-box", "maxHeight": "4.4rem", "WebkitLineClamp": "2", "WebkitBoxOrient": "vertical", "textOverflow": "ellipsis", "whiteSpace": "normal" }}>{title}</h2>
                                    <h4 className='text-danger m-1' style={{ "width": "349px", overflow: "hidden", "text-overflow": " ellipsis", "whiteSpace": "nowrap", display: 'inline' }}>{fullname}</h4>
                                    <h4 className='text-danger mt-1 ' style={{ "width": "349px", overflow: "hidden", "text-overflow": " ellipsis", "whiteSpace": "nowrap", display: 'inline' }}>on {date}</h4>
                                </div>
                            </div>
                        </Link>
    </>
  )
}

export default SearchCard
