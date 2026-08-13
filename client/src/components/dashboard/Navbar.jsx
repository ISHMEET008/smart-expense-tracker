import { Bell } from "lucide-react";

function Navbar({ title = "Dashboard" }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="h-20 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-10">

      {/* Left */}
      <h1 className="text-3xl font-bold text-white">
  {title}
</h1>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        <button className="bg-slate-900 p-3 rounded-xl border border-slate-800 hover:border-purple-500 transition">
          <Bell className="text-white" size={20} />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
            {user?.name?.split(" ")[0].charAt(0).toUpperCase()}
          </div>

          <h2 className="text-white font-semibold">
  {user?.name}
</h2>

        </div>

      </div>

    </div>
  );
}

export default Navbar;