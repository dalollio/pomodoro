import React from 'react';
import { Task } from '../../../services/taskService';
import './styles.css';
import { setCustomStatus } from '../../../services/discordService';
import { getConfig } from '../../../services/configurations';

type TimerProps = {
  task?: Task | null;
  onComplete: () => void;
};

enum timerDuration {
  POMODORO = 25 * 60,
  SHORT_BREAK = 5 * 60,
  LONG_BREAK = 15 * 60,
}

const Timer: React.FC<TimerProps> = ({ task, onComplete }) => {
  const configs = getConfig();
  const [timeLeft, setTimeLeft] = React.useState<number>(
    timerDuration.POMODORO,
  );
  const [isBreakTime, setIsBreakTime] = React.useState<boolean>(false);
  const [pomodoroCounter, setPomodoroCounter] = React.useState<number>(0);
  const [isTimerActive, setIsTimerActive] = React.useState<boolean>(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const ring = () => {
    const ringSound = new Audio('./assets/phonering.mp3');
    ringSound.volume = 0.05;
    ringSound.play();
  }

  const setBreakTime = (): timerDuration => {
    setIsBreakTime(true);
    if ((pomodoroCounter + 1) % 4 === 0) {
      return timerDuration.LONG_BREAK;
    }
    return timerDuration.SHORT_BREAK;
  };

  const handlerTimer = () => {
    if (timerRef.current) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  const startTimer = () => {
    setIsTimerActive(true);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsTimerActive(false);
    }
  };

  const finishTimer = () => {
    stopTimer();
    ring();
    if (isBreakTime) {
      handlerBreakFinish();
    } else {
      handlerPomodoroFinish();
    }
  };

  const handlerPomodoroFinish = () => {
    setPomodoroCounter(prev => prev + 1); // Increment `pomodoroCounter`
    onComplete(); // Increment pomodoro counter on task
    setIsBreakTime(true); // Set Break timer
    setTimeLeft(setBreakTime());
  };

  const handlerBreakFinish = () => {
    setIsBreakTime(false); // Set break time off
    setTimeLeft(timerDuration.POMODORO); // Set Pomodoro timer
  };

  React.useEffect(() => {
    if (
      timeLeft % (Number(configs.update_interval) || 30) === 0 ||
      timeLeft < 30
    ) {
      setCustomStatus(
        `${
          isBreakTime
            ? configs.break_message || 'Break'
            : configs.working_message || 'Focused'
        } | ${formatTime(timeLeft, `'`, `''`)}`,
        isBreakTime
          ? configs.break_emoji || '⏲️'
          : configs.working_emoji || '🔥',
      );
    }
    if (timeLeft <= 0) {
      finishTimer();
    }
  }, [timeLeft]);

  const formatTime = (
    time: number,
    separator = ':',
    secondsDefinition?: string,
  ): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}${separator}${formattedSeconds}${
      secondsDefinition || ''
    }`;
  };

  return (
    <div>
      <div className="timer-container">
        <p className="timer-display">{formatTime(timeLeft)}</p>
        <div
          className="start-button"
          onClick={handlerTimer}
          onDoubleClick={finishTimer}>
          <span>{isTimerActive ? 'Pause' : 'Start'} </span>
        </div>
      </div>
      {task?.name && (
        <h4 className="task-name">
          You're working on
          <br />
          <h3>{task?.name}</h3>
        </h4>
      )}
    </div>
  );
};

export default Timer;
