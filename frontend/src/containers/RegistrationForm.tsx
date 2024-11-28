import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { registerUser } from "../api";
import CustomInput from "../components/form/CustomInput";
import Button from "../components/buttons/Button";
import {
  ApiResponse,
  errorAlert,
  RegisterFromData,
  registrationSchema,
  successAlert,
} from "../utils";
import PasswordInput from "../components/form/PasswordInput";

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<RegisterFromData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (response: ApiResponse) => {
      if (response.status === "success") {
        setFormData({
          email: "",
          password: "",
          firstname: "",
          lastname: "",
        });
        successAlert(response?.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    },
    onError: (error: any) => {
      errorAlert(error?.message);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      registrationSchema.parse(formData);
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
            id="firstname"
            placeHolder="John"
            type="text"
            name="firstname"
            label="Enter your firstname"
            error={errors.firstname}
            onchange={handleChange}
          />
          <CustomInput
            id="lastname"
            placeHolder="Doe"
            type="text"
            name="lastname"
            label="Enter your lastname"
            error={errors.lastname}
            onchange={handleChange}
          />
          <CustomInput
            id="email"
            placeHolder="john.doe@mail.io"
            type="email"
            name="email"
            label="Enter your email"
            error={errors.email}
            onchange={handleChange}
          />
          {/* <CustomInput
            id="password"
            placeHolder="•••••••"
            type="password"
            name="password"
            label="Create strong password"
            error={errors.password}
            onchange={handleChange}
          /> */}
          <PasswordInput
            id="password"
            placeHolder="•••••••"
            type="password"
            name="password"
            label="Create strong password"
            error={errors.password}
            onchange={handleChange}
          />
          <div className="-mt-2">
            <span className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-green-500 font-display">
                Login
              </Link>
            </span>
          </div>
          <div className="mt-4 text-center">
            <Button
              title={mutation.isPending ? "Registering" : "Register"}
              isDisabled={mutation.isPending}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
