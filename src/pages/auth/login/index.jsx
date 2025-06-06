import { LoginForm } from "@/components/LoginForm";
import { login } from "@/features/userSlice";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { redirect } from "react-router-dom";

export const LoginAction =
  (store) =>
  async ({ request }) => {
    const formInputData = await request.formData();
    const data = Object.fromEntries(formInputData);

    try {
      const response = await api.post("auth/login", data);

      store.dispatch(login(response.user));
      toast.success(response.message);
      return redirect("/admin");
    } catch (error) {
      console.log(error);
      const errMsg = error?.response?.data?.message;
      toast.error(errMsg);
      return null;
    }
  };

const LoginPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center mx-auto max-w-sm">
      <div className="w-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
