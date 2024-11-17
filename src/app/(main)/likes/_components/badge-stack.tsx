import Image from "next/image"
import fakePersonA from "../../../../../public/25.jpg"
import fakePersonB from "../../../../../public/34.jpg"
import fakePersonC from "../../../../../public/76.jpg"

export default function BadgeStack() {
  return (
    <div className="flex">
      <Image
        src={fakePersonA}
        width={128}
        height={128}
        alt="random person"
        style={{
          maxWidth: "36px",
          border: "1px solid black",
          borderRadius: "50%",
          zIndex: 3,
        }}
      />
      <Image
        src={fakePersonB}
        width={128}
        height={128}
        alt="random person"
        style={{
          maxWidth: "36px",
          border: "1px solid black",
          borderRadius: "50%",
          marginLeft: "-15%",
          zIndex: 2,
        }}
      />
      <Image
        src={fakePersonC}
        width={128}
        height={128}
        alt="random person"
        style={{
          maxWidth: "36px",
          border: "1px solid black",
          borderRadius: "50%",
          marginLeft: "-15%",
        }}
      />
    </div>
  )
}
