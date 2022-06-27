import { StreamChat } from 'stream-chat';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css'

// import 'stream-chat-react/dist/css/index.css';
import './App.scss'

const ApiKey = process.env.STREAM_API_KEY;
export const client = StreamChat.getInstance(ApiKey);

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
       <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp;
