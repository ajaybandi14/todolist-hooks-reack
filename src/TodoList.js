import React, { useState, useRef } from 'react';
import './style.css';

export default function TodoList() {
  const [list, setList] = useState([]);
  const inputRef = useRef();

  const addTodo = () => {
    const todoObject = {
      name: inputRef.current.value,
      completed: false,
      id: list[list.length - 1]?.id ? list[list.length - 1].id + 1 : 1,
    };
    setList((prevList) => {
      return [...prevList, todoObject]
    });
    
    inputRef.current.value = '';
  };

  const markComplete = (id) => {
    setList(prevList => {
      const mapped = prevList.find(item => {return item.id === id})
      mapped.completed = true;
      return [...prevList];
    })
  }

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={addTodo}>Add Todo</button>
      {list.map((item, index) => {
        return (
          <ul key={index}>
            <li>
              <div className='flex'>
                <div className={item.completed ? 'strikethrough' : ''}>{item.name}</div>
                <div className="close" onClick={() => markComplete(item.id)}>X</div>
              </div>
            </li>
          </ul>
        )
      })}
    </div>
  );
}
