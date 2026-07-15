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
        ${ isActive ? "text-violet-700 bg-violet-100" : ""}
      `
      }
    >
        <Icon size={24} />
        <p className="text-base font-bold whitespace-nowrap">{title}</p>
    </NavLink>
  )
}
