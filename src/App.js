import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import components
import Login from "./components/login/Login";
import SignUp from "./components/sign-up/SignUp";
import RootLayout from "./components/root-layout/RootLayout";
import Admin from "./components/admin/Admin";
import User from "./components/user/User";
import ToDoList from "./components/todo-list/ToDoList";
import AddComment from "./components/add-comment/AddComment";
import UpdateComment from "./components/update-comment/UpdateComment";
import AddToDo from "./components/add-todo/AddToDo";
import AllTasks from "./components/all-tasks/AllTasks";

function App() {
  const browserRouterObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/user",
          element: <User />,
        },
        {
          path: "/todoList",
          element: <ToDoList />,
        },
        {
          path: "/add-comment",
          element: <AddComment />,
        },
        {
          path: "/update-comment",
          element: <UpdateComment />,
        },
        {
          path: "/add-todo",
          element: <AddToDo />,
        },
        {path:"/all-tasks",
      element:<AllTasks/>}
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={browserRouterObj} />
    </div>
  );
}

export default App;
