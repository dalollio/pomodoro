import React from 'react';
import { Task } from '../../../services/taskService';
import { FaCheckCircle, FaRegTrashAlt } from 'react-icons/fa';
import './styles.css';

type TaskListItemProps = {
  task: Task;
  onClick: (task: Task) => void;
  handleDelete: (task: Task) => void;
  completeTask: (task: Task) => void;
};

const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  onClick,
  handleDelete,
  completeTask,
}) => {
  const handleClick = () => {
    onClick(task);
  };

  const deleteTask = () => {
    handleDelete(task);
  };

  const handleComplete = () => {
    completeTask(task);
  };

  return (
    <div
      className={`task-list-item ${
        task.completed ? 'task-list-item-completed' : ''
      }`}>
      <div onClick={handleComplete}>
        <FaCheckCircle
          size={30}
          opacity={task.completed ? 1 : 0.2}
          color="darkcyan"
        />
      </div>
      <div className="task-title" onClick={handleClick}>
        <span>{task.name}</span>
      </div>
      <div className="task-list-item-progress">
        <span className="task-list-item-progress-completed">
          {task.completedPomodoros || 0}
        </span>
        <span className="task-list-item-progress-incomplete">
          /{task.estimatedPomodoros || 0}
        </span>
      </div>
      <div onClick={deleteTask}>
        <FaRegTrashAlt />
      </div>
    </div>
  );
};

export default TaskListItem;
