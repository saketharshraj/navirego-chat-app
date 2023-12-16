import {baseUrl} from "../utils/base";

export const getAllMessages = async (chatId, skip, limit) => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem("access-token")}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    const url = `${baseUrl}/v1/message?chatId=${chatId}&$limit=${limit}&$skip=${skip}&$sort[createdAt]=-1`;

    try {
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        return { success: true, data: result };
    } catch (error) {
        console.error('Error fetching messages:', error);
        return { success: false, error };
    }
};

