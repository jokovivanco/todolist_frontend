import { useForm } from 'react-hook-form';
import { loginSchema } from '../validations/user-validation';
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
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '@/context/userContext';

const LoginForm = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const user = await login({
      username: values.username,
      password: values.password,
    });

    if (user) {
      navigate('/', { replace: true });
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
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>
                Password <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <InputIconEye placeholder="Password" {...field} />
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
          Sign In{' '}
        </Button>
        <Link to="/register">
          <Button type="button" className="w-full mt-3" variant={'outline'}>
            Create Account
          </Button>
        </Link>
      </form>
    </Form>
  );
};
export default LoginForm;
