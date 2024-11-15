interface Props {
  sizes: string
}

export default function Sun({ sizes = "75" }: Props) {
  return (
    <svg
      width={sizes}
      height={sizes}
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Elément décoratif</title>
      <circle
        cx="37.8334"
        cy="37.8334"
        r="35.8633"
        stroke="black"
        strokeWidth="2.47333"
        strokeDasharray="4.95 4.95"
      />
      <circle
        cx="37.8334"
        cy="37.8334"
        r="17.3133"
        fill="#FFC700"
        stroke="black"
        strokeWidth="2.47333"
      />
    </svg>
  )
}
