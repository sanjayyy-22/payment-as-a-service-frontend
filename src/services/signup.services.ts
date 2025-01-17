import { SignupDetails } from '../components/SignupComponent';
import axios from 'axios';

export async function SignupService(details: SignupDetails) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      city,
      region,
      companyName,
      businessType,
      registrationNumber,
      accountNumber,
      routingNumber,
      taxId,
    } = details;

    const response = await axios.post(
      'http://localhost:3000/api/auth/register',
      {
        name: `${firstName} ${lastName}`,
        email,
        password,
        city,
        region,
        companyName,
        businessType,
        registrationNumber,
        accountNumber,
        routingNumber,
        taxId,
      }
    );

    if (response.status === 201) {
      return response.data;
    }
    throw new Error(response.data.message);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
