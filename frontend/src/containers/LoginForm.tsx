import { Link } from "react-router-dom";
import CustomInput from "../components/form/CustomInput";
import { z } from "zod";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(4, "Password must be at least 6 characters"),
});

export default function LoginForm() {
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      schema.parse(formData);
      setErrors({});
      console.log("Login Form submitted:", formData);
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
            error={errors.email}
            onchange={handleChange}
          />
          <CustomInput
            id="password"
            placeHolder="•••••••"
            type="password"
            name="password"
            label="Enter your password"
            error={errors.password}
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
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
