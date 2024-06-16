import React from 'react'

const TodoList = ({todo, task, deleteTask}) => {
  return (
    <div>
       <div className='task_info'>
            <div className="task_header">
              <span>{task.createdAt}</span>
            </div>
            <div className="task_content_info">
              <span>{task.content}</span>
            </div>
            <div className="task_action">
              <button onClick={() => deleteTask(task.id)}>Finalizar tarefa</button>
            </div>
          </div>
    </div>
  )
}

export default TodoList
