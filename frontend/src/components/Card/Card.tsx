import type { LucideIcon } from "lucide-react";

interface CardProps {
  title: string
  subTitle: string
  bgColor: string
  borderColor: string
  textColor: string
  icon: LucideIcon
}

export function Card({
  title,
  subTitle,
  bgColor,
  borderColor,
  textColor,
  icon: Icon,
}: CardProps) {
  return (
          <div
            className={`
              p-6 flex gap-6 items-center
              ${bgColor} border ${borderColor} rounded-xl
            `}
          >
            <div className="flex flex-col gap-2">
              <p className="font-bold text-base dark:text-white">
                {title}
              </p>
              <p className={`font-bold text-2xl ${textColor}`}>
                {subTitle}
              </p>
            </div>
            <Icon className={`${textColor}`} />
          </div>
  )
}
