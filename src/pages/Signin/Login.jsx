
import LoginForm from "../../components/Authentication/LoginForm";
import p1 from "../../../public/svg/blacklogo.png";


const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md   ">
        <div className="flex items-start justify-start">
          <img
            alt="logo"
            src={p1}
            width={800}
            height={800}
            className="w-auto h-11"
          />
        </div>
        <h2 className="text-2xl font-semibold text-[#000000] text-start my-4">
          Sign In
        </h2>
        <p className="text-start text-xs font-normal text-[#3C3C4399] mb-6">
          Join NeuroCheckPro to begin your journey toward clarity and expert
          guidance. It only takes a minute!
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
