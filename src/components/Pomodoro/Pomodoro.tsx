import React from 'react';
import TaskList from './TaskList';
import TaskAdder from './TaskAdder';
import Timer from './Timer';
import {
  getTasks,
  saveTasks,
  Task,
  deleteTask,
} from '../../services/taskService';

const Pomodoro: React.FC = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [activeTask, setActiveTask] = React.useState<Task | null>(null);

  React.useEffect(() => {
    const storedTasks = getTasks();
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  const addTask = (task: Task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const handleDelete = (task: Task) => {
    deleteTask(task.id);
    const storedTasks = getTasks();
    if (storedTasks) {
      setTasks(storedTasks);
    }
  };

  const completePomodoro = () => {
    if (activeTask) {
      const newTasks = tasks.map(task => {
        if (task.id === activeTask.id) {
          return {
            ...task,
            completedPomodoros: (task.completedPomodoros || 0) + 1,
          };
        }
        setActiveTask(task);
        return task;
      });
      setTasks(newTasks);
      saveTasks(newTasks);
    }
  };

  const handleTaskClick = (task: Task) => {
    setActiveTask(task);
  };

  const completeTask = (_task: Task) => {
    const newTasks = tasks.map(task => {
      if (task.id === _task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
    saveTasks(newTasks);
    setActiveTask(null);
  };

  return (
    <div className="pomodoro">
      <div className="pomodoro-timer">
        <Timer task={activeTask || null} onComplete={completePomodoro} />
      </div>
      <div className="pomodoro-tasks">
        <TaskList
          taskDelete={handleDelete}
          tasks={tasks}
          onTaskClick={handleTaskClick}
          completeTask={completeTask}
        />
        <TaskAdder onAddTask={addTask} />
      </div>
    </div>
  );
};

export default Pomodoro;
