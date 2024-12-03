import { Link, Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils";
import { myPasswordImage } from "../assets";
import { ResetPasswordForm } from "../containers";

export default function ResetPassword() {
  if (isAuthenticated()) return <Navigate to="/dashboard" replace={true} />;
  return (
    <section className="base-paddings">
      <main className="pt-24">
        <div className="min-h-[80vh] w-[70%] xl:w-full mx-auto py-10 px-10 md:px-6 flex items-center shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] bg-green-200/5">
          <div className="flex w-full gap-x-14 sm:flex-col-reverse sm:gap-y-14 sm:justify-center">
            <div className="mr-auto w-[100%] text-center">
              <h1 className="text-3xl font-display mb-1 text-white">
                Reset Password
              </h1>
              <p className="text-sm mb-6">
                Enter a strong password to change your password.
              </p>
              <ResetPasswordForm />
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
                src={myPasswordImage}
                className="w-full md:mt-10 sm:mt-0 sm:w-[70%] mx-auto"
                alt="forgot password svg art"
              />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
