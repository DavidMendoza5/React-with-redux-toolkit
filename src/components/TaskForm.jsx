import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addTask, updateTask } from '../features/tasks/taskSlice';
import { useNavigate, useParams } from 'react-router-dom';

export const TaskForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks =  useSelector((state) => state.tasks);

  useEffect(() => {
    if(params.id) {
      setTask(tasks.find((element) => element.id === params.id));
    }
  }, []);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(params.id) {
      dispatch(updateTask(task));
    } else {
      dispatch(addTask({
        ...task,
        id: uuid(),
      }));
    }
    navigate('/');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type="text" placeholder="title" name="title" value={task.title} />
      <textarea onChange={handleChange} name="description" placeholder="description" value={task.description}></textarea>
      <button>Save</button>
    </form>
  );
}