import { Navigate } from "react-router-dom";
import SectionHeading from "../components/common/SectionHeading";
import { LoginForm } from "../containers";
import { isAuthenticated } from "../utils";

export default function Login() {
  if (isAuthenticated()) return <Navigate to="/dashboard" replace={true} />;
  return (
    <section className="base-paddings">
      <main className="pt-24">
        <div className="min-h-[80vh] w-[70%] xl:w-full mx-auto py-10 px-10 md:px-6 big-shadow bg-green-200/5">
          <SectionHeading
            title="Login to your account"
            description="By login you will have access to Echoe's world, Don't wait"
          />
          <LoginForm />
        </div>
      </main>
    </section>
  );
}
