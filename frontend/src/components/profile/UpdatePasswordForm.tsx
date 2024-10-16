import { useState } from "react";
import CustomInput from "../form/CustomInput";
import { z } from "zod";
import {
  ApiResponse,
  errorAlert,
  successAlert,
  UpdatePasswordFromData,
} from "../../utils";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../../api";

const schema = z.object({
  currentPassword: z.string().min(4, "Password must be at least 6 characters"),
  newPassword: z.string().min(4, "Password must be at least 6 characters"),
});

export default function UpdatePasswordForm() {
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<UpdatePasswordFromData>({
    currentPassword: "******",
    newPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: (response: ApiResponse) => {
      if (response.status === "success") {
        setFormData({
          currentPassword: "*****",
          newPassword: "",
        });
        successAlert(response?.message);
        console.log(response?.data);
      }
    },
    onError: (error: any) => {
      errorAlert(error?.message);
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
    <div className="rounded-lg shadow-lg shadow-black/5 p-5 bg-green-200/5 mt-6">
      <h4 className="font-display text-green-500 text-sm">
        Change Credentials
      </h4>
      <div className="mt-4">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-x-5 lg:flex-col">
            <CustomInput
              id="currentPassword"
              label="Current Password"
              name="currentPassword"
              type="password"
              placeHolder="Current Password"
              value={formData?.currentPassword}
              onchange={handleChange}
              error={errors?.currentPassword}
            />
            <CustomInput
              id="newPassword"
              label="New Password"
              name="newPassword"
              type="password"
              placeHolder="New Password"
              value={formData?.newPassword}
              onchange={handleChange}
              error={errors?.newPassword}
            />
          </div>
          <div className="mt-2">
            <button
              disabled={mutation.isPending}
              className="w-full text-center py-2 rounded-full bg-gradient-to-tr from-green-700 via-green-800 to-green-700 text-white font-display"
            >
              {mutation.isPending ? "Updating Password" : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
