const apiUrl = 'http://localhost:5001/v1/upload-file';

export const uploadFile = async (file) => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem("access-token")}`);

    const formData = new FormData();
    formData.append('file', file, '[PROXY]');

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow',
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        const res = await response.json();
        return { success: res.result, data: res };
    } catch (error) {
        console.error('Error during file upload:', error);
        return { success: false, error };
    }
};
