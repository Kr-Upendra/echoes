import { Link } from "react-router-dom";
import CustomInput from "../components/form/CustomInput";

export default function Register() {
  return (
    <section
      id="feature"
      className="mb-5 py-20 min-h-screen h-full base-paddings"
    >
      <div className="px-40 lg:px-20 md:px-10 sm:px-0">
        <div className="">
          <div className="text-center mb-10">
            <h1 className="text-2xl text-text-alpha font-bold">
              Register Yourself
            </h1>
          </div>
          <form action="">
            <div className="max-w-[400px] sm:w-full mx-auto">
              <div className="w-full mb-5">
                <label
                  htmlFor="firstname"
                  className="block mb-1 text-text-light"
                >
                  Firstname
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="Enter your firstname"
                  className="w-full p-2 text-text-alpha outline-none border border-primary-alpha rounded-lg bg-background-mid"
                />
              </div>

              <CustomInput />

              <div className="w-full mb-5">
                <label htmlFor="email" className="block mb-1 text-text-light">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your Email"
                  className="w-full p-2 text-text-alpha outline-none border border-primary-alpha rounded-lg bg-background-mid"
                />
              </div>
              <div className="w-full mb-5">
                <label
                  htmlFor="password"
                  className="block mb-1 text-text-light"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full p-2 text-text-alpha outline-none border border-primary-alpha rounded-lg bg-background-mid"
                />
              </div>
              <div className="w-full mb-5">
                <span>Already have an account? </span>
                <Link to="/login">Login</Link>
              </div>
              <div className="w-full mb-5">
                <button>Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
