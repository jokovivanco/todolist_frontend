import EditAccountForm from '@/forms/EditAccountForm';

const Account = () => {
  return (
    <section>
      <div className="container max-w-80 flex flex-col justify-center items-center h-screen overflow-hidden gap-10">
        <p className="text-xl">Account</p>
        <div>
          <EditAccountForm />
        </div>
      </div>
    </section>
  );
};
export default Account;
