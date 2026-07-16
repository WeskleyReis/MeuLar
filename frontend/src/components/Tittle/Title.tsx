interface TitleProps {
  title: string;
  desc: string;
}

export function Title({
  title,
  desc,
}: TitleProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-4xl font-bold dark:text-white">
        {title}
      </p>
      <p className="text-base text-neutral-500">
        {desc}
      </p>
    </div>
  )
}
