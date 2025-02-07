import axios from 'axios';
import Cookies from 'js-cookie';

export const fetchChallenges = async () => {
    try {
        const token = Cookies.get('accessToken');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/challenges`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('Challenges API Response:', response.data);


        return response.data.data;
    } catch (error) {
        console.error('Error fetching challenges:', error);
        return [];
    }
};

export const joinChallenge = async (id) => {
    try {
        const token = Cookies.get('accessToken');
        const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/joinchallenges`,
            { challenge_id: id },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

        console.log('Join Challenge API Response:', response.data);

        return response.data;
    } catch (error) {
        console.error('Error joining challenge:', error);
        return null;
    }
};

export const getUserChallenge = async () => {
    try {
        const token = Cookies.get('accessToken');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/joinchallenges`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

        console.log('Join Challenge API Response:', response.data);

        return response.data.data;
    } catch (error) {
        console.error('Error joining challenge:', error);
        return null;
    }
};

export const deleteUserChallenge = async (id) => {
    try {
        const token = Cookies.get('accessToken');
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/joinchallenges/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('Delete User Challenge API Response:', response.data);

        return response.data;
    } catch (error) {
        console.error('Error deleting user challenge:', error);
        return null;
    }
};


export const fetchvideo = async () => {
    try {
        const token = Cookies.get('accessToken');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/challengesvideo/get`);


        return response.data.data;
    } catch (error) {
        console.error('Error joining challenge:', error);
        return null;
    }
};
