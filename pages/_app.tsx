import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css'

// import 'stream-chat-react/dist/css/index.css';

import './App.scss'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp;
