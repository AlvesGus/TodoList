import React, { useState, useEffect } from 'react'
import { SquarePlus, X } from 'lucide-react'

import './app.css'
import TodoList from './Components/TodoList'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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

    const existingTodos = localStorage.getItem('@todos') ? JSON.parse(localStorage.getItem('@todos')) : [];
    const updatedTodos = [...existingTodos, newTask];

    setTodo(updatedTodos);
    setInputValue('');

    localStorage.setItem('@todos', JSON.stringify(updatedTodos));
    setModal(!modal);
    toast.success('Tarefa criada com sucesso')
  } else {
    toast.error('Digite uma tarefa')
  }
};

const deleteTask = (id) => {
  const newTodos = [...todo].filter(todo => todo.id !== id ? todo : null);
  setTodo(newTodos);
  localStorage.setItem('@todos', JSON.stringify(newTodos))
  toast.success('Tarefa concluida com sucesso')
};

  useEffect(() => {
    const storedTodos = localStorage.getItem('@todos');
    if (storedTodos) {
      setTodo(JSON.parse(storedTodos));
    }
  }, []);

  return (
    <>
    <ToastContainer autoClose={3000}/>
    <div className='container'>
       {modal === false ? (
          <div>
           
          </div>
        ) : (
          <div className='modal_container'>
            <div className="modal_content">
              <div className="header">
                <span>Adicione suas novas tarefas</span>
                <X onClick={() => setModal(!modal)} cursor={'pointer'}/>
              </div>
              <div className="modal_form">
                  <input type='text' value={inputValue} onChange={handleInputChange}/>
                <div className='btn'>
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
   </>
  )
}

export default App
