import CustomInput from "../form/CustomInput";
import CustomTextArea from "../form/CustomTextArea";

export default function ProfileUpdateForm() {
  return (
    <form action="">
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
              onchange={() => {}}
              error={""}
            />
            <CustomInput
              id="email"
              label="Email"
              name="email"
              type="email"
              placeHolder="john.doe@gmail.com"
              onchange={() => {}}
              error={""}
            />
          </div>
          <div className="flex gap-x-5 lg:flex-col">
            <CustomInput
              id="firstname"
              label="Firstname"
              name="firstName"
              type="text"
              placeHolder="John"
              onchange={() => {}}
              error={""}
            />
            <CustomInput
              id="lastname"
              label="Lastname"
              name="lastName"
              type="text"
              placeHolder="Doe"
              onchange={() => {}}
              error={""}
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
              id="localAddress"
              label="Local Address"
              name="localAddress"
              type="text"
              placeHolder="Home Address"
              onchange={() => {}}
              error={""}
            />
            <CustomInput
              id="city"
              label="City"
              name="city"
              type="text"
              placeHolder="Allahabad"
              onchange={() => {}}
              error={""}
            />
          </div>
          <div className="flex gap-x-5 lg:flex-col">
            <CustomInput
              id="country"
              label="Country"
              name="country"
              type="text"
              placeHolder="India"
              onchange={() => {}}
              error={""}
            />
            <CustomInput
              id="postalCode"
              label="Postal Code"
              name="postalCode"
              type="number"
              placeHolder="000000"
              onchange={() => {}}
              error={""}
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
              id="aboutMe"
              label="About Me"
              name="aboutMe"
              placeHolder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo illo obcaecati laboriosam nemo maiores, blanditiis beatae error necessitatibus perspiciatis quis."
              onchange={() => {}}
              error={""}
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
