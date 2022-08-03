import '../styles/globals.scss'
import Head from 'next/head'
import Layout from '../components/layout.component'
import { Provider, useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { wrapper} from "../redux/store"


function MyApp({ Component, pageProps }) {

  const store = useStore((state) => state);
  return(
  <PersistGate loading={null} persistor={store.__persistor}>
    <Head>
    <title>deNotifier</title>
    <meta name="description" content="RSS Notifier" />
    <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
    <Component {...pageProps} />
    </Layout>
  </PersistGate>
  )
}

export default wrapper.withRedux(MyApp)