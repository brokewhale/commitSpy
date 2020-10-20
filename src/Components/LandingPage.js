import React from 'react';
import iphone2 from '../assets/iphone2.png';
import first from '../assets/61.png';
import second from '../assets/62.png';
import third from '../assets/63.png'



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
                    <p>Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, cum veritatis ut atque dolor est?
                         adipisicing elit. Pariatur sint animi quas quidem!</p>
                    <button>Get Started</button>
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

                            <img src={first} alt="project management" />
                        </div>
                        <h3>Project Management</h3>
                        <p>Manage your project efectively </p>
                    </div>
                    <div className="list">
                        <div className="list-logo">

                            <img src={second} alt="project management" />
                        </div>
                        <h3>Set A Goal</h3>
                        <p>You can set the amount of commit you want to achive within specicific time </p>
                    </div>
                    <div className="list">
                        <div className="list-logo">

                            <img src={third} alt="project management" />
                        </div>
                        <h3>Get Alert</h3>
                        <p>You will be alerted if you didn't meet the set goal through twitter or email </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default LandingPage;