import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ChatWidget } from "../components/chatbot/ChatWidget";

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-navy-950">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
