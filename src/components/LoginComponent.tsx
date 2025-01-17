import {
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { Layers, Shield, Wallet } from 'lucide-react';

import { LoginService } from '../services/login.services';
import { useState } from 'react';

interface LoginDetails {
  email: string;
  password: string;
  checked: boolean;
}

interface ErrorDetails {
  email: string;
  password: string;
  checked: string;
}

export default function LoginComponent() {
  const [error, setError] = useState<ErrorDetails>({
    email: '',
    password: '',
    checked: '',
  });

  const [details, setDetails] = useState<LoginDetails>({
    email: '',
    password: '',
    checked: false,
  });

  const handleSubmit = async () => {
    const isEmailValid = validateEmail(details.email);
    const isPasswordValid = validatePassword(details.password);

    if (!isEmailValid || !isPasswordValid || !details.checked) {
      setError({
        email: !isEmailValid ? 'Please enter a valid email address.' : '',
        password: !isPasswordValid
          ? 'Password must be at least 8 characters long.'
          : '',
        checked: !details.checked
          ? 'Please agree to the terms of service.'
          : '',
      });
      return;
    }

    setError({ email: '', password: '', checked: '' });
    const response = await LoginService(details.email, details.password);
    console.log(response);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const features = [
    {
      icon: <Wallet className='h-6 w-6' />,
      title: 'Payment Gateway',
      desc: 'Accept global payments',
    },
    {
      icon: <Shield className='h-6 w-6' />,
      title: 'Secure Vault',
      desc: 'Flexible and secure vaults',
    },
    {
      icon: <Layers className='h-6 w-6' />,
      title: 'Multi-Providers',
      desc: 'Multiple payment providers',
    },
  ];

  return (
    <div className='main-container'>
      <div className='bg-blue-100 left-container'>
        <div className='w-full lg:w-1/2 max-w-md'>
          <div className='mb-8'>
            <h1 className='text-4xl font-bold text-gray-900 mb-4'>
              Next-Gen Payment Platform
            </h1>
            <p className='text-gray-600 text-lg'>Secure. Scalable. Smart.</p>
          </div>

          <div className='space-y-6'>
            {features.map((feature, idx) => (
              <div
                key={feature.title + idx}
                className='group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100'
              >
                <div className='flex items-start space-x-4'>
                  <div
                    className='bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition-colors'
                    style={{
                      color: 'black',
                    }}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900 mb-1'>
                      {feature.title}
                    </h3>
                    <p className='text-gray-600'>{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='right-container bg-gray-50'>
        <div className='login-container flex flex-col items-center gap-8  shadow-lg p-8 rounded-lg max-w-md mx-auto'>
          <div className='text-center'>
            <Typography
              variant='h4'
              className='text-4xl font-extrabold text-gray-800 mb-2'
            >
              Welcome Back!
            </Typography>
            <Typography
              variant='subtitle1'
              className='text-gray-600 text-lg'
              gutterBottom
            >
              Login to your account and continue
            </Typography>
          </div>
          <div className='flex flex-col gap-6 w-full'>
            <TextField
              required
              label='Email'
              variant='outlined'
              value={details.email}
              error={Boolean(error.email)}
              helperText={error.email}
              onChange={(e) => {
                setDetails({ ...details, email: e.target.value });
                setError({ ...error, email: '' });
              }}
              fullWidth
            />
            <TextField
              required
              label='Password'
              type='password'
              variant='outlined'
              value={details.password}
              error={Boolean(error.password)}
              helperText={error.password}
              onChange={(e) => {
                setDetails({ ...details, password: e.target.value });
                setError({ ...error, password: '' });
              }}
              fullWidth
            />
          </div>
          <div className='flex justify-between items-center w-full text-sm text-gray-600 mt-2'>
            <div className='flex flex-col items-start'>
              <FormControlLabel
                onChange={(e) => {
                  console.log(e.target);
                }}
                control={
                  <Checkbox
                    onChange={(e) => {
                      setDetails({ ...details, checked: e.target.checked });
                    }}
                    className='mr-2 text-black'
                  />
                }
                label='I agree to the Terms of Service'
              />
              {error.checked && (
                <Typography variant='body2' color='error' className='ml-4 mt-1'>
                  {error.checked}
                </Typography>
              )}
            </div>
            <Link
              href='/forgot-password'
              className='text-blue-600 hover:underline'
            >
              Forgot Password?
            </Link>
          </div>
          <Button
            onClick={handleSubmit}
            variant='contained'
            className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all'
          >
            Login
          </Button>
          <Typography variant='body2' className='text-gray-600 text-center'>
            Don’t have an account?{' '}
            <Link
              href='/signup'
              className='text-blue-600 font-semibold hover:underline'
            >
              Sign up
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
}
