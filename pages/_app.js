import '../styles/globals.css'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import NavBar from '../components/NavBar'
import { auth } from '../firebase'
import { useEffect, useState } from 'react'
import theme from '../css/theme'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    auth.onAuthStateChanged(user => {
      if (user) setUser(user)
      else setUser(null)
    })
  }, [])
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
        <script defer src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar user={user} />
        <Component {...pageProps} user={user} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
