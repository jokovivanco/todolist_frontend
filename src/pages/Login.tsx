import LoginForm from '@/forms/LoginForm';

const Login = () => {
  return (
    <section>
      <div className="container max-w-80 flex flex-col justify-center items-center h-screen overflow-hidden gap-10">
        <div>
          <img src="/logo.svg" alt="logo" />
          <p className="font-title text-center mt-2">What to do</p>
        </div>
        <div>
          <LoginForm />
        </div>
      </div>
    </section>
  );
};
export default Login;
