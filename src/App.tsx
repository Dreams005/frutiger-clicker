import "./css/App.css";
import CounterBody from "./components/CounterBody";
import Header from "./components/Header";
import ParallaxBackground from "./components/ParallaxBackground";
import SocialShare from "./components/SocialShare";
import SoundCloudPlayer from "./components/SoundCloudPlayerWithVolume";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <>
      <ParallaxBackground>
        <Header />
        <CounterBody />
        <SocialShare />
        <SoundCloudPlayer />
      </ParallaxBackground>
      <div className="footer-wrapper">
        <Footer />
      </div>
    </>
  );
};

export default App;
