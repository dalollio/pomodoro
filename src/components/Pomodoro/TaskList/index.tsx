import React from 'react';
import { Task } from '../../../services/taskService';
import TaskListItem from '../TaskListItem';
import './styles.css';

type TaskListProps = {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  taskDelete: (taskId: Task) => void;
  completeTask: (task: Task) => void;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskClick,
  taskDelete,
  completeTask,
}) => {
  return (
    <div className="task-list">
      <span>#Tasks</span>
      <div className="section-separator" />
      {tasks.map(task => (
        <TaskListItem
          handleDelete={taskDelete}
          key={task.id}
          task={task}
          onClick={onTaskClick}
          completeTask={completeTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
