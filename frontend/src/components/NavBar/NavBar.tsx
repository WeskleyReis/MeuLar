import { HouseHeart, Users, ArrowLeftRight, ClipboardList, Moon, Sun } from "lucide-react";
import { NavItem } from "../NavItem/NavItem";
import { useTheme } from "../../hooks/useTheme";

export function NavBar() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div
      className="
        w-fit px-6 py-12
        flex flex-col justify-between items-center
        border-r border-neutral-400
      "
    >
      <div className="flex flex-col gap-12">
        <div className="flex items-center gap-4">
          <HouseHeart
            size={48}
            className="text-indigo-700 shrink-0"
          />
          <div>
            <p
              className="
                text-2xl font-bold
                text-indigo-700
              "
            >
              MeuLar
            </p>
            <p
              className="
                text-base font-bold text-neutral-500
                whitespace-nowrap
              "
            >
              Controle de Gastos
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <NavItem
            to="/pessoas"
            icon={Users}
            title="Pessoas"
          />
          <NavItem
            to="/transacoes"
            icon={ArrowLeftRight}
            title="Transações"
          />
          <NavItem
            to="/relatorios"
            icon={ClipboardList}
            title="Consulta de Totais"
          />
        </div>
      </div>
      <button
        onClick={toggleTheme}
        className={
          `
            w-full p-4 text-neutral-500 cursor-pointer
            flex gap-4 items-center justify-center
            border rounded-xl
            ${theme === "dark" ? "text-white" : ""}
          `
        }
      >
        {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
        {theme === "light" ? "Modo Escuro" : "Modo Claro"}
      </button>
    </div>
  )
}
