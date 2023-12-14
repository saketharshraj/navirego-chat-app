const apiUrl = process.env.REACT_APP_BASE_URL;
export const verifyAccessToken = async (token) => {
    // try {
    //     const response = await fetch(`${apiUrl}/verifyToken`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ token }),
    //     });
    //
    //     return response.ok;
    // } catch (error) {
    //     console.error('Error verifying token:', error);
    //     return false;
    // }

    return true;
};
