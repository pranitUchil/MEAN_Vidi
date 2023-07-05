import React, { useEffect, useState } from 'react'
import SideNavBar from './SideNavBar'
import Header from './Header'
import Footer from './Footer'
import Spinner from './Spinner'
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import $ from 'jquery';
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const UploadVideo = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [video, setVideo] = useState({ videoData: "", thumbnailData: "", videoTitle: "", videoDescription: "" });
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(progress)
  }, [progress])

  const lodeFile = (event) => {
    const file = event.target.files[0];
    const name = event.target.name;
    const formData = new FormData();
    formData.append(name, file);
    if (event.target.name == "video") {
      setSelectedVideo(null);
      setTimeout(() => {
        setSelectedVideo(URL.createObjectURL(file));
      }, 1);
      setVideo({ ...video, videoData: formData });
    }
    else {
      setSelectedThumbnail(URL.createObjectURL(file));
      setVideo({ ...video, thumbnailData: formData });
    }
  }
  const setData = (event) =>{
    const value = event.target.value;
    const name = event.target.name;
    setVideo({ ...video, [name]: value });
  }
  const uploadVideo = async (event) => {
    let data = {
      videoTitle: video.videoTitle,
      videoDescription: video.videoDescription,
    }
    let validation = [video.videoData, video.thumbnailData, video.videoTitle, video.videoDescription];
    let isValid = true;
    $.each(validation, (i, e) => {
      if (e == '') {
        console.log(e)
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Plase enter all detail and select files',
          showConfirmButton: false,
          timer: 3000,
          color: 'red',
          background: 'black',
        });
        isValid = false;
      }
    })
    if(isValid){
      Swal.fire({
        title: 'Uploading video please wait',
        html: `
            <div class="form-check">
                            <label id="progress" class="form-check-label" for="gridRadios1">
                </label>
            </div>
        `,
        color: 'red',
        background: 'black',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'red',
        showLoaderOnConfirm: true,
        preConfirm: async () => {

        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
          navigate('/your-video');
        }
    })
      await axios.post('/api/uploadvideo', video.videoData, {
        onUploadProgress: (progressEvent) => {
          
          const uploadProgress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          $('#progress_value').val(uploadProgress);
          $('#progress').html(`${uploadProgress}%`)
          setProgress(uploadProgress);
        },
      })
        .then(async (res) => {
          if (res.status == 200) {
            data.videoURL = `${res.data.url}.mp4`;
          }

        })
      await axios.post('/api/uploadthumbnail', video.thumbnailData)
        .then(async (res) => {
          if (res.status == 200) {
            data.thumbnailURL = `${res.data.url}.jpg`;
          }
        });
      await axios.post('/api/video', data)
        .then(async (res) => {
          if (res.status == 200) {
            
          }
        });
    }
  }
  return (
    <>
      <div className="container-fluid position-relative d-flex p-0">
        <SideNavBar />
        <div className="content">
          <Header />
          <div className="container-fluid pt-4 px-4">
            <div className="row ">
              <div className="col-lg-7 col-sm-12">
                <div className="bg-secondary rounded h-100 p-4">
                  {selectedVideo && <Video loop >
                    <source src={selectedVideo} type="video/mp4" />
                  </Video>}
                  <label for="formFileLg" class="form-label">Upload Video</label>
                  <input id="formFileLg" onChange={lodeFile} name="video" class="form-control form-control-lg bg-dark" type="file" />
                  <div className="row">
                    <div className="col-5">
                      <img class="p-2" height={"200px"} src={selectedThumbnail} alt="" />
                    </div>
                    <div className="col-7">
                      <div class="mt-3">
                        <label for="formFile" class="form-label">Upload Thumbnail </label>
                        <input class="form-control bg-dark" onChange={lodeFile} name="thumbnail" type="file" id="formFile" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-sm-12">
                <div className="bg-secondary rounded h-100 p-4">
                  <div class="form-floating mb-3">
                    <input type="text" onChange={setData} name="videoTitle" class="form-control" id="floatingInput" placeholder="Title" />
                    <label for="floatingInput">Set title of the video</label>
                  </div>
                  <div class="form-floating">
                    <textarea style={{ height: "500px" }} onChange={setData} name="videoDescription" class="form-control" placeholder="Leave a description here" id="floatingTextarea" ></textarea>
                    <label for="floatingTextarea">Description</label>
                  </div>
                  <div class="form-floating">
                    <button className="btn btn-lg btn-primary mt-3" onClick={uploadVideo}>Upload</button>
                  </div>

                </div>
              </div>
            </div>

          </div>
          {/* <div style={{display:"flex",justifyContent:"end"}}>
            <button type="button" class="btn btn-lg btn-primary m-2">Public Video</button>
          </div> */}
          <Footer />
        </div>
        <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
          <i className="bi bi-arrow-up" />
        </a>
      </div>
    </>
  )
}

export default UploadVideo
