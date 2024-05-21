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
import { createSchema } from '../validations/task-validation';
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
import { TaskType } from '@/types';
import { AxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import useAuthAxios from '@/hooks/useAuthAxios';

interface CreateTaskFormProps {
  todoId: number;
  setTasksData: React.Dispatch<React.SetStateAction<TaskType[]>>;
}

const CreateTaskForm = ({ todoId, setTasksData }: CreateTaskFormProps) => {
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const authAxios = useAuthAxios();

  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof createSchema>) {
    try {
      const response = await authAxios(`/api/todos/${todoId}/tasks`, {
        method: 'POST',
        data: { name: values.name },
      });

      setTasksData((state) => [...state, response.data.data]);
      setOpenDialog(false);
      form.reset();
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
        <Button variant="outline">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Create your task here. Click Add when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem className="grid grid-cols-4 items-center  gap-x-4">
                  <FormLabel className="text-right">
                    Name <span className="text-red-500">*</span>
                  </FormLabel>
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
                Add
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskForm;
