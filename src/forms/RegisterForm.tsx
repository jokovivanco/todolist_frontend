import { useForm } from 'react-hook-form';
import { registerSchema } from '../validations/user-validation';
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
import { useContext, useState } from 'react';
import { UserContext } from '@/context/userContext';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const { register } = useContext(UserContext);
  const navigate = useNavigate();
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const user = await register({
      username: values.username,
      name: values.name,
      password: values.password,
    });

    if (user) {
      navigate('/login');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>
                Username <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} className="bg-white" />
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
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>
                Name <span className="text-red-500">*</span>
              </FormLabel>
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
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>
                Password <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <InputIconEye
                  placeholder="Password"
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
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>
                Confirm Password <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <InputIconEye
                  placeholder="Confirm Password"
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
        <Button className="w-full">Sign Up</Button>
      </form>
    </Form>
  );
};
export default RegisterForm;
