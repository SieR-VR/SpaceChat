import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Chatroom from '../components/chatroom';
import { StreamChat } from 'stream-chat';

const ApiKey = process.env.STREAM_API_KEY;
const client = StreamChat.getInstance(ApiKey);

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Chatroom client={client}/>
      </main>
    </div>
  )
}