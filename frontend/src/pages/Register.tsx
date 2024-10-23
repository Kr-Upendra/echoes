import { Navigate } from "react-router-dom";
import SectionHeading from "../components/common/SectionHeading";
import { RegistrationForm } from "../containers";
import { isAuthenticated } from "../utils";

export default function Register() {
  if (isAuthenticated()) return <Navigate to="/dashboard" replace={true} />;
  return (
    <section className="base-paddings">
      <main>
        <div className="min-h-screen pt-20 h-full flex justify-center items-center flex-col">
          <SectionHeading
            title="Register yourself"
            description="Start your journey from here"
          />
          <RegistrationForm />
        </div>
      </main>
    </section>
  );
}
