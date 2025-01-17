import axios from 'axios';

export async function LoginService(email: string, password: string) {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      email,
      password,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
