import { Navigate } from "react-router-dom";
import SectionHeading from "../components/common/SectionHeading";
import { RegistrationForm } from "../containers";
import { isAuthenticated } from "../utils";

export default function Register() {
  if (isAuthenticated()) return <Navigate to="/dashboard" replace={true} />;
  return (
    <section className="base-paddings">
      <main className="pt-24">
        <div className="flex justify-center items-center min-h-[80vh] w-[70%] xl:w-full mx-auto py-10 px-10 md:px-6 big-shadow bg-green-200/5">
          <div>
            <SectionHeading
              title="Register yourself"
              description="Get yourself one step closer to Echoe's world by registering at here"
            />
            <RegistrationForm />
          </div>
        </div>
      </main>
    </section>
  );
}
