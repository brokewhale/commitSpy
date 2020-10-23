import React from 'react';
import iphone2 from '../assets/iphone4.png';
import first from '../assets/61.png';
import second from '../assets/62.png';
import third from '../assets/63.png'
import { Link } from 'react-router-dom';




const LandingPage = () => {
    return (
        <div className='landingpage'>
            <div className="nav">
                <div className="brand">Commitspy</div>
                <button>Contact</button>
            </div>
            <div className="landing-intro">
                <div className="left">
                    <div className="title">

                        <h1>Commitspy</h1>
                        <h2>Project Manager</h2>
                    </div>
                    <p>Aren't you tired of abandoning <span role="img" aria-label="Grimancy face">😬</span> your projects? Do you also love hopping from one project to another without completing any.
                    </p><p>CommitSpy helps you track your project repositories and "punishes"<span role="img" aria-label="Grimancy face">😬</span> you when you fail to meetup with your commit goals in a preset time interval⏳.
                    The punishment is in form of a mildly harsh(cheeky)  <span role="img" aria-label="Grimancy face">😈</span> tweet/email <span role="img" aria-label="Grimancy face">📨</span> or a donation <span role="img" aria-label="Grimancy face">🤑</span> from your wallet to a charity (if you need more "motivation").
                    </p><p>This way, the world <span role="img" aria-label="Grimancy face">🗺</span> benefits from you even when you are lazy<span role="img" aria-label="Grimancy face">🤓</span>.
                         </p>

                    <button> <Link to='/signin'> Get Started</Link></button>
                </div>
                <div className="right">
                    <img src={iphone2} alt="iphone" />
                </div>
            </div>

            <div className="under"></div>

            <div className="features">
                <h1>How it Works</h1>
                <div className="features-grid">

                    <div className="list">
                        <div className="list-logo">

                            <img src={second} alt="project management" />
                        </div>
                        <h3>Set A Goal</h3>
                        <p>You can set the amount of commit you want to archive within specific time </p>
                    </div>
                    <div className="list">
                        <div className="list-logo">

                            <img src={third} alt="project management" />
                        </div>
                        <h3>Get Alert</h3>
                        <p>You will be alerted if you don't meet the set goal through twitter or email </p>
                    </div>
                    <div className="list">
                        <div className="list-logo">

                            <img src={first} alt="project management" />
                        </div>
                        <h3>Charity</h3>
                        <p>Donation of a Fixed Stipend on your behalf to a Charity when you don't meetup with your commit goals. </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default LandingPage;