// api.js
const apiUrl = 'http://localhost:5001/v1/message';

export const getAllMessages = async (userId, offset, limit) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem("access-token")}`);

    const raw = JSON.stringify({ id: userId });
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        // body: raw,
        redirect: 'follow',
    };

    try {
        const response = await fetch(`${apiUrl}?sort_by=createdAt&offset=${offset}&limit=${limit}`, requestOptions);
        const result = await response.json();
        return { success: true, data: result.data };
    } catch (error) {
        console.error('Error fetching messages:', error);
        return { success: false, error };
    }
};
