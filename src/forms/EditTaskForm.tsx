import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { editSchema } from '../validations/task-validation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EditTodoType, TaskType } from '@/types';
import { AxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import useAuthAxios from '@/hooks/useAuthAxios';
import { Pencil } from 'lucide-react';

interface EditTaskFormProps {
  todoId: number;
  task: TaskType;
  setTasksData: React.Dispatch<React.SetStateAction<TaskType[]>>;
  onCallback: () => void;
}

const EditTaskForm = ({
  todoId,
  task,
  setTasksData,
  onCallback,
}: EditTaskFormProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const authAxios = useAuthAxios();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof editSchema>>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      name: task.name,
    },
  });

  async function onSubmit(values: z.infer<typeof editSchema>) {
    const data: EditTodoType = {
      name: values.name,
    } as EditTodoType;

    try {
      const response = await authAxios(
        `/api/todos/${todoId}/tasks/${task.id}`,
        {
          method: 'PUT',
          data,
        },
      );

      const result: TaskType = response.data.data;

      setTasksData((state) =>
        state.map((item) => {
          if (item.id === task.id) {
            return result;
          }

          return item;
        }),
      );

      setOpenDialog(false);
      form.reset();

      toast({
        title: 'Your edit is successfully',
      });

      onCallback();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: error.response?.data?.errors,
          variant: 'destructive',
        });
      }
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Pencil className="text-blue-400 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Update your task here. Click Edit when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem className="grid grid-cols-4 items-center  gap-x-4">
                  <FormLabel className="text-right">Task</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white col-span-3" />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage className="text-red-500 col-start-2 col-span-3">
                      {fieldState.error.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <DialogFooter className="grid grid-cols-4 items-center">
              <Button
                type="submit"
                className="col-start-2 col-span-3 w-fit ml-auto mt-4"
              >
                Edit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskForm;
