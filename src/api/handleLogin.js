const apiUrl = "http://localhost:5001";
export const handleLogin = async (email, password) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
            strategy: 'local',
        }),
    };

    try {
        const response = await fetch(`${apiUrl}/authentication`, requestOptions);
        const result = await response.json();
        if (response.ok) {
            return { success: true, data: result };
        } else {
            return { success: false, error: result };
        }
    } catch (error) {
        console.error('Error during login:', error);
        return { success: false, error };
    }
};
