import { ChevronsUpDown } from "lucide-react";
import type { ReactNode } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  required?: boolean;
  children: ReactNode;
}

export function Select({
  label,
  required,
  children,
  ...props
}: SelectProps) {

  return (
    <div className="flex flex-col gap-4 relative">
      <label className="text-base font-bold dark:text-white">
        {label}

        {required && (
          <span className="text-red-500"> *</span>
        )}
      </label>

      <select
        {...props}
        className="
          w-full p-4
          border border-neutral-400 rounded-xl outline-0
          text-black dark:text-neutral-500
          appearance-none outline-none cursor-pointer
        "
      >
        {children}
      </select>
        <ChevronsUpDown
          size={20}
          className="
            absolute
            right-4 top-15
            text-neutral-500
          "
        />
    </div>
  )
}
