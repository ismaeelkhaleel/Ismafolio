const BASE_URL = "http://localhost:5000";

export const loginAPI = async(username, password) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username, password}),
    });
    return response;
};