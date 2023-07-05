import logo from './logo.svg';
import './App.css';
import SideNavBar from './component/SideNavBar';
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './component/Home';
import UploadVideo from './component/UploadVideo';
import YourVideo from './component/YourVideo';
import Signup from './component/Signup';
import PlayVideo from './component/Video';
import Signin from './component/Signin';
import Results from './component/Results';

function App() {  

  return (
    <>
      <BrowserRouter>
            <Routes> 
              <Route path="/" Component={Home}/>
              <Route path="/upload-video" Component={UploadVideo}/>
              <Route path="/your-video" Component={YourVideo}/>
              <Route path="/signup" Component={Signup}/>
              <Route path="/signin" Component={Signin}/>
              <Route path="/video" Component={PlayVideo}/>
              <Route path="/results" Component={Results}/>
            </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
