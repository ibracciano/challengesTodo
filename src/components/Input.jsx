/* eslint-disable react/prop-types */
// import React from 'react'
import { FaCheck } from "react-icons/fa6";

const Input = ({ task, setTask, handleSubmit, btnClick, isBtnClick }) => {
  // console.log(task)
  return (
    <form className="flex items-center gap-3 px-3 py-2 my-5 bg-white rounded-md dark:bg-slate-950"
      onSubmit={handleSubmit}
    >
      <button
        type="submit"
        className={isBtnClick ? "flex items-center justify-center w-5 h-5 border rounded-full border-slate-400 bg-gradient-to-br from-indigo-700 to-blue-500" : "w-5 h-5 border rounded-full border-slate-400 flex items-center justify-cente"}
        onClick={btnClick}
      >
        {isBtnClick ? <FaCheck size={12} style={{ color: 'white' }} /> : null}
      </button>
      <input
        type="text"
        value={task}
        placeholder="Enter task"
        className="w-full outline-none dark:bg-slate-950 dark:text-white"
        onChange={(e) => setTask(e.target.value)}
      />
    </form>
  );
};

export default Input;
