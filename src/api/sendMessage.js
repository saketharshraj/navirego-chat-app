const apiUrl = 'http://localhost:5001/v1/message';

export const sendMessage = async (message, messageType, chatId, fileUrl) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem("access-token")}`);

    let raw = {
        message,
        messageType,
    };

    if(chatId.length > 0){
        raw = {...raw, chatId}
    }
    if(fileUrl){
        raw = {...raw, fileUrl}
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
