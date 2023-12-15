const apiUrl = 'http://localhost:5001/v1/message';

export const sendMessage = async (message, messageType, chatId) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem("access-token")}`);

    let raw = {
        message,
        messageType,
    };

    if(chatId){
        raw = {...raw, chatId}
    }

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow',
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        const result = await response.json();
        return { success: true, data: result };
    } catch (error) {
        console.error('Error sending message:', error);
        return { success: false, error };
    }
};
