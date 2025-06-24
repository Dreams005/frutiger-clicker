import "./css/App.css";
import CounterBody from "./components/CounterBody";
import Header from "./components/Header";
import ParallaxBackground from "./components/ParallaxBackground";
import SocialShare from "./components/SocialShare";
import SoundCloudPlayer from "./components/SoundCloudPlayerWithVolume";
import Footer from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App: React.FC = () => {
  return (
    <main>
      <ParallaxBackground>
        <Header />
        <CounterBody />
        <SocialShare />
        <SoundCloudPlayer />
      </ParallaxBackground>
      <div className="footer-wrapper">
        <Footer />
      </div>
      <SpeedInsights />
    </main>
  );
};

export default App;
