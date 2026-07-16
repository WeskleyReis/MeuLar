interface TableRowProps {
  children: React.ReactNode;
  template: string;
}

export function TableRow({
  children,
  template,
}: TableRowProps) {
  return (
    <div
      className="
        px-6 h-16
        border-b border-neutral-200
        last:border-b-0
        grid items-center
      "
      style={{ gridTemplateColumns: template }}
    >
      {children}
    </div>
  );
}
