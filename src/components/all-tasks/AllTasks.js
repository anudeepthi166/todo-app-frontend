import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AllTasks() {
   //navigate
   let navigate = useNavigate();
   //state
   let { userObj, loginStatus, errorMessage } = useSelector(
     (state) => state.login
   );

   let [allTasks,setAllTasks]=useState([])
  useEffect(() => {
    const fetchData = async () => {
      //get the token
      let token = sessionStorage.getItem("token");

      //check the role
      try {
        //make admin api request
        let response = await axios.get(
          `http://localhost:5000/admin/allTasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      if(response.data.payload){
        setAllTasks(response.data.payload)
      }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [loginStatus]);
  return <div className="container">
    <h5>All Tasks</h5>
    <table className="table shadow mt-3">
      <thead>
        <tr>
          <th>user name</th>
          <th>Task name</th>
          <th>status</th>
        </tr>
      </thead>
      <tbody>{allTasks?.map((taskObj,index)=><tr key={index}>
        <td>{taskObj.User.userName}</td>
        <td>{taskObj.taskName}</td>
        <td>{taskObj.status===false?<div className="text-warning">Not Completed</div>:<div className="text-success">Completed</div>}</td>
      </tr>)}</tbody>
    </table>
    <div className="float-end" >
<button className="btn btn-outline-primary" onClick={()=>navigate('/admin')}>Dashboard</button>
    </div>
  </div>;
}

export default AllTasks;
