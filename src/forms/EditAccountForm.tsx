import { useForm } from 'react-hook-form';
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
import { Button } from '@/components/ui/button';
import { InputIconEye } from '@/components/ui/inputIconEye';
import { useEffect, useState } from 'react';
import { settingSchema } from '@/validations/account-validation';
import useAuth from '@/hooks/useAuth';
import { UpdateUserType } from '@/types';
import useAuthAxios from '@/hooks/useAuthAxios';
import { useToast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';

const EditAccountForm = () => {
  const { user, setUser } = useAuth();
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const authAxios = useAuthAxios();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof settingSchema>>({
    resolver: zodResolver(settingSchema),
    defaultValues: {
      name: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  useEffect(() => {
    if (user?.name) {
      form.setValue('name', user.name);
    }
  }, [user, form]);

  async function onSubmit(values: z.infer<typeof settingSchema>) {
    const data = {
      currentPassword: values.currentPassword,
    } as UpdateUserType;

    if (values.name) {
      data.name = values.name;
    }

    if (values.newPassword) {
      data.password = values.newPassword;
    }

    try {
      const response = await authAxios('/api/users/current', {
        method: 'PATCH',
        data,
        withCredentials: true,
      });

      setUser((state) => ({ ...state, ...response.data.data }));

      toast({
        title: 'Your account updated successfully',
      });

      form.reset({
        name: response.data.data.name,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input value={user?.username || ''} disabled className="bg-white" />
          </FormControl>
        </FormItem>
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} className="bg-white" />
              </FormControl>
              {fieldState.error && (
                <FormMessage className="text-red-500">
                  {fieldState.error.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>
                Current Password <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <InputIconEye placeholder="Current Password" {...field} />
              </FormControl>
              {fieldState.error && (
                <FormMessage className="text-red-500">
                  {fieldState.error.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <InputIconEye
                  placeholder="New Password"
                  hiddenProps={hiddenPassword}
                  setHiddenProps={setHiddenPassword}
                  {...field}
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage className="text-red-500">
                  {fieldState.error.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <InputIconEye
                  placeholder="Confirm New Password"
                  hiddenProps={hiddenPassword}
                  setHiddenProps={setHiddenPassword}
                  {...field}
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage className="text-red-500">
                  {fieldState.error.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
};
export default EditAccountForm;
