import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  to: string
  icon: LucideIcon
  title: string
}

export function NavItem({
  to,
  icon: Icon,
  title
}: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({isActive}) =>
      `
        p-4 flex gap-4 rounded-xl
        ${ isActive ? "text-indigo-700 bg-indigo-700/20" : "text-black dark:text-white"}
      `
      }
    >
        <Icon size={24} />
        <p className="text-base font-bold whitespace-nowrap">{title}</p>
    </NavLink>
  )
}
