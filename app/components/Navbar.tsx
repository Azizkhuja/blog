import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { FaTelegram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="w-full relative flex items-center justify-between max-w-2xl mx-auto px-4 py-5">
      <Link href="/" className="font-bold text-3xl">
        Dev <span className="text-blue-500">Logs</span>{" "}
        <span className="text-xs font-extralight">by Azizkhuja</span>
      </Link>
      <div className="flex justify-center items-center">
        <a href="https://www.linkedin.com/in/azizkhujakhujaev/" target="_blank">
          <FaLinkedin size={28} className="mr-2" />
        </a>
        <a href="https://t.me/https://t.me/devlogsbyazizkhuja" target="_blank">
          <FaTelegram size={28} className="mr-2" />
        </a>
        <ModeToggle />
      </div>
    </nav>
  );
}
