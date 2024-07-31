import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import TaskCard from "./TaskCard";
function HomePage() {
  const [redirect, setRedirect] = useState("");
  const { user, ready, setUser } = useContext(UserContext);
  const [tasks, setTasks] = useState([{}]);

  const [refresh, setrefresh] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data: response } = await axios.get("/alltasks");
      setTasks(response);
      console.log(tasks);
    }
    fetchData();
    setrefresh(false);
  }, [refresh]);

  async function logout(e) {
    e.preventDefault();
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  function dragstarted(e, id) {
    console.log("drag has started ");
    e.dataTransfer.setData("todoid", id);
  }
  function draggingover(e) {
    e.preventDefault();
    console.log("Dragging over now");
  }

  function dragdropped(e, category) {
    e.preventDefault();
    console.log("you have dropped");
    let todoid = e.dataTransfer.getData("todoid");
    console.log(todoid);

    axios.get(`/task/${todoid}`).then((res) => {
      console.log(res.data);
      createdraguser(res.data._id, category);
    });
    setTimeout(() => {
      setrefresh(true);
    }, 200);
  }
  const updateState = () => {
    setrefresh(true);
  };
  async function createdraguser(id, category) {
    await axios.put(`/task/update/${category}`, {
      id,
    });
  }

  return (
    <div className="">
      <h1 className=" text-center font-bold bg-slate-500 ">Home Page</h1>
      <div className="flex h-full">
        {/*Side bar Left Side*/}

        <div className="flex-grow-0 w-1/4 bg-orange-100 justify-center  ">
          {!!user && (
            <div className="mt-5 ml-10 font-serif ">
              {" "}
              Welcome Back {user.name} :)
            </div>
          )}

          {!!user ? (
            <button className="primary mt-5" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <div className="mt-5 ">
                <Link to="/">Login</Link>
              </div>
            </>
          )}
          <div className="mt-5 text-center">
            <Link
              className="align-middle mt-5 bg-slate-500 rounded-lg "
              to="/createTask/todo"
            >
              Add Task..
            </Link>
          </div>
        </div>
        {/*Right Side Task Showing Panel*/}
        <div className="flex border-solid border-gray-950 flex-grow  bg-slate-700  justify-evenly ">
          <div
            className="border border-solid  w-full"
            droppable
            onDragOver={(e) => draggingover(e)}
            onDrop={(e) => dragdropped(e, "todo")}
          >
            <h2 className="text-center font-bold"> Todo </h2>
            <div className="flex flex-col justify-center items-center">
              <TaskCard
                elem={tasks}
                cate="todo"
                drag={dragstarted}
                change={updateState}
              ></TaskCard>

              <div className="flex justify-center items-center">
                <Link
                  className="align-middle primary mt-2 bg-slate-200"
                  to="/createTask/todo"
                >
                  {" "}
                  <h2>Add New</h2>
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 bg-slate-200 mt-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>{" "}
              </div>
            </div>
          </div>
          <div
            className="border border-solid w-full "
            droppable
            onDragOver={(e) => draggingover(e)}
            onDrop={(e) => dragdropped(e, "inprogress")}
          >
            <h2 className="text-center font-bold"> In-Progress </h2>
            <div className="flex flex-col justify-center items-center">
              <TaskCard
                elem={tasks}
                cate="inprogress"
                drag={dragstarted}
                change={updateState}
              />
              <div className="flex justify-center items-center">
                <Link
                  className="align-middle primary mt-2 bg-slate-200"
                  to="/createTask/inprogress"
                >
                  Add New{" "}
                </Link>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 bg-slate-200 mt-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            className="border border-solid w-full "
            droppable
            onDragOver={(e) => draggingover(e)}
            onDrop={(e) => dragdropped(e, "undereview")}
          >
            {" "}
            <h2 className="text-center font-bold">Under Review </h2>
            <div className="flex flex-col justify-center items-center">
              <TaskCard
                elem={tasks}
                cate="undereview"
                drag={dragstarted}
                change={updateState}
              ></TaskCard>

              <div className="flex justify-center items-center">
                <Link
                  className="align-middle primary mt-2 bg-slate-200"
                  to="/createTask/undereview"
                >
                  Add New{" "}
                </Link>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 bg-slate-200 mt-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            className="border border-solid  w-full"
            droppable
            onDragOver={(e) => draggingover(e)}
            onDrop={(e) => dragdropped(e, "finished")}
          >
            {" "}
            <h2 className="text-center font-bold"> Finished </h2>
            <div className="flex flex-col justify-center items-center">
              <TaskCard
                elem={tasks}
                cate="finished"
                drag={dragstarted}
                change={updateState}
              ></TaskCard>

              <div className="flex justify-center items-center">
                <Link
                  className="align-middle primary mt-2 bg-slate-200"
                  to="/createTask/finished"
                >
                  Add New{" "}
                </Link>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 bg-slate-200 mt-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
