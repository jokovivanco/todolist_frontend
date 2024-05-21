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
import { editSchema } from '../validations/todo-validation';
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
import { Textarea } from '@/components/ui/textarea';
import { EditTodoType, Pageable, TodoType } from '@/types';
import { AxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import useAuthAxios from '@/hooks/useAuthAxios';
import { Pencil } from 'lucide-react';

interface EditTodoFormProps {
  todo: TodoType;
  setTodoData: React.Dispatch<React.SetStateAction<Pageable>>;
  onCallback: () => void;
}

const EditTodoForm = ({ todo, setTodoData, onCallback }: EditTodoFormProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const authAxios = useAuthAxios();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof editSchema>>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      title: todo.title,
      description: todo.description === null ? '' : todo.description,
    },
  });

  async function onSubmit(values: z.infer<typeof editSchema>) {
    const data: EditTodoType = {
      title: values.title,
    } as EditTodoType;

    if (values.description) {
      data.description = values.description;
    }

    try {
      const response = await authAxios(`/api/todos/${todo.id}`, {
        method: 'PUT',
        data,
      });

      const result: TodoType = response.data.data;

      setTodoData((state) => ({
        ...state,
        data: [
          ...state.data.map((item) => {
            if (item.id === todo.id) {
              item.title = result.title;
              item.description = result.description;
              item.updated_at = result.updated_at;
              return item;
            }

            return item;
          }),
        ],
      }));
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
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>
            Update your todo here. Click Edit when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <FormItem className="grid grid-cols-4 items-center  gap-x-4">
                  <FormLabel className="text-right">Title</FormLabel>
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
            <FormField
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="bg-white col-span-3" />
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

export default EditTodoForm;
