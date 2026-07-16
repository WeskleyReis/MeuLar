interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

export function TableCell({
  children,
  className = "",
}: TableCellProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
