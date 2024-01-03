import axios, { AxiosError } from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9000/api',
});

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {           
            console.error('Error response:', error.response.data);
        } else if (error.request) {           
            console.error('No response received:', error.request);
        } else {           
            console.error('Error setting up the request:', error.message);
        }      
        return Promise.reject(error);
    }
);

// async function getForLogin(url: string, email: string, password: string) {
//     const fullUrl = `${url}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
//     return (await api.get(fullUrl)).data;
//   }

// async function getForLogin(url: string, email: string, password: string) {
//     try {
//       // Use getUserByEmail to fetch the user by email
//       const user = await getUserByEmail(email, password);
  
//       // Check if the user exists and the password matches
//       if (user && user.UserPassword === password) {
//         // If successful, perform the API call (if needed)
//         const fullUrl = `${url}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
//         return (await api.get(fullUrl)).data;
//       } else {
//         // If user or password doesn't match, handle accordingly
//         return { success: false };
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       throw error;
//     }
//   }

async function get(url: string, queryParams: any = null, id: any = null) {
    let newUrl = !id ? url : url + "/" + id;
    return (await api.get(newUrl, { params: queryParams })).data;
}

async function getForLogin(url: string, email: string) {
    try {
      const fullUrl = `${url}/${email}`;
      
      const response = await api.post(fullUrl);
        console.log(`fullurl = ${fullUrl}`);
        console.log(`response din call = ${JSON.stringify(response.data)}`)
      return response.data;
        // return JSON.stringify(response.data);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }
  


async function post(url: string, item: any) {
    return (await api.post(
        url,
        item,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )).data;
}

async function put(url: string, id: any, item: any) {
    return (await api.put(
        url + "/" + id,
        item,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )).data;
}

async function remove(url: string, id: any) {
    return (await api.delete(
        url + "/" + id
    )).data;
}

export { get, post, put, remove, getForLogin } 


