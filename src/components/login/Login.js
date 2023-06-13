import React from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../slice/loginSlice";
import { useState, useEffect } from "react";

function Login() {
  //state
  let { userObj, loginStatus, errorMessage } = useSelector(
    (state) => state.login
  );
  let [error,setError]=useState("")
  let navigate = useNavigate();
  let dispatch = useDispatch();
  //formik
  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  //   onSubmit: (values) => {
  //     dispatch(userLogin(values));
  //   },
  // });
  //useEffect
  useEffect(() => {
    //check loginstatus
    if (loginStatus == "idle" ) {
      navigate("/login");
    }
    else if (loginStatus === "success") {
      //navigate based on role
   
      if (userObj.roleId === 1) {
        navigate("/admin");
      }
      if (userObj.roleId === 2) {
        navigate("/user");
      }
    }
  }, [loginStatus]);
  return (
    <div className="row">
      <div className="container mt-5 col-md-6 col-lg-7 col-sm-8 col-10">
        <div className="card  text-center shadow p-3 m-3 mt-5 w-75 mx-auto my-auto">
          <div className="card-body ">
            <div className="col-md-10 mx-auto">
              <h5>Login</h5>
              {errorMessage&&<div className="text-danger">{errorMessage}</div>}
              {/* form */}
              <Formik initialValues={{
                email:'',password:''
              }}
              // validations
              validate={
                values=>{
                  const errors={};
                  if(!values.email){
                    errors.email="Required"
                  }
                  else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
                    errors.email="Invalid email address"
                  }
                 
                  if(!values.password){
                    errors.password="Required"
                  }
                  if(values.password.length<3){
                    errors.password="Length Should be atleast 3 characters"
                  }
                  return errors;
                }
          }
          // Submit
          onSubmit={(values,{setSubmitting})=>{
            
            dispatch(userLogin(values));
          }}>
              {({
                values,errors,touched,handleChange,handleSubmit
              })=>(
                <form onSubmit={handleSubmit}>
                
                {/* email */}
                <div className="mt-2">
                  <label htmlFor="email" className="form-label float-start">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    onChange={handleChange}
                    value={values.email}
                  />
                      {errors.email&&touched.email&&<div className="text-danger bold">Email : {errors.email}</div>}
                </div>
                {/* password */}
                <div className="mt-2">
                  <label htmlFor="email" className="form-label float-start">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    onChange={handleChange}
                    value={values.password}
                  />
                   {errors.password&&touched.password&&<div className="text-danger bold">Password : {errors.password}</div>}
                </div>
                {/* login button */}
                <div className="mt-2">
                  <button
                    type="submit"
                    className="btn btn-outline-success me-3 float-end"
                  >
                    Login
                  </button>
                </div>
              </form>
              )}
          </Formik>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
