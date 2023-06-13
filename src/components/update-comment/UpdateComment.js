import React from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdateComment() {
  //state
  let { state } = useLocation();

  let { userObj, loginStatus, errorMessage } = useSelector(
    (state) => state.login
  );

  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  //state for modal
  let [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
    //navigate to dashboard
    if(userObj.roleId===2){
      navigate("/user")

    }
    else{
      navigate("/admin")
    }
  };

  //onFormSubmit
  const onSubmit = async (commentObj) => {
    // make api call
    // delete taskName
    delete commentObj.taskName;

    try {
      //get the token
      let token = sessionStorage.getItem("token");
      let response = await axios.put(
        `http://localhost:5000/comment/${state.commentId}`,
        commentObj,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //navigate to dashboard
      if(userObj.roleId===2){
        navigate("/user")

      }
      else{
        navigate("/admin")
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  //useEffect
  useEffect(() => {
    setValue("taskName", state.taskName);
    setValue("comment", state.comment);
  }, []);
  return (
    <div>
      {/* MODAL */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment to task</Modal.Title>{" "}
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* taskName */}
            <label htmlFor="taskName" className="form-label">
              Task name
            </label>
            <input
              type="text"
              disabled
              {...register("taskName")}
              className="form-control"
            />
            {/* comment */}
            <label htmlFor="comment" className="form-label">
              Comment
            </label>
            <input
              type="text"
              {...register("comment")}
              className="form-control"
            />
            <button
              className="btn btn-outline-success float-end mt-3"
              type="submit"
            >
              Update Comment
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-outline-warning" onClick={closeModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UpdateComment;
