import React from "react";
import AddToDo from "../add-todo/AddToDo";
import ToDoList from "../todo-list/ToDoList";

function User() {
  
  return (
    <div className="row">
      <div className="container  col-md-6 col-lg-5 col-sm-8 col-10  ">
        <div className="card   shadow   ">
          <div className="card-body ">
            <div className=" ">
              <AddToDo />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <ToDoList />
      </div>
    </div>
  );
}

export default User;
