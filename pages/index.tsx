import Head from 'next/head';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';

import Settings from '../components/settings';
import { MouseEventHandler } from 'react';

export default function Home() {
  const { data: session } = useSession();

  if (typeof window === 'undefined') {
    return null;
  }

  function twitterSignIn(e: any) {
    e.preventDefault();
    signIn('twitter', null, { scope: 'tweet.read users.read space.read' });
  }

  if (!session) {
    return (
      <>
        <Head>
          <title>SpaceTalk</title>
          <meta name="description" content="The webapp for Twitter space!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <div className='twitter-button-wrapper'>
            <a className="twitter-button" onClick={twitterSignIn}>
              <Image src="/twitter.svg" alt="twitter" width={59} height={48} />
            </a>
            <p className="twitter-button-description">
              Login with Twitter!
            </p>
          </div>
          <div className='title-lower'>
            SpaceTalk!
          </div>
        </main>
      </>
    )
  }

  alert(session.expires);
  return (
    <>
      <Head>
        <title>SpaceTalk - Settings</title>
        <meta name="description" content="The webapp for Twitter space!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ width: `${window.innerWidth}px`, height: `${window.innerHeight}px`}}>
        <Settings session={session} />
      </main>
    </>

  )
}
