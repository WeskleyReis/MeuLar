interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

export function Input({
  label,
  required,
  ...props
}: InputProps) {

  return (
    <div className="flex flex-col gap-4">
      <label className="text-base font-bold dark:text-white">
        {label}

        {required && (
          <span className="text-red-500"> *</span>
        )}
      </label>

      <input
        {... props}
        className="
          w-full p-4
          border border-neutral-400
          rounded-xl outline-none
          placeholder:text-black dark:placeholder:text-neutral-500
        "
      />
    </div>
  )
}
