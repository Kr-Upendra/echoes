import { Outlet } from "react-router-dom";

export default function PageLayout() {
  return (
    <section className="base-paddings">
      <main className="pt-20 pb-10">
        <Outlet />
      </main>
    </section>
  );
}
