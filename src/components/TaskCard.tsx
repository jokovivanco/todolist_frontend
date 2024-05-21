import { TaskType } from '@/types';
import { toHumanDate } from '@/lib/utils';
import { Check, Clock } from 'lucide-react';
import useAuthAxios from '@/hooks/useAuthAxios';
import TaskMenu from './TaskMenu';

interface TaskCardProps {
  todoId: number;
  task: TaskType;
  setTasksData: React.Dispatch<React.SetStateAction<TaskType[]>>;
}

const TaskCard = ({ todoId, task, setTasksData }: TaskCardProps) => {
  const authAxios = useAuthAxios();
  const toggleDone = async () => {
    try {
      const response = await authAxios(
        `/api/todos/${todoId}/tasks/${task.id}`,
        {
          method: 'PUT',
          data: {
            is_done: !task.is_done,
          },
        },
      );

      const result: TaskType = response.data.data;

      if (result.id) {
        setTasksData((state) =>
          state.map((item) => {
            if (item.id === task.id) {
              item.is_done = result.is_done;
              return item;
            }
            return item;
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 rounded-md bg-white">
      <div>
        <button
          onClick={toggleDone}
          type="button"
          className={`w-[32px] h-[32px] border rounded-full flex justify-center items-center text-white ${task.is_done ? 'bg-primary' : 'border-primary'}`}
        >
          {task.is_done && <Check />}
        </button>
      </div>
      <div className="flex-1 self-start">
        <p
          className={`font-semibold text-lg ${task.is_done ? 'line-through text-primary font-medium' : 'font-semibold'}`}
        >
          {task.name}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Clock size={18} className="text-muted" />
          <p className="text-muted text-sm">{toHumanDate(task.created_at)}</p>
        </div>
      </div>
      <div>
        <TaskMenu todoId={todoId} task={task} setTasksData={setTasksData} />
      </div>
    </div>
  );
};
export default TaskCard;
