import { Link, Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils";
import CustomInput from "../components/form/CustomInput";
import SubmitButton from "../components/form/SubmitButton";
import { forgotPassword } from "../assets";

export default function ForgotPassword() {
  if (isAuthenticated()) return <Navigate to="/dashboard" replace={true} />;
  return (
    <section className="base-paddings">
      <main className="pt-24">
        <div className="min-h-[80vh] w-[70%] xl:w-full mx-auto py-10 px-10 md:px-6 flex items-center shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] bg-green-200/5">
          <div className="flex w-full gap-x-14 sm:flex-col-reverse sm:gap-y-10 sm:justify-center">
            <div className="mr-auto w-[100%] text-center">
              <h1 className="text-3xl font-display mb-1 text-white">
                Forgot Password
              </h1>
              <p className="text-sm mb-6">
                Enter your e-mail address and we'll give you reset instruction.
              </p>
              <form>
                <CustomInput
                  type="email"
                  id="forgot-email"
                  label=""
                  name="email"
                  error=""
                  onchange={() => {}}
                  placeHolder="Your email"
                />
                <SubmitButton
                  title="Password Reset Link"
                  workingTitle="Sending..."
                  isDisabled={false}
                  isWorking={false}
                />
              </form>
              <div className="mt-2.5">
                <span className="text-gray-400 text-sm">
                  Back to{" "}
                  <Link
                    to="/login"
                    className="text-green-500 font-display text-sm underline"
                  >
                    Login
                  </Link>
                </span>
              </div>
            </div>
            <div className="w-[100%]">
              <img
                src={forgotPassword}
                className="w-full md:mt-10 sm:mt-0"
                alt="forgot password svg art"
              />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
