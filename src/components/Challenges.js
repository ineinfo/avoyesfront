"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchChallenges } from "@/utils/api/ChallengesApi";
import defaultImg from "../../public/defaultImg.jpg";
import { Grid } from 'antd';


const {useBreakpoint} = Grid
const Challenges = () => {
    const [challenges, setChallenges] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const screens = useBreakpoint()

    useEffect(() => {
        const getChallenges = async () => {
            const data = await fetchChallenges();
            console.log('Fetched Challenges Data:', data);
            setChallenges(data);
        };

        getChallenges();
    }, []);

    useEffect(() => {
        const handleTouchStart = (e) => {
            const challengeElement = e.target.closest('.challange-1');
            if (challengeElement) {
                const joinButton = challengeElement.querySelector('.join-challange-btn');
                if (joinButton.style.opacity === '1') {
                    joinButton.style.opacity = '0';
                    joinButton.style.bottom = '5px';
                } else {
                    joinButton.style.opacity = '1';
                    joinButton.style.bottom = '-32px';
                }
            }
        };

        document.addEventListener('touchstart', handleTouchStart);

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
        };
    }, []);

    const filteredChallenges = challenges.filter(challenge =>
        challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (challenge.sub_title && challenge.sub_title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };







    return (
        <>
            <div className="challanges-breadcrumb " style={{ marginTop: '1rem' }}>
                <div className="container-fluid p-0">
                    <div className="bread-img">
                        <img src="/challanges-breadcrumb.png" alt="" style={{objectFit:screens.sm?"":"cover"}} />
                        <div className="head-sec text-center" style={{top:screens.sm ? '' : '5%', right:screens.sm ? '' : '5px'}} >
                            <div className="head">
                                <h1 style={{lineHeight:screens.sm ? '' : '15px'}}>Join Our Exciting Challenges!</h1>
                            </div>
                            <div className="para-line">
                                <p style={{lineHeight:screens.sm ? '' : '40px'}}>Find A Challenge That Suits You And Start Achieving Your Goals Today.</p>
                            </div>
                            <div className="breadcrumb-btn">
                                <button type="button" className="challange-btn">EXPLORE CHALLENGES</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="challanges-searchbar py-5">
                <div className="container">
                    <div className="input-container-3" style={{ width: '100%' }}>
                        <i className="fa fa-search"></i>
                        <input
                            type="text"
                            placeholder="Find a Challenge..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="challanges-sec-main pb-5 pt-3">
                <div className="container">
                    <div className="row">
                        {filteredChallenges.length > 0 ? (
                            filteredChallenges.map((challenge) => (
                                <div className="col-xl-3 col-lg-6 col-md-6" key={challenge.id}>
                                    <div className="challange-1">
                                        <div className="img fixed-size">
                                            <img src={challenge.image_url} alt={challenge.title} />
                                            {/* <img src={defaultImg.src} alt={challenge.title} /> */}

                                        </div>
                                        {/* <div className="share-icon">
                                            <Link href="#" className="text-decoration-none"><i className="bi bi-share"></i></Link>
                                        </div> */}
                                        <div className="challange-box">
                                            <div className="head">
                                                <h3 className="mb-0"style={{ minHeight: '30px' }}>{challenge.title}</h3>
                                            </div>
                                            <div className="info d-flex">
                                                <i className="fa-solid fa-layer-group"></i>
                                                <p className="m-0"style={{ minHeight: '60px' }}>{challenge.sub_title}</p>
                                            </div>
                                            <div className="challanges-date d-flex align-items-center">
                                                <i className="bi bi-calendar-week"></i>
                                                <p className="m-0">{formatDate(challenge.start_date)} To {formatDate(challenge.end_date)}</p>
                                            </div>
                                            <div className="participents d-flex align-items-center">
                                                <div className="imgs d-flex">
                                                    <img src="/participent-1.png" alt="" className="chlng-img-1" />
                                                    <img src="/participent-2.png" alt="" className="chlng-img-2" />
                                                    <img src="/participent-3.png" alt="" className="chlng-img-3" />
                                                </div>
                                                <div className="total-participents">
                                                    <p className="mb-0">{challenge.total_participants} Participants</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="join-challange-btn">
                                            <Link href="#"><button type="button">JOIN CHALLENGE</button></Link>
                                        </div>
                                    </div>
                                </div>
                            ))

                        ) : (
                            <div className="centered-message" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
                                No Challenges Found Of This Search.
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}

export default Challenges;
