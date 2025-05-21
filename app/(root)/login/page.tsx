import Logo from '@/components/common/logo'
import LoginForm from '@/components/forms/login-form'

const Login = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center ">
      <div className='w-[350px] space-y-6'>
        <div className='w-full flex justify-center'>
          <Logo className='rounded-full'/>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
