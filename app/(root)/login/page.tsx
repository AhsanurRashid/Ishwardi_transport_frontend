import Logo from "@/components/common/logo";
import ThemeSwitcher from "@/components/common/theme-switcher";
import LoginForm from "@/components/forms/login-form";

const Login = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center relative">
      <div className="w-[350px] space-y-6">
        <div className="w-full flex justify-center">
          <Logo className="rounded-full" />
        </div>
        <LoginForm />
      </div>
      <div className="top-0 right-0 p-4 absolute">
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Login;
