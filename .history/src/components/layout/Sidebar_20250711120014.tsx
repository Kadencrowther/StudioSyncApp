import React from "react";

const navLinks = [
  { href: "/dashboard", icon: "fa-tachometer-alt", label: "Dashboard" },
  { href: "/class-calendar", icon: "fa-calendar-alt", label: "Class Calendar" },
  { href: "/allclasses", icon: "fa-chalkboard-teacher", label: "Classes" },
  { href: "/families", icon: "fa-home", label: "Families" },
  { href: "/students", icon: "fa-user-graduate", label: "Students" },
  { href: "/instructors", icon: "fa-chalkboard-teacher", label: "Instructors" },
  { href: "/costumes", icon: "fa-tshirt", label: "Costumes" },
  { href: "/recital", icon: "fa-theater-masks", label: "Recital" },
  { href: "/communication", icon: "fa-comments", label: "Communication" },
  { href: "/studiostore", icon: "fa-store", label: "Studio Store" },
  {
    href: "/charges-payments",
    icon: "fa-dollar-sign",
    label: "Charges/Payments",
  },
  { href: "/reports", icon: "fa-chart-bar", label: "Reports" },
  { href: "/settings", icon: "fa-cog", label: "Settings" },
];

const Sidebar: React.FC = () => (
  <aside className="bg-cyan-400 min-h-screen w-64 flex flex-col shadow-lg">
    <div className="sidebar-heading flex items-center justify-center py-6">
      <img
        src="/assets/StudioSyncTransparent.svg"
        alt="Studio Sync Logo"
        className="h-16 w-auto"
      />
    </div>
    <nav className="flex-1 px-4">
      <ul className="space-y-2">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-cyan-600 transition"
            >
              <i className={`fas ${link.icon} text-lg`}></i>
              <span className="font-semibold">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
    <div className="mt-auto mb-8"></div>
  </aside>
);

export default Sidebar;
