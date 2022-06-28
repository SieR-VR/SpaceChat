import Head from 'next/head';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';

import Settings from '../components/settings';

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <Head>
          <title>SpaceTalk</title>
          <meta name="description" content="The webapp for Twitter space!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main style={{ flexDirection: 'column' }}>
          <div className='twitter-button-wrapper'>
            <button className="twitter-button" onClick={(e) => {
              e.preventDefault();
              signIn('twitter', null, { scope: 'tweet.read users.read space.read' });
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
    <div>
      <Head>
        <title>SpaceTalk - Settings</title>
        <meta name="description" content="The webapp for Twitter space!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Settings session={session} />
      </main>
    </div>

  )
}
