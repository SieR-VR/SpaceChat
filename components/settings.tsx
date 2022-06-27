import { useEffect, useState } from "react";
import Image from "next/image";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export default function Settings({ session }: { session: Session }) {
  const [userInfo, setUserInfo] = useState(session.user);
  useEffect(() => {
    (async () => {
      const userinfo = await fetch("/api/twitter/userinfo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      const userInfo = await userinfo.json();
      setUserInfo(userInfo);
    })();
  }, []);

  return (
    <div>
      {`${session.user.name}`}
      <Image src={session.user.image} alt={session.user.name} width={100} height={100} />
      {`${session.accessToken}`}
      <button onClick={(e) => {
        e.preventDefault();
        signOut();
      }}>
        Sign out
      </button>
    </div>
  )
}
