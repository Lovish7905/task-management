import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, Link, useParams } from "react-router-dom";
function EditPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [redirect, setRedirect] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/task/edit/" + id).then((response) => {
      const { data } = response;

      setTitle(data.title);
      setDescription(data.description);
      setStatus(data.status);
      setPriority(data.priority);
      setDeadline(data.deadline);
    });
  }, [id]);

  async function handleform(e) {
    e.preventDefault();
    const taskdata = {
      title,
      description,
      status,
      priority,
      deadline,
    };
    if (id) {
      //update the form
      const res = await axios.put(`/tasks/${id}`, {
        id,
        ...taskdata,
      });
    }

    setRedirect("/home");
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
  <div className="flex justify-center">
      <Link
        to="/home"
        className="absolute right-70 top-0  bottom-0 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </Link>

      <div className="flex  items-center justify-center flex-col w-2/4 h-screen bg-gray-200 rounded-2xl">
        <form onSubmit={handleform}>
        
           <h2 className="font-bold gap-2">Edit Your Task</h2>
        <div className="gap-3">
          <input
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Add Title"
          />
        </div>
        <div className="gap-3">
          <textarea
            className="w-full"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Add Description"
          />
        </div>
        <div className="gap-3">
          <input
            type="text"
            placeholder="Add Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />{" "}
        </div>
        <div className="gap-3">
          <input
            type="text"
            value={priority}
            placeholder=" add priority like low,medium,urgent"
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>
        <div className="gap-3">
          <span>Add Deadline : </span>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        <button className="primary1 mt-5">
          Edit Task
        </button>
        
        </form>
     
      </div>
    </div>
  );
}

export default EditPage;
