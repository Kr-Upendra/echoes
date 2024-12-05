import { Link, Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils";
import { forgotPassword } from "../assets";
import { ForgotPasswordForm } from "../containers";

export default function ForgotPassword() {
  if (isAuthenticated()) return <Navigate to="/dashboard" replace={true} />;
  return (
    <section className="base-paddings">
      <main className="pt-24">
        <div className="min-h-[80vh] w-[70%] xl:w-full mx-auto py-10 px-10 md:px-6 flex items-center big-shadow bg-green-200/5">
          <div className="flex w-full gap-x-14 sm:flex-col-reverse sm:gap-y-10 sm:justify-center">
            <div className="mr-auto w-[100%] text-center">
              <h1 className="text-3xl font-display mb-1 text-white">
                Forgot Password
              </h1>
              <p className="text-sm mb-6">
                Enter your e-mail address and we'll give you password reset
                instruction.
              </p>
              <ForgotPasswordForm />
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
