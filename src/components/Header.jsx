import { Search, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 border-b border-zinc-800 bg-[#0A0C10] flex items-center justify-between px-6">

      <div>
        <h1 className="text-xl font-semibold tracking-tight">Mosaic</h1>
        <p className="text-xs text-zinc-500">
          See what your investments are really made of.
        </p>
      </div>

      <div className="flex items-center gap-3">

        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 w-80">
          <Search size={16}/>
          <input
            className="bg-transparent outline-none w-full text-sm"
            placeholder="Search mutual fund..."
          />
        </div>

        <button className="p-2 rounded-lg border border-zinc-800 hover:bg-zinc-900 transition">
          <Bell size={18}/>
        </button>

      </div>

    </header>
  );
}