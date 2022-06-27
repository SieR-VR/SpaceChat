import { Session } from "next-auth";

export default function Settings({ session }: { session: Session }) {
    return (
        <div>
            {`${session}`}
        </div>
    )
}