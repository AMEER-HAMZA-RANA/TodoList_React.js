import React, { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  const taskList = tasks.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  const tasksNoun = tasks.length !== 1 ? "tasks" : "task";
  const headingtext = `${tasks.length} ${tasksNoun} remaining`;

  function editTask(id, newName) {
    let editedTaskList  = tasks.map((task) => {
      if (id === task.id) {
        task = { ...task, name: newName };
        return task;
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  return (
    <div className="todoapp stack-large">
      <h1>Todo List</h1>

      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">
        {/* <FilterButton />
        <FilterButton />
        <FilterButton /> */}
      </div>
      
      <h2 id="list-heading">{headingtext}</h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {/* <Todo name='Eat' completed= {true} id='todo-0'/> */}
        {taskList}
      </ul>
    </div>
  );
}

export default App;
