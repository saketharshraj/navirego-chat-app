import {baseUrl} from "../utils/base";

export const getAllChats = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem("access-token")}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    try {
        const response = await fetch(`${baseUrl}/v1/chat?$sort[createdAt]=-1`, requestOptions);
        const result = await response.json();
        return { success: true, data: result.data };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, error };
    }
};
