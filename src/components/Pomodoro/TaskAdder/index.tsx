import React from 'react';
import { Task } from '../../../services/taskService';
import './styles.css';
import Input from '../../Shared/Input';

interface TaskAdderProps {
  onAddTask: (task: Task) => void;
}

const TaskAdder: React.FC<TaskAdderProps> = ({ onAddTask }) => {
  const [title, setTitle] = React.useState('');
  const [estimatedPomodoros, setEstimatedPomodoros] = React.useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleEstimatedPomodorosChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEstimatedPomodoros(event.target.value);
  };

  const incrementValue = () => {
    setEstimatedPomodoros(prev => `${Number(prev) + 1}`);
  };
  const decrementValue = () => {
    if (Number(estimatedPomodoros) === 0) return;
    setEstimatedPomodoros(prev => `${Number(prev) - 1}`);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const newTask: Task = {
      id: Math.floor(Math.random() * 10000),
      name: title.trim(),
      description: '',
      estimatedPomodoros: parseInt(estimatedPomodoros),
      completedPomodoros: 0,
      completed: false,
      createdAt: new Date(),
    };
    onAddTask(newTask);

    setTitle('');
    setEstimatedPomodoros('');
  };

  return (
    <form className="task-form">
      <div className="form-field">
        <Input
          placeholder="Task Title"
          value={title}
          inputType="text"
          handleChange={handleTitleChange}
        />
      </div>
      <div className="form-field">
        <Input
          placeholder="Est. Pomodoros"
          value={estimatedPomodoros}
          inputType="number"
          handleChange={handleEstimatedPomodorosChange}
        />
        <div className="form-field-input-controls">
          <span onClick={incrementValue} className="button">
            +
          </span>
          <span onClick={decrementValue} className="button">
            -
          </span>
          <span
            onClick={handleSubmit}
            className="button"
            style={{ width: '130px' }}>
            Adicionar
          </span>
        </div>
      </div>
    </form>
  );
};

export default TaskAdder;
