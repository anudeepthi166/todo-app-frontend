import React, { useEffect } from "react";
//imports
import { useSelector } from "react-redux";
import { deleteTodo } from "../../slice/toDoSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ToDoList() {
  //navigate
  let navigate = useNavigate();
  //state
  let { userObj, loginStatus, errorMessage } = useSelector(
    (state) => state.login
  );

  let [completed,setCompleted]=useState()
  let [tasks, setTasks] = useState([]);
  //useEffect
  useEffect(() => {
    const fetchData = async () => {
      //get the token
      let token = sessionStorage.getItem("token");

      //check the role
      try {
        //make admin api request
        let response = await axios.get(
          `http://localhost:5000/task/allTasks/${userObj.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.data?.payload) {
          setTasks(response.data.payload);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [loginStatus]);

  //navigate to add comment
  const navigateToAddComment = (taskId, taskName) => {
    navigate("/add-comment", {
      state: {
        taskId: taskId,
        taskName: taskName,
      },
    });
  };

  //navigate to update comment
  const navigateToUpdateComment = (id, comment, taskName) => {
    navigate("/update-comment", {
      state: {
        commentId: id,
        comment: comment,
        taskName: taskName,
      },
    });
  };

  //complete task
  const completeTask=async(id)=>{
    
    // //get the token
    let token = sessionStorage.getItem("token");

    try {
      let response = await axios.put(
        `http://localhost:5000/task/completedTask/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response.status===200){
       //navigate to dashboard
    if(userObj.roleId===2){
      navigate("/user")

    }
    else{
      navigate("/admin")
    }}
    } catch (err) {
      console.log(err.message);
    }
  

  }

  return (
    <div className="container mt-5">
      {/* table to display tasks */}
      <table className="table shadow">
        {/* thead */}
        <thead>
          <tr className="text-center ">
            <th>taskName</th>
            <th>Added On</th>
            <th>Added At</th>

            <th>Mark Completed</th>
            <th>Comment</th>
          </tr>
        </thead>
        {/* table body */}
        <tbody>
          {tasks?.map((taskObj, index) => {
            let date = taskObj.createdAt.split("T");
            let addedTime = date[1].split(".");

            return (
              <tr key={index}>
                <td>
                  {taskObj.taskName} {/* edit icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </td>
                <td>{date[0]}</td>
                <td>{addedTime[0]}</td>

                <td>
                  {/* check */}
               { taskObj.status===false?<div className="" onClick={()=>completeTask(taskObj.id)}><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="34"
                    fill="currentColor"
                    className="bi bi-check-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
                  </svg></div>:<div className="text-success"><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="34"
                    fill="currentColor"
                    className="bi bi-check-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
                  </svg></div>}
                  
                </td>
                <td
                  onClick={() =>
                    taskObj.Comment?.comment
                      ? navigateToUpdateComment(
                          taskObj.Comment.id,
                          taskObj.Comment.comment,
                          taskObj.taskName
                        )
                      : navigateToAddComment(taskObj.id, taskObj.taskName)
                  }
                >
                  {taskObj.Comment?.comment ? (
                    taskObj.Comment?.comment
                  ) : (
                    <span className="text-danger">No Comments added </span>
                  )}{" "}
                  {/* add comment */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-pen-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                  </svg>
                </td>
                {/* <td>{taskObj.id}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    // <div className="container mt-5">
    //   <h3>To do List</h3>
    //   <div className="mt-3">
    //     {/* table to display data */}
    //     <table className="table text-center">
    //       <thead></thead>
    //       <tbody>
    //         {/* count of tasks */}
    //         <p className="text-danger ">Hey You have {todo.length} Tasks</p>
    //         {todo.length ? (
    //           todo.map((todoObj, index) => {
    //             return (
    //               // task name
    //               <tr key={index}>
    //                 <td>{todoObj.todo}</td>
    //                 <td>
    //                   {/* completed button */}
    //                   <button
    //                     className="btn btn-outline-warning"
    //                     onClick={() => deleteTask(index)}
    //                   >
    //                     {" "}
    //                     completed
    //                   </button>
    //                 </td>
    //               </tr>
    //             );
    //           })
    //         ) : (
    //           <p className="text-danger "> You haven't Added any Tasks</p>
    //         )}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
}
export default ToDoList;
