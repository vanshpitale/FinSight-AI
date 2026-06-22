import SignInForm from "./_component/signin-form";
import Logo from "@/components/logo/logo";

const SignIn = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-10 md:pt-6 bg-[] dark:bg-background">
        <div className="flex justify-center gap-2">
          <Logo url="/" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;