import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state";
import CustomInput from "../form/CustomInput";
import CustomTextArea from "../form/CustomTextArea";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(1).optional(),
  about: z.string().optional(),
  street: z.string().min(3).optional(),
  city: z.string().min(2).optional(),
  country: z.string().min(2).optional(),
  zipcode: z.string().max(6).min(6).optional(),
});

export default function ProfileUpdateForm() {
  const userProfile = useSelector(
    (state: RootState) => state.userProfile.userProfile
  );
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState({
    userName: userProfile?.userName || "",
    email: userProfile?.email || "",
    firstName: userProfile?.firstName || "",
    lastName: userProfile?.lastName || "",
    about: userProfile?.about || "",
    street: userProfile?.address?.street || "",
    city: userProfile?.address?.city || "",
    country: userProfile?.address?.country || "",
    zipcode: userProfile?.address?.zipCode || "",
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        userName: userProfile.userName || "",
        email: userProfile.email || "",
        firstName: userProfile.firstName || "",
        lastName: userProfile.lastName || "",
        about: userProfile.about || "",
        street: userProfile.address?.street || "",
        city: userProfile.address?.city || "",
        country: userProfile.address?.country || "",
        zipcode: userProfile.address?.zipCode || "",
      });
    }
  }, [userProfile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      schema.parse(formData);
      setErrors({});
      // mutation.mutate(formData);
      console.log(formData);
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
      {/* USER INFORMATION  */}
      <div className="rounded-lg shadow-lg shadow-black/5 p-5 bg-green-200/5">
        <h4 className="font-display text-green-500 text-sm uppercase">
          User Information
        </h4>
        <div className="mt-4">
          <div className="flex gap-x-5 lg:flex-col">
            <CustomInput
              id="username"
              label="Username"
              name="username"
              type="text"
              placeHolder="johnny"
              value={formData?.userName}
              isDisabled={true}
              onchange={handleChange}
              error={errors?.username}
            />
            <CustomInput
              id="email"
              label="Email"
              name="email"
              type="email"
              placeHolder="john.doe@gmail.com"
              value={formData?.email}
              isDisabled={true}
              onchange={handleChange}
              error={errors?.email}
            />
          </div>
          <div className="flex gap-x-5 lg:flex-col">
            <CustomInput
              id="firstname"
              label="Firstname"
              name="firstName"
              type="text"
              placeHolder="John"
              value={formData?.firstName}
              onchange={handleChange}
              error={errors?.firstName}
            />
            <CustomInput
              id="lastname"
              label="Lastname"
              name="lastName"
              type="text"
              placeHolder="Doe"
              value={formData?.lastName}
              onchange={handleChange}
              error={errors?.lastName}
            />
          </div>
        </div>
      </div>

      {/* CONTACT INFORMATION */}
      <div className="rounded-lg shadow-lg shadow-black/5 p-5 bg-green-200/5 mt-6">
        <h4 className="font-display text-green-500 text-sm uppercase">
          Contact Information
        </h4>
        <div className="mt-4">
          <div className="flex gap-x-5 lg:flex-col">
            <CustomInput
              id="street"
              label="Street"
              name="street"
              type="text"
              placeHolder="Street"
              value={formData?.street}
              onchange={handleChange}
              error={errors?.street}
            />
            <CustomInput
              id="city"
              label="City"
              name="city"
              type="text"
              placeHolder="Allahabad"
              value={formData?.city}
              onchange={handleChange}
              error={errors?.city}
            />
          </div>
          <div className="flex gap-x-5 lg:flex-col">
            <CustomInput
              id="country"
              label="Country"
              name="country"
              type="text"
              placeHolder="India"
              value={formData?.country}
              onchange={handleChange}
              error={errors?.country}
            />
            <CustomInput
              id="zipCode"
              label="Zip Code"
              name="zipcode"
              type="number"
              placeHolder="000000"
              value={formData?.zipcode}
              onchange={handleChange}
              error={errors?.zipcode}
            />
          </div>
        </div>
      </div>

      {/* ABOUT ME */}
      <div className="rounded-lg shadow-lg shadow-black/5 p-5 bg-green-200/5 mt-6">
        <h4 className="font-display text-green-500 text-sm uppercase">
          ABOUT ME
        </h4>
        <div className="mt-4">
          <div className="flex lg:flex-col">
            <CustomTextArea
              id="about"
              label="About Me"
              name="about"
              placeHolder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo illo obcaecati laboriosam nemo maiores, blanditiis beatae error necessitatibus perspiciatis quis."
              value={formData?.about}
              onChange={handleChange}
              error={errors?.about}
            />
          </div>
        </div>
      </div>

      {/* UPDATE BUTTON */}
      <div className="mt-6">
        <button className="w-full text-center py-2 rounded-full bg-gradient-to-tr from-green-700 via-green-800 to-green-700 text-white font-display">
          Update Profile
        </button>
      </div>
    </form>
  );
}
