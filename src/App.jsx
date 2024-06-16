import React, { useState, useEffect } from 'react'
import { SquarePlus, X } from 'lucide-react'

import './app.css'
import TodoList from './Components/TodoList'



const App = () => {
const [modal, setModal] = useState(false)
const [inputValue, setInputValue] = useState('')
const [todo, setTodo] = useState([])

function handleInputChange(e){
  setInputValue(e.target.value)
}

const addTodo = () => {
  if (inputValue.trim() !== '') {
    const newTask = {
      id: crypto.randomUUID(),
      content: inputValue,
      createdAt: new Date().toLocaleDateString(),
    };

    // Retrieve existing todos from localStorage
    const existingTodos = localStorage.getItem('@todos') ? JSON.parse(localStorage.getItem('@todos')) : [];

    // Update the todo array with the new task
    const updatedTodos = [...existingTodos, newTask];

    // Set the updated todo array to the local state
    setTodo(updatedTodos);

    // Clear the input value
    setInputValue('');

    // Save the updated todo array to localStorage
    localStorage.setItem('@todos', JSON.stringify(updatedTodos));

    // Close the modal
    setModal(!modal);
  } else {
    alert('Digite sua tarefa');
  }
};

const deleteTask = (id) => {
  const newTodos = [...todo].filter(todo => todo.id !== id ? todo : null);
  setTodo(newTodos);
  localStorage.setItem('@todos', JSON.stringify(newTodos))
  console.log(id);
};

  useEffect(() => {
    const storedTodos = localStorage.getItem('@todos');
    if (storedTodos) {
      setTodo(JSON.parse(storedTodos));
    }
  }, []);

  return (
    
    <div className='container'>
       {modal === false ? (
          <div>
           
          </div>
        ) : (
          <div className='modal_container'>
            <div className="modal_content">
              <div className="header">
                <span>Adicione suas novas tarefas</span>
                <X onClick={() => setModal(!modal)}/>
              </div>
              <div className="modal_form">
                <div>
                  <input type='text' value={inputValue} onChange={handleInputChange}/>
                  <button onClick={addTodo} type='button'>Criar tarefa</button>
                </div>
              </div>
            </div>
          </div>
        )}
      <div className="content">
        <div className="header_info">
          <h1>Adicione e gerencie suas tarefas diárias.</h1>
        </div>
        <div className="task_content">
          <div className="add_new_task" onClick={() => setModal(!modal)}>
          <SquarePlus color='#f1f1f1' size={32}/>
          <span>Adicionar tarefa</span>
          </div>

          {todo.length > 0 ? (
              todo.map((task) => (
                <TodoList key={task.id} todo={todo} task={task} deleteTask={deleteTask} />
              ))
            ) : (
              <p></p>
            )}
          
        </div>
      </div>
   </div>
  )
}

export default App
