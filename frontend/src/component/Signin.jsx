import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

const Signin = () => {
    const navigate = useNavigate();
    const [signInData,setSignInData] = useState();
    const setValue = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setSignInData({...signInData,[name]:value});
    }
    const signin = () =>{
        console.log(signInData)
        axios.post('/api/signin',signInData)
        .then((res)=>{
            if(res.status == 200){
                navigate('/');
            }
        })
        .catch(()=>{
            Swal.fire({
                title: 'Invalid Credentials',
                width: 600,
                padding: '3em',
                color: 'red',
                background: 'black',
                 confirmButtonColor: 'red' ,
                 confirmButtonText: 'Retry' 
            });
        })
    }
  return (
    <>
          <div class="container-fluid position-relative d-flex p-0">
        <div class="container-fluid">
            <div class="row h-100 align-items-center justify-content-center" style={{"min-height": "100vh"}}>
                <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                    <div class="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <a href="index.html" class="">
                                <h3 class="text-primary"><i class="fa fa-user-edit me-2"></i>DarkPan</h3>
                            </a>
                            <h3>Sign In</h3>
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
                        <button onClick={signin} class="btn btn-primary py-3 w-100 mb-4">Sign In</button>
                        <p class="text-center mb-0">Don't have an Account? <Link to="/signup">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Signin
