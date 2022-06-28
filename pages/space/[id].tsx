import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { StreamChat } from 'stream-chat';
import { useSession, signIn } from "next-auth/react";
import Head from "next/head";

import Chatroom from "../../components/chatroom";

const ApiKey = process.env.STREAM_API_KEY;
const client = StreamChat.getInstance(ApiKey);

export default function Space() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <Head>
          <title>SpaceTalk - {id}</title>
          <meta name="description" content="The webapp for Twitter space!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main style={{ flexDirection: 'column' }}>
          <div className='twitter-button-wrapper'>
            <button className="twitter-button" onClick={(e) => {
              e.preventDefault();
              signIn('twitter');
            }}>
              <Image src="/twitter.svg" alt="twitter" width={59} height={48} />
            </button>
            <p className="twitter-button-description">
              Login with Twitter!
            </p>
          </div>
          <div className='title-lower'>
            SpaceTalk!
          </div>
        </main>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>SpaceTalk - {id}</title>
        <meta name="description" content="The webapp for Twitter space!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Chatroom client={client} spaceId={id as string}/>
      </main>
    </>
  )
}
