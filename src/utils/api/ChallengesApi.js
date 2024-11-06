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
