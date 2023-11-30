import '@/styles/globals.css'
import '../styles/dhtmlxscheduler_material_eventsbuz.css'
import {SessionProvider} from 'next-auth/react'
import {Provider } from 'react-redux'
import {Store} from '../Redux/store'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import 'react-calendar/dist/Calendar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';



export default function App({ Component, pageProps, session }) {
  
  return (
    <SessionProvider session={session}>
      <Provider store={Store}>
          <ToastContainer />
          <Theme>
            <Component {...pageProps} />
            </Theme>
      </Provider>
    </SessionProvider>
  )
}
