import Image from "next/image";

export default function ProfileCard() {
  return (
    <div className="absolute left-[205px] top-[224.65px] w-[407.36px] h-[638.35px] rounded-[32px] border border-white/10 bg-white/5 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
      {/* photo placeholder - replace with your actual image in /public */}
      <div className="p-4">
        <div className="h-[360px] rounded-[22px] bg-black/40 overflow-hidden relative">
          {/* put your portrait at /public/assets/me.jpg and swap here */}
          <Image
            src="/assets/me.jpg"
            alt="Andy"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="px-6 pb-6 text-white">
        <div className="text-xs tracking-widest opacity-70 mb-3">SIM WEI BIN ANDY</div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="opacity-70">NAME</span>
            <span className="opacity-90"> </span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="opacity-70">MBTI</span>
            <span className="opacity-90">INFJ-A</span>
          </div>
        </div>
      </div>

      {/* white vertical strip with rotated text (approx like your design) */}
      <div className="absolute right-0 top-0 h-full w-[56px] bg-white flex items-center justify-center">
        <div className="rotate-90 text-black font-black tracking-widest text-lg whitespace-nowrap">
          HIGH SCHOOL
        </div>
      </div>
    </div>
  );
}