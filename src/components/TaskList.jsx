import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../features/tasks/taskSlice';
import { Link } from 'react-router-dom';

export const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);

  const dispatch = useDispatch();
  
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  }

  return (
    <div>
      <header>
        <h1>Tasks: {tasks.length}</h1>
        <Link to='/create-task'>Create task</Link>
      </header>
      {tasks.map((element) => {
        return (
          <div key={element.id}>
            <h3>{element.title}</h3>
            <p>{element.description}</p>
            <button onClick={(e) => handleDelete(element.id)}>Delete</button>
            <Link to={`/edit-task/${element.id}`}>Edit</Link>
          </div>
        );
      })}
    </div>
  );
}