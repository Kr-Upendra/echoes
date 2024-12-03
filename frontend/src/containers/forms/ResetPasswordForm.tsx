import { useParams } from "react-router-dom";
import PasswordInput from "../../components/form/PasswordInput";
import SubmitButton from "../../components/form/SubmitButton";
import { useState } from "react";
import { ResetPasswordFormData, resetPasswordSchema } from "../../utils";
import { z } from "zod";
import { resetPassword } from "../../api";
import { useUpdateItem } from "../../hooks";

export default function ResetPasswordForm() {
  const { token } = useParams();

  const { mutate, isPending } = useUpdateItem<ResetPasswordFormData>(
    resetPassword,
    [],
    true,
    "/login"
  );

  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrors({});
      resetPasswordSchema.parse(formData);
      mutate({ id: token!, formdata: formData });
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
      <PasswordInput
        id="new-password"
        label=""
        name="password"
        error={errors?.password}
        onchange={handleChange}
        placeHolder="******"
      />
      <SubmitButton
        title="Change Password"
        workingTitle="Changing..."
        isDisabled={false}
        isWorking={isPending}
      />
    </form>
  );
}
