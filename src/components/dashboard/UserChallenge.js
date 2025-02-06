"use client";

import React, { useEffect, useState } from 'react';
import { deleteUserChallenge, fetchChallenges, getUserChallenge } from '@/utils/api/ChallengesApi';
import { Grid } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const { useBreakpoint } = Grid;

const UserChallenge = () => {
    const [challenges, setChallenges] = useState([]);
    const screens = useBreakpoint();

    useEffect(() => {
        const getChallenges = async () => {
            const data = await fetchChallenges();
            const userChallenges = await getUserChallenge();

            const updatedChallenges = data.map((challenge) => {
                const userChallenge = userChallenges?.find(
                    (userChallenge) => userChallenge.challenge_id === challenge.id
                );
                return {
                    ...challenge,
                    joined: userChallenge ? true : false,
                    join_challenge_id: userChallenge ? userChallenge.join_challenge_id : null,
                };
            });

            console.log(
                "Fetched Challenges Data:",
                data,
                userChallenges,
                updatedChallenges
            );

            setChallenges(updatedChallenges);
        };

        getChallenges();
    }, []);

    const handleQuit = async (id) => {
        console.log("Quitting challenge with ID:", id);
        const res = await deleteUserChallenge(id);
        if (res) {
            setChallenges((prevChallenges) =>
                prevChallenges.map((challenge) =>
                    challenge.join_challenge_id === id
                        ? { ...challenge, joined: false, join_challenge_id: null }
                        : challenge
                )
            );
            toast.success('Successfully quit challenge');
        } else {
            toast.error('Failed to quit challenge');
        }
        return;
    };

    // Filter only challenges where joined is true
    const joinedChallenges = challenges.filter(challenge => challenge.joined);
    console.log('Joined Challenges:', joinedChallenges);


    return (
        <>
            <ToastContainer />

            <div style={{ fontFamily: 'Arial, sans-serif', padding: screens.sm ? '20px' : "" }}>
                {joinedChallenges.length === 0 ? (
                    <p style={{ color: 'black', fontSize: screens.sm ? '18px' : '15px', margin: "auto" }}>No challenges available to display. Go to <a href='/challanges'>Challenges</a> and join</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: screens.sm ? '12px' : '8px', backgroundColor: '#0000ffeb', color: '#fff', textAlign: 'left' }}>Image</th>
                                <th style={{ padding: screens.sm ? '12px' : '8px', backgroundColor: '#0000ffeb', color: '#fff', textAlign: 'left' }}>Title</th>
                                <th style={{ padding: screens.sm ? '12px' : '8px', backgroundColor: '#0000ffeb', color: '#fff', textAlign: 'left' }}>Description</th>
                                <th style={{ padding: screens.sm ? '12px' : '8px', backgroundColor: '#0000ffeb', color: '#fff', textAlign: 'left' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {joinedChallenges.map((challenge) => (
                                <tr key={challenge.id} style={{ borderTop: '1px solid #ddd' }}>
                                    <td style={{ padding: screens.sm ? '12px' : '8px' }}>
                                        <img
                                            src={challenge.image_url}
                                            alt={challenge.title}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                objectFit: 'cover',
                                                borderRadius: '50%',
                                            }}
                                        />
                                    </td>
                                    <td style={{ padding: screens.sm ? '12px' : '8px', color: '#333' }}><strong>{challenge.title}</strong></td>
                                    <td style={{ padding: screens.sm ? '12px' : '8px', color: '#666' }}>{challenge.sub_title}</td>
                                    <td style={{ padding: screens.sm ? '12px' : '8px' }}>
                                        <button
                                            onClick={() => handleQuit(challenge.join_challenge_id)}
                                            style={{
                                                backgroundColor: '#0000ffeb',
                                                color: '#fff',
                                                padding: '8px 16px',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.3s ease',
                                            }}
                                            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                                            onMouseOut={(e) => e.target.style.backgroundColor = '#0000ffeb'}
                                        >
                                            Quit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default UserChallenge;
