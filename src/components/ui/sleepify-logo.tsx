interface Props {
  sizes: string
}

export default function SleepifyLogo({ sizes = "93" }: Props) {
  return (
    <svg
      width={sizes}
      height={sizes}
      viewBox="0 0 93 94"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40.5946 21.6135L66.1062 47.125L40.5946 72.6366L40.5946 21.6135Z"
        fill="#746BEB"
        stroke="black"
        strokeWidth="1.84962"
      />
      <path
        d="M26.7221 21.6135L52.2336 47.125L26.7221 72.6366L26.7221 21.6135Z"
        fill="#FFC700"
        stroke="black"
        strokeWidth="1.84962"
      />
    </svg>
  )
}
