import { EllipsisVertical, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Pageable, TodoType } from '@/types';
import useAuthAxios from '@/hooks/useAuthAxios';
import { useToast } from './ui/use-toast';
import DeleteDialog from './DeleteDialog';
import EditTodoForm from '@/forms/EditTodoForm';
import { useState } from 'react';

interface TodoMenuProps {
  todo: TodoType;
  setTodoData: React.Dispatch<React.SetStateAction<Pageable>>;
}

const TodoMenu = ({ todo, setTodoData }: TodoMenuProps) => {
  const authAxios = useAuthAxios();
  const { toast } = useToast();
  const [openMenu, setOpenMenu] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await authAxios(`/api/todos/${todo.id}`, {
        method: 'DELETE',
      });

      if (response?.data?.data === 'ok') {
        setTodoData((state) => ({
          ...state,
          data: state.data.filter((item) => item.id !== todo.id),
        }));

        toast({
          title: 'Remove todo successfully',
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
            <EditTodoForm
              todo={todo}
              setTodoData={setTodoData}
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
export default TodoMenu;
