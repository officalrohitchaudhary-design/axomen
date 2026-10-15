"use client";

const LANGUAGES = [
  { id: "en", name: "English", native: "English" },
  { id: "hi", name: "Hindi", native: "हिंदी" },
  { id: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { id: "mr", name: "Marathi", native: "मराठी" },
  { id: "ta", name: "Tamil", native: "தமிழ்" },
];

export default function SupportedLanguagesSection() {
  return (
    <section
      aria-label="Supported Languages"
      className="w-full bg-[#fdfdfd] border-b border-gray-100/80 py-3 pb-6 sm:py-6 px-4 select-none"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center">
        {/* Subtle heading matching partner strip style */}
        <p className="text-[13px] sm:text-[14px] md:text-[14.5px] font-normal text-[#4b5563] text-center tracking-tight mb-3 sm:mb-4">
          We Supported {"  "}
          <strong className="font-extrabold text-[#111827] pl-1">4+ languages</strong>

        </p>

        {/* Clean, partner-style horizontal list (no cards, low height, plain text alignment) */}
        <div className="w-full flex items-center justify-center gap-6 sm:gap-10 md:gap-16 lg:gap-20 flex-wrap">
          {LANGUAGES.map((lang) => (
            <div
              key={lang.id}
              className="flex flex-col items-center justify-center group cursor-default"
            >
              <span className="text-[16px] sm:text-[18px] md:text-[19px] font-medium text-[#111827] tracking-tight group-hover:text-[#16aee2] transition-colors duration-150">
                {lang.native}
              </span>
              {/* {lang.name !== lang.native && (
                <span className="text-[10.5px] sm:text-[11.5px] font-normal text-[#6b7280] tracking-wide mt-0.5 group-hover:text-[#134fc1]/70 transition-colors duration-150">
                  {lang.name}
                </span>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
