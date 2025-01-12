import {
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { Layers, Shield, Wallet } from 'lucide-react';

export default function LoginComponent() {
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
                key={idx}
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
      <div className='right-container'>
        <div className='login-container flex flex-col items-center gap-8 bg-gray-50 shadow-lg p-8 rounded-lg max-w-md mx-auto'>
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
            <TextField label='Email' variant='outlined' fullWidth />
            <TextField
              label='Password'
              type='password'
              variant='outlined'
              fullWidth
            />
          </div>
          <div className='flex justify-between items-center w-full text-sm text-gray-600 mt-2'>
            <div>
              <FormControlLabel
                control={<Checkbox className='mr-2 text-black' />}
                label='Remember me'
              />
            </div>
            <Link href='#' className='text-blue-600 hover:underline'>
              Forgot Password?
            </Link>
          </div>
          <Button
            variant='contained'
            className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all'
          >
            Login
          </Button>
          <Typography variant='body2' className='text-gray-600 text-center'>
            Don’t have an account?{' '}
            <Link
              href='#'
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
