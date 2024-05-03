/* eslint-disable react/prop-types */
// import React from 'react'
import { RxCross1 } from "react-icons/rx";
import { MdEditNote } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

const TaskList = ({
  deleteItem,
  clearAll,
  active,
  checked,
  clearCompleted,
  activeBtn,
  completedBtn,
  allBtn,
  showTasks,
  modifyTask,
}) => {
  const todos = showTasks.filter((item) => item.isCompleted === false);
  return (
    <div>
      {/* div des taches */}
      <div className="bg-white rounded-md dark:bg-slate-950 dark:text-white">
        {showTasks.map((task) => (
          <div
            className="flex items-center justify-between px-3 py-2 border-b border-slate-400"
            key={task.id}
          >
            <div className="flex items-center gap-4">
              <button
                className={`flex items-center justify-center w-5 h-5 border rounded-full border-slate-400 ${
                  task.isCompleted
                    ? "bg-gradient-to-br from-indigo-700 to-blue-500"
                    : ""
                }`}
                onClick={() => checked(task.id)}
              >
                {task.isCompleted ? (
                  <FaCheck size={12} style={{ color: "white" }} />
                ) : null}
              </button>
              <p className={task.isCompleted ? "text-slate-300" : ""}>
                {task.isCompleted ? <del>{task.name} </del> : task.name}{" "}
              </p>
            </div>
            <div className="flex flex-row-reverse items-center gap-2">
              <RxCross1
                style={{ color: "red" }}
                onClick={() => deleteItem(task.id)}
              />
              <MdEditNote
                size={25}
                style={{ color: "green" }}
                onClick={() => modifyTask(task.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* div des informations supp */}
      <div className="flex flex-col gap-5 bg-white md:flex-row md:justify-between md:gap-0 dark:bg-slate-950 dark:text-white md:shadow-lg">
        <div className="flex md:justify-start md:gap-5 justify-between items-center shadow-lg md:shadow-none py-2 px-3 md:w-[60%]">
          <span className="text-[12px]">
            {todos.length > 1
              ? `${todos.length} items left`
              : `${todos.length} item left`}{" "}
          </span>
          <button
            className="text-[12px] hover:text-gray-300 dark:hover:text-gray-600"
            onClick={clearCompleted}
          >
            {" "}
            Clear Completed
          </button>
          <button
            className="text-[12px] hover:text-gray-300 dark:hover:text-gray-600"
            onClick={clearAll}
          >
            {" "}
            Clear All
          </button>
        </div>

        <div className="flex justify-center md:justify-end gap-4 shadow-lg md:shadow-none py-2 px-3 border-t border-slate-100 md:border-none dark:border-slate-400 dark:md:border-none md:w-[40%]">
          <button
            // onClick={() => setActive("all")}
            onClick={allBtn}
            className={active === "all" ? "text-blue-600 font-semibold" : ""}
          >
            All
          </button>
          <button
            onClick={activeBtn}
            className={active === "active" ? "text-blue-600 font-semibold" : ""}
          >
            Active
          </button>
          <button
            onClick={completedBtn}
            className={
              active === "completed" ? "text-blue-600 font-semibold" : ""
            }
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
