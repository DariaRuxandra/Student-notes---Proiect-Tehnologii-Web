import axios, { AxiosError, AxiosResponse } from 'axios';

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

async function get(url: string, queryParams: any = null, id: any = null) {
    let newUrl = !id ? url : url + "/" + id;
    return (await api.get(newUrl, { params: queryParams })).data;
}

// Example getCoursesForUser function
async function getCoursesForUser(userId: number) {
    try {
      const url = `/user/${userId}/courses`;
      return(await api.get(url)).data; 
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }


  
  
  
  
  

//verifica doar daca exista mail-ul
// async function getIdByEmail(url: string, email: string) {
//     try {
//       const fullUrl = `${url}/${email}`;
      
//       const response = await api.post(fullUrl);
//         console.log(`fullurl = ${fullUrl}`);
//         console.log(`response din call = ${JSON.stringify(response.data)}`)
//       return response.data;
//         // return JSON.stringify(response.data);
//     } catch (error) {
//       console.error('Error during login:', error);
//       throw error;
//     }
// }

async function getForLogin(url: string, email: string, password: string) {
    try {
      const fullUrl = `${url}/${email}/${password}`;
      const response = await api.post(fullUrl);
      return response.data;
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

export { get, post, put, remove, getForLogin, getCoursesForUser } 

