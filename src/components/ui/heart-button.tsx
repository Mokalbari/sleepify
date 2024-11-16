import { Heart } from "lucide-react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isFavorite: boolean
}

export default function HeartButton({
  isFavorite,
  className,
  type = "button",
  ...props
}: Props) {
  return (
    <button type={type} {...props}>
      {isFavorite ? (
        <Heart className={className} fill="red" stroke="red" />
      ) : (
        <Heart className={className} />
      )}
    </button>
  )
}
