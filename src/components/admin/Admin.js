import React from "react";
import ToDoList from "../todo-list/ToDoList";
import AddToDo from "../add-todo/AddToDo";
import AllTasks from "../all-tasks/AllTasks";
import { useNavigate } from "react-router-dom";

function Admin() {
  let navigate=useNavigate()
  return (
    <div className="container">
      <div className="row">
      <div className="container  col-md-6 col-lg-5 col-sm-8 col-10  ">
        <div className="card   shadow   ">
          <div className="card-body ">
            <div className=" ">
              Get the tasks of all users     
              <button className="btn btn-outline-primary ms-3" onClick={()=>navigate('/all-tasks')}>All Tasks  </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container  col-md-6 col-lg-5 col-sm-8 col-10  ">
        <div className="card   shadow   ">
          <div className="card-body ">
            <div className=" ">
              <AddToDo />
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="row">
          <div className="container">
        <ToDoList />
      </div>
      </div>
    
    </div>

  );
}

export default Admin;
