import React from 'react'

//COMPONENTS
import Header from '../components/Header'

//STYLE
import '../css/styles.css'

const MyApp = ({ Component, pageProps }) => {
  return(
    <div>
      <Header/>
      <div className="container mx-auto">
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp