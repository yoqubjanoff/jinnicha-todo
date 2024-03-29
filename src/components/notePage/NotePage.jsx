import React, { useEffect, useState } from "react";
import "./NotePage.css";
import { useNavigate, useParams } from "react-router-dom";

const NotePage = () => {
  const [tempState, setTempState] = useState([]);
  const [selectIndex, setSelectIndex] = useState(-1);
  const [changeTile, setChangeTile] = useState("");
  const [isChangesSaved, setIsChangesSaved] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const selectedTodo = storedTodos.find((todo) => todo.id === parseInt(id));
    setTempState(selectedTodo.noteList);
    setChangeTile(selectedTodo.title);
  }, [id]);

  const addNote = async (evt) => {
    evt.preventDefault();
  
    const { todoItem } = evt.target.elements;
  
    if (todoItem.value.trim() !== "") {
      const newNote = {
        id: tempState[tempState.length - 1]?.id + 1 || 1,
        title: todoItem.value,
        isCompleted: false,
      };
  
      if (selectIndex >= 0) {
        const updatedNoteList = [...tempState];
        updatedNoteList[selectIndex] = newNote;
        setSelectIndex(-1);
        setTempState(updatedNoteList);
      } else {
        setTempState((prevTempState) => [...prevTempState, newNote]);
      }
  
      evt.target.reset();
  
      if (!isChangesSaved) {
        const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        const updatedTodos = storedTodos.map((todo) => {
          if (todo.id === parseInt(id)) {
            return {
              ...todo,
              noteList: tempState,
            };
          }
          return todo;
        });
  
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setIsChangesSaved(true);
        setIsEditing(false);
      }
    } else {
      alert("Please enter a non-empty todo item.");
    }
  };
  

  const deleteNote = (index) => {
    const updatedNoteList = [...tempState];
    updatedNoteList.splice(index, 1);
    setTempState(updatedNoteList);
    setIsChangesSaved(false);
  };

  const editNote = (index) => {
    setSelectIndex(index);
    setIsChangesSaved(false);
    setIsEditing(true);
  };

  const handleCheckTodo = (evt) => {
    const todoId = evt.target.dataset.todoId;
    const findIndexTodo = tempState.findIndex((todo) => todo.id == todoId);
    tempState[findIndexTodo].isCompleted =
      !tempState[findIndexTodo].isCompleted;
    setTempState([...tempState]);
    setIsChangesSaved(false);
  };

  const handleDeleteClick = () => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

    const updatedTodos = storedTodos.filter((todo) => todo.id !== parseInt(id));
  
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setIsChangesSaved(false);
    navigate("/");

  };
  

  const handleSaveClick = () => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTodos = storedTodos.map((todo) => {
      if (todo.id === parseInt(id)) {
        return {
          ...todo,
          noteList: tempState,
        };
      }
      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setIsChangesSaved(true);
    setIsEditing(false);

    saveChanges();
    navigate("/");
  };

  const handleBackClick = () => {
    saveChanges();
    navigate("/");
  };

  const saveChanges = () => {
    if (!isChangesSaved && isEditing) {
      const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
      const updatedTodos = storedTodos.map((todo) => {
        if (todo.id === parseInt(id)) {
          return {
            ...todo,
            noteList: tempState,
          };
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setIsChangesSaved(true);
      setIsEditing(false);
    }
  };

  return (
    <div>
      <div className="row mt-5">
        <div className="container">
          <div className="col-6 mx-auto">
            <div className="card">
              <div className="card-header">
                <h2 className="todo-title text-center py-1">
                  {changeTile}: {id}
                </h2>
              </div>
              <div className="card-body">
                <form onSubmit={(evt) => addNote(evt)}>
                  <div className="input-group">
                    <input
                      className="form-control"
                      name="todoItem"
                      type="text"
                      defaultValue={tempState[selectIndex]?.title}
                      placeholder="Write new todo"
                    />
                    <button className="btn btn-success" type="submit">
                      Add
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer">
                <ul className="todo-list d-flex  flex-column gap-3 py-2">
                  {tempState.map((todo, index) => (
                    <li
                      className="d-flex align-items-center justify-content-between  w-100"
                      key={index}
                    >
                      <p className={`${todo.isCompleted ? "line" : ""}`}>
                        <span className="me-3">{index + 1}.</span>
                        {todo.title}
                      </p>
                      <div className="btns d-flex pe-3  gap-3">
                        <input
                          type="checkbox"
                          data-todo-id={todo.id}
                          onClick={(evt) => handleCheckTodo(evt)}
                          defaultChecked={false}
                        />
                        <button
                          className="btn btn-info"
                          onClick={() => editNote(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteNote(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="todo-footer d-flex justify-content-end my-3 gap-3">
              <button className="btn btn-danger" onClick={handleDeleteClick}>
                Delete all
              </button>
              <button onClick={handleBackClick} className="btn btn-secondary">
                Go to back
              </button>
              <button className="btn btn-success" onClick={handleSaveClick}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotePage;
