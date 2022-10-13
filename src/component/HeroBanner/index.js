import './style.css'
import DashboardButton from '../Header/DashboardButton';
import mobile from '../../images/mobile.png';
import mobileBackground from '../../images/mobile-background.png';
const HeroBanner = () => {
    let btnText = [
        {
        title:"Dashboard",
        url:"/dashboard"
        },
        {
        title:"Share",
        url:"/share"
        }
    ];
  return (
    <>
        <section className='hero'>
            <div className="container">
                <div className="hero-banner">
                    <div className="banner-content">
                        <h2>Track Crypto <span>Real Time.</span></h2>
                        <p>Track crypto through a public api in real time. Visit the dashboard to do so!</p>
                        <div className="banner-btn">
                            <DashboardButton text={btnText}/>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src={mobile} alt="" className="mobile"/>
                        <img src={mobileBackground} alt="" className="mobile-background"/>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default HeroBanner