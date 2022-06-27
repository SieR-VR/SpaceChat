import { Session } from "next-auth";
import Image from "next/image";

export default function Settings({ session }: { session: Session }) {
    return (
        <div>
            {`${session.user.name}`}
            <Image src={session.user.image} alt={session.user.name} width={100} height={100}/>
            {`${session.accessToken}`}
        </div>
    )
}
