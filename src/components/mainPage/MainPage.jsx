import React, { useEffect, useState } from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [todoList, setTodoList] = useState([
    { id: null, title: "", noteList: [] },
  ]);
  const [selectIndex, setSelectIndex] = useState(-1);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodoList(storedTodos);
  }, []);

  const addTodo = (evt) => {
    evt.preventDefault();

    const { todoItem } = evt.target.elements;
    const newTodo = {
      id: todoList[todoList.length - 1]?.id + 1 || 1,
      title: todoItem.value,
      noteList: [],
    };

    if (selectIndex >= 0) {
      todoList[selectIndex] = newTodo;
      setSelectIndex(-1);
    } else {
      todoList.push(newTodo);
    }
    setTodoList([...todoList]);
    evt.target.reset();

    localStorage.setItem("todos", JSON.stringify(todoList));
  };

  const deleteTodo = (index) => {
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(index, 1);
    setTodoList(updatedTodoList);
    localStorage.setItem("todos", JSON.stringify(updatedTodoList));
  };

  const editTodo = (index) => {
    setSelectIndex(index);
  };

  return (
    <div>
      <div className="row mt-5">
        <div className="container">
          <div className="col-6 mx-auto">
            <div className="card">
              <div className="card-header">
                <h1 className="todo-title text-center py-1">Todo App</h1>
              </div>
              <div className="card-body">
                <form onSubmit={(evt) => addTodo(evt)}>
                  <div className="input-group">
                    <input
                      className="form-control"
                      name="todoItem"
                      type="text"
                      placeholder="Write new note..."
                      defaultValue={todoList[selectIndex]?.title}
                    />
                    <button className="btn btn-success" type="submit">
                      Add
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer">
                <ul className="todo-list d-flex  flex-column gap-3 py-2">
                  {todoList.map((todo, index) => (
                    <li
                      className="d-flex align-items-center justify-content-between  w-100"
                      key={index}
                    >
                      <Link
                        to={`/note-page/${todo.id}`}
                        className="d-flex align-items-center justify-content-between w-100"
                      >
                        <p className="todo-title fw-bold">
                          <span className="me-3">{index + 1}.</span>
                          {todo.title}
                        </p>
                      </Link>

                      <div className="btns d-flex pe-3  gap-3">
                        <button
                          className="btn btn-info"
                          onClick={() => editTodo(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteTodo(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
