import CustomInput from "../../components/form/CustomInput";
import CustomTextArea from "../../components/form/CustomTextArea";

export default function EditableAccount() {
  return (
    <div className="w-full px-4 py-8 pb-16 rounded-lg shadow-2xl shadow-green-500/20 bg-black/80">
      <h3 className="font-display px-5 text-white mb-3">My Account</h3>

      {/* USER INFORMATION  */}
      <div className="rounded-lg shadow-lg shadow-black/5 p-5 bg-green-200/5">
        <h4 className="font-display text-green-500 text-sm">
          User Information
        </h4>
        <div className="mt-4">
          <form action="">
            <div className="flex gap-5 lg:flex-col lg:gap-y-2">
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
            <div className="flex gap-5 lg:flex-col">
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
          </form>
        </div>
      </div>

      {/* CONTACT INFORMATION */}
      <div className="rounded-lg shadow-lg shadow-black/5 p-5 bg-green-200/5 mt-6">
        <h4 className="font-display text-green-500 text-sm">
          Contact Information
        </h4>
        <div className="mt-4">
          <form action="">
            <div className="flex gap-5 lg:flex-col">
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
            <div className="flex gap-5 lg:flex-col">
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
          </form>
        </div>
      </div>

      {/* ABOUT ME */}
      <div className="rounded-lg shadow-lg shadow-black/5 p-5 bg-green-200/5 mt-6">
        <h4 className="font-display text-green-500 text-sm">ABOUT ME</h4>
        <div className="mt-4">
          <form action="">
            <div className="flex gap-5 lg:flex-col">
              <CustomTextArea
                id="aboutMe"
                label="About Me"
                name="aboutMe"
                placeHolder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo illo obcaecati laboriosam nemo maiores, blanditiis beatae error necessitatibus perspiciatis quis."
                onchange={() => {}}
                error={""}
              />
            </div>
          </form>
        </div>
      </div>

      {/* UPDATE BUTTON */}
      <div className="mt-6">
        <button className="w-full text-center py-2 rounded-full bg-gradient-to-tr from-green-700 via-green-800 to-green-700 text-white font-display">
          Update Profile
        </button>
      </div>

      {/* CREDENTIALS */}
      <div className="rounded-lg shadow-lg shadow-black/5 p-5 bg-green-200/5 mt-6">
        <h4 className="font-display text-green-500 text-sm">
          Change Credentials
        </h4>
        <div className="mt-4">
          <form action="">
            <div className="flex gap-5 lg:flex-col">
              <CustomInput
                id="currentPassword"
                label="Current Password"
                name="currentPassword"
                type="password"
                placeHolder="Current Password"
                onchange={() => {}}
                error={""}
              />
              <CustomInput
                id="newPassword"
                label="New Password"
                name="newPassword"
                type="password"
                placeHolder="New Password"
                onchange={() => {}}
                error={""}
              />
            </div>
            <div className="mt-2">
              <button className="w-full text-center py-2 rounded-full bg-gradient-to-tr from-green-700 via-green-800 to-green-700 text-white font-display">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
