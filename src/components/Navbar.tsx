import Image from "next/image";

export default function Navbar() {
  return (
    <header className="absolute left-[36px] top-[15px] right-[36px] h-[97px] flex items-center justify-between">
      {/* Left: ND Logo */}
      <div className="flex items-center gap-10">
        <Image
          src="/assets/ND_Logo.svg"
          alt="ND Logo"
          width={357}
          height={97}
          priority
        />

        {/* Nav links */}
        <nav className="flex items-center gap-10 text-white/80 text-sm">
          <a href="#home" className="hover:text-white">
            Home
          </a>
          <a href="#about" className="hover:text-white">
            About
          </a>
          <a href="#experience" className="hover:text-white">
            Experience
          </a>
          <a href="#projects" className="hover:text-white">
            Projects
          </a>
        </nav>
      </div>

      {/* Right icons (we’ll add + pixel-lock once you confirm their X/Y/W/H) */}
      <div className="flex items-center gap-4" />
    </header>
  );
}