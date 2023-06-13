import React, { useEffect } from "react";
//import react-hook-form
import { useForm } from "react-hook-form";

import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Formik } from "formik";

function AddToDo() {
  //state
  let { userObj } = useSelector(
    (state) => state.login
  );
  //useForm hook
  let { register } = useForm();

  let [success,setSuccess]=useState(false)
  let [error,setError]=useState("")

  //submit
  // const onSubmit = async (taskObj) => {
 
  // };
useEffect(()=>{
  setSuccess(false)
 
},[success])

//setTimeout
setTimeout(() => {
  setError("")
}, 10000);
  return (
    <div className="container ">
      <div className=" ">
        {/* input form to enter task*/}
        {error&&<div className="text-danger mb-3">{error}</div>}
        <Formik initialValues={{
                taskName:''
              }}
              // validations
              validate={
                values=>{
                  const errors={};
                  if(!values.taskName){
                    errors.taskName="Required"
                  }
                 
                  return errors;
                }
          }
          // Submit
          onSubmit={async(values,{setSubmitting})=>{
              
            //add user details
                  values.userId = userObj.id;
                  values.userEmail=userObj.email
   console.log(values)

               // //get the token
                let token = sessionStorage.getItem("token");

                try {
             let response = await axios.post(
             `http://localhost:5000/task/${values.todo}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
   
      if(!response.data.payload){
      setError(response.data.message)
    }
      setSuccess(true)
    } catch (err) {
      setError(err.message)

    }
          
          }}>
              {({
                values,errors,touched,handleChange,handleSubmit
              })=>(
                <form onSubmit={handleSubmit}>
                {/* add new task */}
                <div className="row">
                  <div className="col-md-8">
                    {" "}
                    <input
                      type="text"
                      {...register("taskName")}
                      className="form-control"
                      placeholder="Enter New Task Here ..."
                      value={values.taskName}
                      onChange={handleChange}
                    />
                  </div>
      
                  <div className="col-md-4">
                    <button
                      className="btn btn-outline-success float-end  "
                      type="submit"
                    >
                      Add Task
                    </button>
                  </div>
                  {errors.taskName&&touched.taskName&&<div className="text-danger bold">Task name : {errors.taskName}</div>}
                </div>
                {/* submit button */}
              </form>
              )}
          </Formik>
     
      </div>
    </div>
  );
}

export default AddToDo;
