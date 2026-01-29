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

        {/* Bio Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold border-b border-white/10 pb-2">
            <User size={20} className="text-blue-400" />
            <h2 className="text-zinc-900">Biography</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            I am a software developer and founder with a strong focus on
            building real-world, production-ready systems. I design and develop
            scalable web, mobile, and desktop applications that help businesses
            automate workflows, manage operations, and generate revenue. My work
            focuses on clean architecture, usability, and long-term
            maintainability.
          </p>
        </section>

        {/* Skills Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold border-b border-white/10 pb-2">
            <Code size={20} className="text-green-400" />
            <h2 className="text-zinc-900">Tech Stack</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Node.js",
              "REST APIs",
              "PostgreSQL",
              "Tailwind CSS",
              "shadcn/ui",
              "Electron",
              "React Native",
              "System Architecture",
              "Git",
            ].map((skill) => (
              <div
                key={skill}
                className="bg-white/40 border border-white/10 rounded-lg p-3 text-sm text-gray-700 hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-green-400/50" />
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold border-b border-white/10 pb-2">
            <Briefcase size={20} className="text-purple-400" />
            <h2 className="text-zinc-900">Experience</h2>
          </div>
          <div className="space-y-6">
            <div className="relative pl-6 border-l-2 border-white/10">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 ring-4 ring-black/20" />
              <h3 className="font-bold text-lg text-gray-900">
                Founder & Lead Developer — Rethynk Web Studio
              </h3>{" "}
              <p className="text-purple-700 text-sm mb-2">2023 – Present</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Lead the design and development of full-stack systems across
                web, mobile, and desktop platforms. Own architecture decisions,
                frontend UX, backend APIs, data models, and deployment. Deliver
                reliable, production-ready software used by multiple businesses.
              </p>
            </div>
            <div className="relative pl-6 border-l-2 border-white/10">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-600 ring-4 ring-green-900/20" />
              <h3 className="font-bold text-lg text-gray-900">
                Creator — Bizflow Platform
              </h3>
              <p className="text-gray-700 text-sm mb-2">
                Business Workflow & Management System
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Built and scaled a business management platform used by multiple
                organizations to manage workflows, automate operations, and
                support revenue-generating activities.
              </p>
            </div>
          </div>
          <div className="relative pl-6 border-l-2 border-white/10">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-600 ring-4 ring-black/20" />
            <h3 className="font-bold text-lg text-gray-900">
              Creator — Edupay
            </h3>
            <p className="text-gray-700 text-sm mb-2">
              School Payment Collection & Management System
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Designed and built Edupay, a school payment collection and
              management platform used in production by a private school to
              manage student payments, and financial tracking.
            </p>
          </div>
        </section>

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
