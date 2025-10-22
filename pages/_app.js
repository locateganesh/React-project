import '../styles/globals.css';
import Layout from '../components/layout/Layout'

// _app.js act as root component
function MyApp({ Component, pageProps }) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
