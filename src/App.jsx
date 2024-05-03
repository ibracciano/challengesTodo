// import React from 'react'
import { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import Input from "./components/Input";

import { v4 as uuidv4 } from "uuid";
import TaskList from "./components/TaskList";

const App = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  const [active, setActive] = useState("all");
  const [stateItem, setStateItem] = useState(false);
  const [task, setTask] = useState("");
  const [isBtnClick, setIsBtnClick] = useState(false);
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tab")) || []
  );
  const [showTasks, setShowTasks] = useState([]);
  const [idNew, setIdNew] = useState(0);

  function toggleDarkMode() {
    setDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (task) {
      if (idNew) {
        const update = showTasks.map((item) => {
          return item.id === idNew
            ? {
                id: item.id,
                name: task,
                isCompleted: item.isCompleted,
              }
            : {
                id: item.id,
                name: item.name,
                isCompleted: item.isCompleted,
              };
        });
        setShowTasks(update);
        setTasks(update);
        setIdNew(0);
        setTask("");
      } else {
        setTasks([...tasks, { id: uuidv4(), name: task, isCompleted: false }]);
      }
      setIsBtnClick(false);
      setTask("");
    }
  }

  useEffect(() => {
    setShowTasks(tasks);
    localStorage.setItem("tab", JSON.stringify(tasks));
  }, [tasks]);

  function btnClick() {
    setIsBtnClick(!isBtnClick);
  }

  function deleteItem(id) {
    const newTasks = tasks.filter((item) => item.id !== id);
    setTasks(newTasks);
  }

  function clearAll() {
    setTasks([]);
  }

  function activeBtn() {
    setActive("active");
    const newTasks = tasks.filter((item) => item.isCompleted === false);
    setShowTasks(newTasks);
  }

  function completedBtn() {
    setActive("completed");
    const newTasks = tasks.filter((item) => item.isCompleted === true);
    setShowTasks(newTasks);
  }

  function allBtn() {
    setActive("all");
    setShowTasks(tasks);
  }

  function checked(id) {
    // console.log(id);
    const item = tasks.find((item) => item.id === id);
    setStateItem(!stateItem);
    item.isCompleted = !item.isCompleted;
    // console.log(stateItem);
    // console.log(item);
  }

  function clearCompleted() {
    const newTasks = tasks.filter((item) => item.isCompleted === false);
    setTasks(newTasks);
  }

  function modifyTask(id) {
    setIdNew(id);
    const taskSelected = tasks.find((item) => item.id === id);
    setTask(taskSelected.name);
    // console.log(task);
  }

  return (
    <div className="bg-[url('./assets/bg-mobile-light.jpg')] dark:bg-[url('./assets/bg-mobile-dark.jpg')] dark:md:bg-[url('./assets/bg-desktop-dark.jpg')] bg-no-repeat bg-contain md:bg-[url('./assets/bg-desktop-light.jpg')] dark:bg-black h-screen flex justify-center py-10 md:py-16 lg:py-20">
      <div className="w-[90%] mx-auto md:w-[70%] lg:w-[50%]">
        <header className="flex justify-between">
          <h1 className="text-3xl font-semibold tracking-widest text-white">
            TODO
          </h1>
          <DarkModeSwitch
            checked={isDarkMode}
            onClick={toggleDarkMode}
            size={40}
          />
        </header>
        <main>
          <Input
            task={task}
            setTask={setTask}
            handleSubmit={handleSubmit}
            btnClick={btnClick}
            isBtnClick={isBtnClick}
          />
          <TaskList
            tasks={tasks}
            deleteItem={deleteItem}
            clearAll={clearAll}
            setActive={setActive}
            active={active}
            checked={checked}
            clearCompleted={clearCompleted}
            activeBtn={activeBtn}
            completedBtn={completedBtn}
            allBtn={allBtn}
            showTasks={showTasks}
            modifyTask={modifyTask}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
