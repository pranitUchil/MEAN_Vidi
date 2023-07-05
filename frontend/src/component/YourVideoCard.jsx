import React, { useState } from 'react'
import Swal from 'sweetalert2'
import $ from 'jquery'
import axios from 'axios';
import { Link } from 'react-router-dom';

const YourVideoCard = ({ id, title, time, url,description,getVideos }) => {
    // const [video , setVideo] =  useState({thumbnail:"",title:"",description:""});
    // const lodeFile = (event) => {
    //     const file = event.target.files[0];
    //     const name = event.target.name;
    //     const formData = new FormData();
    //     formData.append(name, file);
    //     setVideo({...video,thumbnail:formData});
    //   }
    const editVideo = (id) => {
        Swal.fire({
            title: 'Edit video details',
            html: `
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" value="${title}" name="title"  placeholder="Title">
                    <label for="floatingInput">Set title of the video</label>
                </div>
                <div class="form-floating">
                    <textarea class="form-control" style="overflow:hidden" name="description" placeholder="Leave a description here" id="floatingTextarea">${description}</textarea>
                    <label for="floatingTextarea">Description</label>
                </div>
                <div class="mt-3">
                    <label for="formFile"  class="form-label" style="margin-right: 62%;">Upload Thumbnail </label>
                    <input id="thumbnailfile" class="form-control bg-dark" name="thumbnail" style="width: 95%;margin-left: 12px;" name="thumbnail" type="file" id="formFile">
                </div>
            `,
            color: 'red',
            background: 'black',
            showCancelButton: true,
            confirmButtonText: 'Save',
            confirmButtonColor: 'red',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                let data = {
                    videoTitle:$('#floatingInput').val(),
                    videoDescription:$('#floatingTextarea').val(),
                    thumbnailURL:''
                }
                var formData = new FormData();
                var inpFile = document.getElementById("thumbnailfile");   
                formData.append("thumbnail", inpFile.files[0]);
                data.thumbnailURL = formData
                if($('#thumbnailfile').val() !== ''){
                    await  axios.post('/api/uploadthumbnail',data.thumbnailURL)
                    .then(async (res)=>{
                        if(res.status == 200){
                            console.log(res)
                            data.thumbnailURL = `${res.data.url}.jpg`
                        }
                    });
                    await  axios.put('/api/videos/'+id,data)
                    .then(async (res)=>{
                        if(res.status == 200){
                            console.log(res)
                            getVideos()
                        }
                    });
                }
                else{
                    delete data.thumbnailURL;
                    await  axios.put('/api/videos/'+id,data)
                    .then(async (res)=>{
                        if(res.status == 200){
                            getVideos()
                        }
                    });
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `Video details updated`,
                    color: 'red',
                    background: 'black',
                    confirmButtonColor: 'red',
                })
            }
        })
    }
    const deleteVideo = (id) => {
        Swal.fire({
            title: 'Are you sure you went to delete this video',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            color: 'red',
            background: 'black',
            confirmButtonColor: 'red',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete("/api/videos/"+id)
                .then(()=>{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Video has be deleted',
                        showConfirmButton: false,
                        timer: 1500,
                        color: 'red',
                        background: 'black',
                    });
                    getVideos()
                })
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
    }
    return (
        <>
        
            <div className="row mb-3" >
                <div className="col-lg-3 col-sm-12">
                <Link to={`/video?v=${id}`} style={{"cursor": "pointer"}}>
                    <img className='img-fluid  rounded' src={"/thumbnail/" + url} alt="" />
                </Link>
                </div>
                <div className="col-lg-6 col-sm-12">
                    <h5 className='text-primary m-1' style={{ "fontSize": "1.6rem", "lineHeight": "2.2rem", "fontWeight": "500", "overflow": "hidden", "display": "-webkit-box", "maxHeight": "4.4rem", "WebkitLineClamp": "2", "WebkitBoxOrient": "vertical", "textOverflow": "ellipsis", "whiteSpace": "normal" }}>{title}</h5>
                    <h6 className='text-primary m-1' style={{  "lineHeight": "2.2rem", "fontWeight": "500", "overflow": "hidden", "display": "-webkit-box", "maxHeight": "4.4rem", "WebkitLineClamp": "2", "WebkitBoxOrient": "vertical", "textOverflow": "ellipsis", "whiteSpace": "normal" }}>{description}</h6>
                    <h6 className='text-danger mt-1 ' style={{ "width": "349px", overflow: "hidden", "text-overflow": " ellipsis", "whiteSpace": "nowrap", display: 'inline' }}>{time}</h6>
                </div>
                <div className="col-lg-3 col-sm-12">
                    <button type='button' className="btn btn-outline-info mt-5 mx-3" onClick={() => editVideo(id,title,description)}>Edit</button>
                    <button type='button' className="btn btn-outline-primary mt-5" onClick={() => deleteVideo(id)}>Delete</button>
                </div>
            </div>
        </>
    )
}

export default YourVideoCard
