interface TableHeaderProps {
  columns: string[];
  template: string;
}

export function TableHeader({
  columns,
  template,
}: TableHeaderProps) {
  return (
    <div
      className="px-6 h-16 bg-neutral-300 dark:bg-neutral-500 grid items-center"
      style={{ gridTemplateColumns: template }}
    >
      {columns.map((column) => (
        <p key={column} className="font-bold">
          {column}
        </p>
      ))}
    </div>
  );
}
