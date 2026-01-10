import { Header, HeaderProvider } from "@/sections/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <HeaderProvider>
      <Header />
      <main className="pt-[72px]">
        <Outlet />
      </main>
    </HeaderProvider>
  );
}
