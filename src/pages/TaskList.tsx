import TaskCard from '@/components/TaskCard';
import { useToast } from '@/components/ui/use-toast';
import CreateTaskForm from '@/forms/CreateTaskForm';
import useAuthAxios from '@/hooks/useAuthAxios';
import { TaskType } from '@/types';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TaskList = () => {
  const { todoId } = useParams();
  const [tasks, setTasksData] = useState<TaskType[]>([]);

  const navigate = useNavigate();
  const authAxios = useAuthAxios();
  const { toast } = useToast();

  useEffect(() => {
    const isMounted = true;
    const controller = new AbortController();

    const getTasks = async () => {
      try {
        const response = await authAxios(`/api/todos/${todoId}/tasks`, {
          method: 'GET',
          signal: controller.signal,
        });

        if (isMounted) {
          setTasksData(response.data.data);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast({
            title: error.response?.data?.errors,
            variant: 'destructive',
          });
        }

        navigate('/');
      }
    };

    getTasks();
  }, [authAxios, navigate, todoId, toast]);

  return (
    <div className="space-y-4 py-4 container">
      <CreateTaskForm todoId={Number(todoId)} setTasksData={setTasksData} />
      {tasks?.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            todoId={Number(todoId)}
            task={task}
            setTasksData={setTasksData}
            key={task.id}
          />
        ))
      ) : (
        <p>No results... </p>
      )}
    </div>
  );
};
export default TaskList;
