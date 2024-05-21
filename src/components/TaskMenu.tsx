import { EllipsisVertical, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TaskType } from '@/types';
import useAuthAxios from '@/hooks/useAuthAxios';
import { useToast } from './ui/use-toast';
import DeleteDialog from './DeleteDialog';
import { useState } from 'react';
import EditTaskForm from '@/forms/EditTaskForm';

interface TaskMenuProps {
  todoId: number;
  task: TaskType;
  setTasksData: React.Dispatch<React.SetStateAction<TaskType[]>>;
}

const TaskMenu = ({ todoId, task, setTasksData }: TaskMenuProps) => {
  const authAxios = useAuthAxios();
  const { toast } = useToast();
  const [openMenu, setOpenMenu] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await authAxios(
        `/api/todos/${todoId}/tasks/${task.id}`,
        {
          method: 'DELETE',
        },
      );

      if (response?.data?.data === 'ok') {
        setTasksData((state) => state.filter((item) => item.id !== task.id));

        toast({
          title: 'Remove task successfully',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
      <DropdownMenuTrigger>
        <EllipsisVertical className="text-muted" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-0">
        <div className="rounded-md flex gap-5 items-center flex-col justify-center p-1">
          <div className="cursor-pointer">
            <EditTaskForm
              todoId={todoId}
              task={task}
              setTasksData={setTasksData}
              onCallback={() => {
                setOpenMenu(false);
              }}
            />
          </div>
          <div className="cursor-pointer">
            <DeleteDialog
              trigger={<Trash className="text-red-400" />}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default TaskMenu;
