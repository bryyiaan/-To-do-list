import React, { useState, useRef, useEffect } from 'react';
import './ShootingStars.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [taskInput]);

  const handleAddTask = () => {
    if (taskInput.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
    setTaskInput('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center font-sans overflow-hidden relative">
      <div className="night">
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
      </div>

      <div className="bg-slate-800 bg-opacity-50 backdrop-blur-md p-8 rounded-xl shadow-2xl shadow-slate-900/50 w-full max-w-md relative z-10 border border-slate-700">
        <h1 className="text-2xl font-bold mb-6 text-center text-slate-200">To-Do List</h1>
        <div className="flex items-center mb-4">
          <div className="relative flex-grow">
            <textarea
              ref={textareaRef}
              rows="1"
              className="flex-grow p-2 pl-4 bg-slate-700 text-slate-200 border border-slate-600 rounded-l-full focus:outline-none focus:border-blue-600 placeholder-slate-400 transition-colors resize-none overflow-hidden border-r-0 w-full h-10 align-middle"
              placeholder="Add a new task..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault(); // Prevents adding a new line
                  handleAddTask();
                }
              }}
            />
          </div>
          <button
            onClick={handleAddTask}
            className="bg-blue-900 text-slate-200 w-10 h-10 rounded-r-full hover:bg-blue-800 transition-colors flex-shrink-0 flex items-center justify-center text-2xl font-bold"
          >
            <span className="-mt-1">+</span>
          </button>
        </div>
        <div>
          <ul>
            {tasks.map(task => (
              <li
                key={task.id}
                className="flex items-center justify-between p-2 mb-2 bg-slate-700 bg-opacity-50 rounded-lg shadow-sm cursor-pointer transition-all hover:bg-slate-600/50 border border-slate-600"
                onClick={() => handleToggleComplete(task.id)}
              >
                <div className="flex items-start flex-grow min-w-0">
                  <div
                    className={`w-5 h-5 border-2 rounded-full mr-4 flex-shrink-0 flex items-center justify-center mt-1 ${task.completed ? 'border-green-500 bg-green-500' : 'border-slate-500'}`}>
                    {task.completed && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    )}
                  </div>
                  <span className={`text-slate-200 ${task.completed ? 'line-through text-slate-500' : ''} break-all whitespace-pre-wrap flex-grow`}>
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the li's onClick from firing
                    handleDeleteTask(task.id);
                  }}
                  className="text-slate-500 hover:text-red-500 font-bold text-xl ml-4 transition-colors flex-shrink-0"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;

