import React from 'react';
import iphone2 from '../assets/iphone4.png';
import first from '../assets/61.png';
import second from '../assets/62.png';
import third from '../assets/63.png'
import { Link } from 'react-router-dom';
import Donateng from '../assets/logo-dark.png'
import Bgc from '../assets/bgc.jpeg'




const LandingPage = () => {
    return (
        <div className='landingpage'>
            <div className="nav">
                <div className="brand">CommitSpy</div>
                <button><a href="'mailto:commitspy@gmail.com">Contact</a></button>
            </div>
            <div className="landing-intro">
                <div className="left">
                    <div className="title">

                        <h1>CommitSpy</h1>
                        <h2>The Perfect Motivation.</h2>
                    </div>
                    <p>Aren't you tired of abandoning <span role="img" aria-label="Grimancy face">😬</span> your projects? Verily, the right motivation can help you.
                    </p><p>CommitSpy tracks your project repositories and donates <span role="img" aria-label="Grimancy face">🤑</span> to a charity on your behalf <span role="img" aria-label="Grimancy face">😬</span> when you fail to meet up with your commit goals in a preset time interval⏳.
                    </p>
                    <p>This way, the world <span role="img" aria-label="Grimancy face">🗺</span> benefits even when you are lazy <span role="img" aria-label="Grimancy face">🤓</span>.
                         </p>


                    <p>Get up to 10 commitCoins when you signup.</p>
                    <Link className='getstartedbtn' to='/signin'> Get Started</Link>
                </div>
                <div className="right">
                    <img src={iphone2} alt="iphone" />
                </div>
            </div>

            <div className="under"></div>

            <div className="features">
                <h1>How does it work?</h1>
                <div className="features-grid">

                    <div className="list">
                        <div className="list-logo">

                            <img src={first} alt="project management" />
                        </div>
                        <h3>Set A Goal</h3>
                        <p>Set the amount of commit to be achieved within a specific time </p>
                    </div>

                    <div className="list">
                        <div className="list-logo">

                            <img src={third} alt="project management" />
                        </div>
                        <h3>Charity</h3>
                        <p>A commitCoin is donated on your behalf when you fail to achieve your goal</p>
                    </div>
                    <div className="list">
                        <div className="list-logo">

                            <img src={second} alt="project management" />
                        </div>
                        <h3>Get Alert</h3>
                        <p>Be alerted via twitter or email to keep you informed</p>
                    </div>

                </div>
            </div>

            <section className='charity'>
                <h1>Proposed Beneficiaries</h1>

                <div className="imglogo-grid">

                    <div className="imglogo">
                        <img src={Donateng} alt="Donate.ng" />

                    </div>
                    <div className="imglogo">
                        <img src={Bgc} alt="Donate.ng" />

                    </div>
                    <div className="imglogo">
                        <img src={Donateng} alt="Donate.ng" />

                    </div>
                    <div className="imglogo">
                        <img src={Bgc} alt="Donate.ng" />

                    </div>
                </div>
            </section>

        </div>
    );
};

export default LandingPage;