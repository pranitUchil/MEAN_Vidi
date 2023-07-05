import React from 'react'

const Spinner = () => {
    // Spinner
  // var spinner = function () {
  //   setTimeout(function () {
  //     console.log(document.querySelector('#spinner').length)
      
  //   }, 10);
  // };
  // spinner();
  return (
    <div>
         <div
            id="spinner"
            className=" show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
          >
            <div
              className="spinner-border text-primary"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
    </div>
  )
}

export default Spinner
