import { Heart } from "lucide-react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isFavorite: boolean
}

export default function HeartButton({
  isFavorite,
  type = "button",
  ...props
}: Props) {
  return (
    <button type={type} {...props}>
      {isFavorite ? <Heart fill="red" stroke="red" /> : <Heart />}
    </button>
  )
}
