import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/form/CustomInput";
import { z } from "zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api";
import { ApiResponse, LoginFromData, setTokens, setUserData } from "../utils";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../state";

const schema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(4, "Password must be at least 6 characters"),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<LoginFromData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (response: ApiResponse) => {
      if (response.status === "success") {
        setFormData({
          email: "",
          password: "",
        });
        toast.success(response?.message);
        const { accessToken, refreshToken, user } = response?.data;
        setTokens(accessToken, refreshToken);
        setUserData(user);
        dispatch(setCurrentUser(user));
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      schema.parse(formData);
      setErrors({});
      mutation.mutate(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors: any = {};
        err.errors.forEach((error) => {
          formattedErrors[error.path[0]] = error.message;
        });
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <div className="container my-6">
      <form onSubmit={handleSubmit}>
        <div className="border px-10 py-6 rounded-md border-gray-900 md:px-6 sm:px-4 max-w-[500px] sm:w-full mx-auto">
          <CustomInput
            id="email"
            placeHolder="john.doe@mail.io"
            type="email"
            name="email"
            label="Enter your email"
            error={errors?.email}
            onchange={handleChange}
          />
          <CustomInput
            id="password"
            placeHolder="•••••••"
            type="password"
            name="password"
            label="Enter your password"
            error={errors?.password}
            onchange={handleChange}
          />
          <div className="-mt-2">
            <span className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-green-500 font-display">
                Register
              </Link>
            </span>
          </div>
          <div className="mt-4 text-center">
            <button className="rounded-full py-2 px-10 bg-green-700 text-lg text-white font-display">
              {mutation.isPending ? "Logging in" : "Login"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
