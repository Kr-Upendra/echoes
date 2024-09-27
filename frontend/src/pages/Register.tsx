import SectionHeading from "../components/common/SectionHeading";
import RegisterForm from "../containers/RegisterForm";

export default function Register() {
  return (
    <section id="feature" className="mb-10 pt-24 base-paddings">
      <main>
        <SectionHeading
          title="Register yourself"
          description="Start your journey from here"
        />
        <RegisterForm />
      </main>
    </section>
  );
}
