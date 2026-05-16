import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';
export const getUserProfile = async () =>
{
      console.log(" Fetching User Details from Backend: /api/user-info/:id");
    const response = await axios.get(`${BACKEND_URL}/api/user/profile`,
        {
            withCredentials: true, // is using cookies/sessions
        }
    );
    return response.data;
};