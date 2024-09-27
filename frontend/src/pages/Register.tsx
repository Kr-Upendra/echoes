import CustomInput from "../components/form/CustomInput";
import SectionHeading from "../components/common/SectionHeading";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <section id="feature" className="mb-10 pt-24 base-paddings">
      <main>
        <SectionHeading
          title="Register yourself"
          description="Start your journey from here"
        />
        <div className="container my-6">
          <form action="">
            <div className="border px-10 py-6 rounded-md border-gray-900 md:px-6 sm:px-4 max-w-[500px] sm:w-full mx-auto">
              <CustomInput
                id="firstname"
                placeHolder="John"
                type="text"
                name="firstname"
                label="Enter your firstname"
                error=""
                onchange={() => {}}
              />
              <CustomInput
                id="lastname"
                placeHolder="Doe"
                type="text"
                name="lastname"
                label="Enter your lastname"
                error=""
                onchange={() => {}}
              />
              <CustomInput
                id="email"
                placeHolder="john.doe@mail.io"
                type="email"
                name="email"
                label="Enter your email"
                error=""
                onchange={() => {}}
              />
              <CustomInput
                id="password"
                placeHolder="•••••••"
                type="password"
                name="password"
                label="Create strong password"
                error=""
                onchange={() => {}}
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
                <button className="rounded-full py-2 px-10 bg-green-700 text-lg text-white font-display">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </section>
  );
}
