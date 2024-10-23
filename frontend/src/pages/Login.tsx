import { Navigate } from "react-router-dom";
import SectionHeading from "../components/common/SectionHeading";
import { LoginForm } from "../containers";
import { isAuthenticated } from "../utils";

export default function Login() {
  if (isAuthenticated()) return <Navigate to="/dashboard" replace={true} />;
  return (
    <section className="base-paddings">
      <main>
        <div className="min-h-screen h-full flex justify-center items-center flex-col">
          <SectionHeading
            title="Login to your account"
            description="Start your journey from here"
          />
          <LoginForm />
        </div>
      </main>
    </section>
  );
}
