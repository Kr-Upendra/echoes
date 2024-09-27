import SectionHeading from "../components/common/SectionHeading";
import LoginForm from "../containers/LoginForm";

export default function Login() {
  return (
    <section id="feature" className="mb-10 pt-24 base-paddings">
      <main>
        <SectionHeading
          title="Login to your account"
          description="Start your journey from here"
        />
        <LoginForm />
      </main>
    </section>
  );
}
