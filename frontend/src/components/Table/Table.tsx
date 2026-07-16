interface TableProps {
  children: React.ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <div
      className="
        h-fit
        border border-neutral-400
        rounded-xl
        dark:bg-neutral-800
        dark:text-white
        flex-1 flex flex-col
      "
    >
      {children}
    </div>
  );
}
