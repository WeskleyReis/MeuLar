interface BadgeProps {
  tipo: number;
}

export function Badge({ tipo}: BadgeProps) {
  const isReceita = tipo === 1

  return (
    <span
      className={`
        text-[10px] px-3 py-1
        rounded-full
        text-white font-bold
        ${isReceita ? "bg-green-600" : "bg-red-500"}
      `}
    >
      {isReceita ? "RECEITA" : "DESPESA"}
    </span>
  )
}
