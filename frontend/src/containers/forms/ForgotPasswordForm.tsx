import { useState } from "react";
import CustomInput from "../../components/form/CustomInput";
import SubmitButton from "../../components/form/SubmitButton";
import { ForgotPasswordFormData, forgotPasswordSchema } from "../../utils";
import { z } from "zod";
import { useCreateItem } from "../../hooks";
import { forgotPassword } from "../../api";

export default function ForgotPasswordForm() {
  const { mutate, isPending } = useCreateItem<ForgotPasswordFormData>(
    forgotPassword,
    [],
    "/login"
  );

  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrors({});
      forgotPasswordSchema.parse(formData);
      mutate(formData);
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
    <form onSubmit={handleSubmit}>
      <CustomInput
        type="email"
        id="forgot-email"
        label=""
        name="email"
        error={errors?.email}
        onchange={handleChange}
        placeHolder="Your email"
      />
      <SubmitButton
        title="Password Reset Link"
        workingTitle="Sending..."
        isDisabled={false}
        isWorking={isPending}
      />
    </form>
  );
}
