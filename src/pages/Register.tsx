import RegisterForm from '@/forms/RegisterForm';

const Register = () => {
  return (
    <section>
      <div className="container max-w-80 flex flex-col justify-center items-center h-screen overflow-hidden gap-10">
        <div>
          <p className="font-title text-center mt-2">Create Account</p>
        </div>
        <div>
          <RegisterForm />
        </div>
      </div>
    </section>
  );
};
export default Register;
