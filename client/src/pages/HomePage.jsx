import React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "../scripts/useTheme";
import Header from "../containers/Header";
import Carusel from "../components/Carusel";
import CaruselMobile from "../components/CaruselMobile";
import Details from "../components/Details";
import MixPhoto from "../containers/MixPhoto";
import Footer from "../components/Footer";


const style = {
  headerMode: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 76,
    width: '100%',
    backdropFilter: 'brightness(90%) blur(20px)',
  }
}

const HomePage = (props) => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const theme = useTheme();


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section>
      <Header
        inverse="text-light bg-white"
        fileMod='bg-transparent'
        theme={theme}
        style={style.headerMode}
        disconnection={props.disconnection}
        status={props.status}
      />

      {windowWidth > 600 ?
        <Carusel
          theme={theme}
        /> :
        <CaruselMobile
          theme={theme}
        />
      }
      <Details
        theme={theme}
      />
      <MixPhoto
        theme={theme}
        loadingData={props.loadingData}
        sendData={props.sendData}
      />
      <Footer
        theme={theme}
      />

    </section >
  )
}


export default HomePage;