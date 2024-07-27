export interface Task {
    id: number;
    description: string;
    name: string;
    pomodoros?: number;
    completedPomodoros: number;
    estimatedPomodoros: number;
    createdAt: Date;
    completedAt?: Date;
    completed: boolean;
    completedWithinTime?: boolean;
    duration?:number;
  }
  
  const TASKS_KEY = "tasks";

  export function saveTasks(tasks: Task|Task[]): void {
    if(!Array.isArray(tasks)) tasks = [tasks];
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }
  
  export function getTasks(): Task[] {
    const tasksData = localStorage.getItem(TASKS_KEY);
    const tasks = tasksData ? JSON.parse(tasksData) : [];
    return tasks;
  }
  
  export function createTask(task: Task): void {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }
  
  export function updateTask(task: Task): void {
    const tasks = getTasks();
    const index = tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    }
  }
  
  export function deleteTask(taskId: number): void {
    const tasks = getTasks();
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem(TASKS_KEY, JSON.stringify(filteredTasks));
  }
  