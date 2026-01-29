import React from "react";
import {
  Calendar,
  Mail,
  Linkedin,
  Twitter,
  Code,
  Briefcase,
  User,
  GraduationCap,
  Github,
} from "lucide-react";

export const ContactApp = () => {
  return (
    <div className="w-full h-full text-white p-8 flex flex-col overflow-y-auto">
      <div className="flex flex-col gap-8 max-w-2xl mx-auto w-full pb-8">
        {/* Header Section */}
        <div className="flex items-center flex-col gap-6 mb-4">
          <div className="w-24 h-24 rounded-full  overflow-hidden ring-4 ring-white/10 shadow-xl">
            <img
              src="https://res.cloudinary.com/dhqutbesl/image/upload/v1729901883/1000010309_z1jnue.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl text-center font-bold mb-2 text-zinc-900 tracking-tight">
              Nekhofhe Vhuhwavho{" "}
            </h1>
            <p className="text-xl text-gray-600">
              Founder & Lead Software Developer | Full-Stack Engineer
            </p>
          </div>
        </div>

        {/* Contact/Connect Section */}
        <section className="space-y-4 pt-4">
          <h2 className="text-xl font-bold text-zinc-900">Let's Connect</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ContactButton
              icon={Twitter}
              label="Twitter/X"
              color="bg-[#ff5f57]"
              hoverColor="hover:bg-[#ff5f57]/90"
              onClick={() =>
                window.open("https://x.com/NekhofheVhuhwa2", "_blank")
              }
            />
            <ContactButton
              icon={Mail}
              label="Email me"
              color="bg-[#28c840]"
              hoverColor="hover:bg-[#28c840]/90"
              onClick={() =>
                (window.location.href = "mailto:vvhuhwavho8@gmail.com")
              }
            />
            <ContactButton
              icon={Github}
              label="GitHub"
              color="bg-[#ff9f0a]"
              hoverColor="hover:bg-[#ff9f0a]/90"
              onClick={() => window.open("https://github.com/blavk", "_blank")}
            />
            <ContactButton
              icon={Linkedin}
              label="LinkedIn"
              color="bg-[#007aff]"
              hoverColor="hover:bg-[#007aff]/90"
              onClick={() =>
                window.open(
                  "https://linkedin.com/in/vhuhwavho-nekhofhe",
                  "_blank"
                )
              }
            />
          </div>
        </section>
      </div>
    </div>
  );
};

interface ContactButtonProps {
  icon: React.ElementType;
  label: string;
  color: string;
  hoverColor: string;
  onClick?: () => void;
}

const ContactButton = ({
  icon: Icon,
  label,
  color,
  hoverColor,
  onClick,
}: ContactButtonProps) => (
  <button
    onClick={onClick}
    className={`${color} ${hoverColor} cursor-pointer transition-all duration-200 p-4 rounded-2xl flex flex-col justify-between h-28 text-left group hover:scale-[1.02] active:scale-[0.98] shadow-lg`}
  >
    <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-colors">
      <Icon size={20} className="text-white" />
    </div>
    <span className="font-bold text-lg tracking-wide">{label}</span>
  </button>
);
