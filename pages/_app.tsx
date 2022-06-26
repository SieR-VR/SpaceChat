import { StreamChat } from 'stream-chat';
import '../styles/globals.css'

// import 'stream-chat-react/dist/css/index.css';
import './App.scss'

const ApiKey = process.env.STREAM_API_KEY;
export const client = StreamChat.getInstance(ApiKey);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp;
