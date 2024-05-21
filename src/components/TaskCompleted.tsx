import { TaskType } from '@/types';

interface TaskCompletedProps {
  tasks: TaskType[];
}

const TaskCompleted = ({ tasks }: TaskCompletedProps) => {
  const totalCompleted = tasks.filter((task) => task.is_done).length;
  const total = tasks.length;

  const completePercentage = totalCompleted / total;
  let bgColor = 'bg-red-500';

  if (!isNaN(completePercentage)) {
    if (completePercentage >= 1) {
      bgColor = 'bg-green-500';
    } else if (completePercentage >= 0.25) bgColor = 'bg-orange-500';
  } else {
    bgColor = 'bg-muted';
  }

  return (
    <div className={`py-1 px-2 ${bgColor} rounded-md text-white text-sm bg-`}>
      {isNaN(completePercentage)
        ? 'No task created'
        : `${totalCompleted} / ${total}`}
    </div>
  );
};
export default TaskCompleted;
