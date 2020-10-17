import React from 'react';
// import app from '../assets/app.jpg'
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ipadview from '../assets/ipadview.jpg'
// const Wellcome = () => {
//     return (
//         <div className='welcome'>

//             <div className="welcome_grid">
//                 <div className="left">
//                     <div className="logo">
//                         CommitSpy
//                     </div>
//                     <div className="hero">
//                         <h3>Manage Your projects effectively.</h3>
//                         <p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                         Laborum architecto sed quo iste praesentium velit a, hic facere et accusamus ullam,
//                         </p>
//                     </div>

//                     <div className="getstarted">
//                         <h3>Get Started</h3>
//                         <div className="getstarted_btn">
//                             <Link to='/signin'> Login </Link>
//                             <Link to='/register'> Sign Up</Link>
//                         </div>
//                     </div>

//                 </div>
//                 <div className="right">

//                 </div>
//             </div>

//         </div>
//     );
// };

const Wellcome = () => {
    // const [slide1, setSlide1] = useState(true)
    // const [slide2, setSlide2] = useState(false)
    // // const[slide3, setSlide3]=useState(false)


    // const showSlide = () => {
    //     const a = [slide1, slide2]
    //     for (let i = 0; i < a.length; i++) {
    //         if (a[i]) {
    //             setSlide1(!slide1)
    //             setSlide2(!slide2)
    //         }
    //     }


    // }
    return (
        <div className="welcome">
            {/* <button className='tour-btn' onClick={showSlide}>take tour</button> */}
            <Carousel infiniteLoop autoPlay
            >
                <div className={`slides first `}>
                    {/* <img src={app} alt="test" /> */}
                    <div className="about-container">

                        <div className="about">
                            <h1>Manage your Projects</h1>
                            <hr />
                            <p>keep track of your projects with time</p>
                            {/* <Link to='/signin'> Get Started </Link> */}
                            <Link className='goLogin' to='/signin'>
                                <button >Get Started</button>
                            </Link>

                        </div>
                    </div>


                </div>

                <div className={`slides second `}>
                    {/* <img src={app} alt="test" /> */}
                    <div className="about-container">

                        <div className="about">
                            <h1 className='second-h1'>Timed Project</h1>
                            <hr />
                            <p>You can set the minimum number of commit per desired time</p>
                            {/* <Link to='/signin'> Get Started </Link> */}
                            <Link className='goLogin' to='/signin'>
                                <button className='second-btn'>Get Started</button>
                            </Link>

                        </div>
                    </div>


                </div>


                <div className={`slides first `}>
                    {/* <img src={app} alt="test" /> */}
                    <div className="about-container">

                        <div className="about">
                            <h1>Manage your Projects</h1>
                            <hr />
                            <p>keep track of your projects with time</p>
                            {/* <Link to='/signin'> Get Started </Link> */}
                            <Link className='goLogin' to='/signin'>
                                <button >Get Started</button>
                            </Link>

                        </div>
                    </div>


                </div>


            </Carousel>
            <div className="whyapp">
                <div className="left">

                    <h1>CommitSpy</h1>
                    <h2>About CommitSpy</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Labore, est? Suscipit id itaque natus, a, commodi eum dicta quidem deserunt opt
                io soluta consequatur ipsa atque repellat perferendis eveniet accusamus ducimus?</p>
                    <Link className='goLogin' to='/signin'>
                        <button className='second-btn'>Get Started</button>
                    </Link>

                </div>
                <div className="right">
                    <img src={ipadview} alt="padview" />
                </div>

            </div>
        </div>
    )
}
export default Wellcome;


