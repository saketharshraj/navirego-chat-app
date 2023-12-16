import {baseUrl} from "../utils/base";

export const getAllFiles = async (chatId) => {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${localStorage.getItem("access-token")}`);

    const requestOptions = {
        method: 'GET',
        headers,
        redirect: 'follow',
    };

    try {
        const response = await fetch(`${baseUrl}/v1/message?chatId=${chatId}&messageType=121&messageType=122`, requestOptions);
        const result = await response.json();
        return { success: true, data: result.data };
    } catch (error) {
        console.error('Error fetching files:', error);
        return { success: false, error };
    }
};
