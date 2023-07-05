import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import Spinner from './Spinner'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'

const Login = () => {
    const navigate = useNavigate()
    const [signUpData , setSignUpData] = useState({
        fullname:"",
        email:"",
        password:""
    });
    const setValue = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setSignUpData({...signUpData,[name]:value})
    }
    const signUp = () =>{
        axios.post('/api/signup', signUpData)
          .then(function (response) {
            Swal.fire({
                title: 'Sign Up Success',
                width: 600,
                padding: '3em',
                color: 'red',
                background: 'black',
                 confirmButtonColor: 'red' ,
                 confirmButtonText: 'Sign in' 
            }).then(()=>{
                navigate('/signin')
            })
          })
          .catch(async function (error) {
            if(error.response.data.error.code == 11000){
                Swal.fire({
                    title: 'Email alredy exist',
                    width: 600,
                    padding: '3em',
                    color: 'red',
                    background: 'black',
                     confirmButtonColor: 'red' ,
                     confirmButtonText: 'Retry' 
                })
            }
          });
    }
  return (
    <>
    <div class="container-fluid position-relative d-flex p-0">
        {/* <Spinner/> */}
        <div class="container-fluid">
            <div class="row h-100 align-items-center justify-content-center" style={{"minHeight":"100vh"}}>
                <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                    <div class="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <a href="index.html" class="">
                                <h3 class="text-primary"><i class="fa fa-user-edit me-2"></i>DarkPan</h3>
                            </a>
                            <h3>Sign Up</h3>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" onChange={setValue} class="form-control" name="fullname" placeholder="jhondoe"/>
                            <label for="floatingText">Full name</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="email" onChange={setValue} class="form-control" name="email" placeholder="name@example.com"/>
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div class="form-floating mb-4">
                            <input type="password" onChange={setValue} class="form-control" name="password" placeholder="Password"/>
                            <label for="floatingPassword">Password</label>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                                <label class="form-check-label" for="exampleCheck1">Check me out</label>
                            </div>
                            <a href="">Forgot Password</a>
                        </div>
                        <button onClick={signUp} class="btn btn-primary py-3 w-100 mb-4">Sign Up</button>
                        <p class="text-center mb-0">Already have an Account? <Link to="/signin">Sign In</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login
