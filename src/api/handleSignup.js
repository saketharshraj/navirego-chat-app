const apiUrl = process.env.REACT_APP_BASE_URL;
export const handleSignup = async (name, description, email, password) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            description,
            email,
            password,
        }),
    };

    try {
        const response = await fetch(`${apiUrl}/v1/user`, requestOptions);
        const result = await response.text();
        return { success: true, data: result };
    } catch (error) {
        console.error('Error during user creation:', error);
        return { success: false, error };
    }
};
