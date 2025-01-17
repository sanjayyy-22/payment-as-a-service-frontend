import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import { Building2, CheckCircle, CreditCard, User } from 'lucide-react';

import LeftPanel from './LeftPanelComponent';
import { SignupService } from '../services/signup.services';
import { useState } from 'react';

export interface SignupDetails {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  city: string;
  region: string;

  // Business Information
  companyName: string;
  businessType: string;
  registrationNumber: string;

  // Payment Information
  accountNumber: string;
  routingNumber: string;
  taxId: string;

  // Terms
  termsAccepted: boolean;
}

interface ErrorState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  city: string;
  region: string;
  businessType: string;
  registrationNumber: string;
  accountNumber: string;
  routingNumber: string;
  taxId: string;
  termsAccepted: string;
}

const SignupComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [details, setDetails] = useState<SignupDetails>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    region: '',
    companyName: '',
    businessType: '',
    registrationNumber: '',
    accountNumber: '',
    routingNumber: '',
    taxId: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<ErrorState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    region: '',
    companyName: '',
    businessType: '',
    registrationNumber: '',
    accountNumber: '',
    routingNumber: '',
    taxId: '',
    termsAccepted: '',
  });

  const steps = [
    {
      label: 'Personal Information',
      icon: <User className='w-6 h-6' />,
    },
    {
      label: 'Business Details',
      icon: <Building2 className='w-6 h-6' />,
    },
    {
      label: 'Payment Setup',
      icon: <CreditCard className='w-6 h-6' />,
    },
    {
      label: 'Review & Submit',
      icon: <CheckCircle className='w-6 h-6' />,
    },
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateStep = (step: number): boolean => {
    let isValid = true;
    const newErrors = { ...errors };

    switch (step) {
      case 0:
        isValid = validatePersonalInformation(newErrors);
        break;
      case 1:
        isValid = validateBusinessDetails(newErrors);
        break;
      case 2:
        isValid = validatePaymentInformation(newErrors);
        break;
      case 3:
        isValid = validateTerms(newErrors);
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validatePersonalInformation = (newErrors: ErrorState): boolean => {
    let isValid = true;
    if (!details.firstName) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!details.lastName) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    if (!validateEmail(details.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }
    if (details.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }
    if (details.password !== details.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    return isValid;
  };

  const validateBusinessDetails = (newErrors: ErrorState): boolean => {
    let isValid = true;
    if (!details.companyName) {
      newErrors.companyName = 'Company name is required';
      isValid = false;
    }
    if (!details.businessType) {
      newErrors.businessType = 'Business type is required';
      isValid = false;
    }
    if (!details.registrationNumber && details.businessType === 'firm') {
      newErrors.registrationNumber = 'Registration number is required';
      isValid = false;
    }
    if (
      !details.region &&
      !details.city &&
      details.businessType === 'customer'
    ) {
      newErrors.city = 'City is required';
      newErrors.region = 'Region is required';
      isValid = false;
    }
    return isValid;
  };

  const validatePaymentInformation = (newErrors: ErrorState): boolean => {
    let isValid = true;
    if (!details.accountNumber) {
      newErrors.accountNumber = 'Account number is required';
      isValid = false;
    }
    if (!details.routingNumber) {
      newErrors.routingNumber = 'Routing number is required';
      isValid = false;
    }
    if (!details.taxId) {
      newErrors.taxId = 'Tax ID is required';
      isValid = false;
    }
    return isValid;
  };

  const validateTerms = (newErrors: ErrorState): boolean => {
    let isValid = true;
    if (!details.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms to continue';
      isValid = false;
    }
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setErrors({
        ...errors,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        companyName: '',
        businessType: '',
        registrationNumber: '',
        accountNumber: '',
        routingNumber: '',
        taxId: '',
        termsAccepted: '',
      });
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (validateStep(activeStep)) {
      await SignupService(details);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box className='space-y-4 flex flex-col gap-[30px]'>
            <div className='grid grid-cols-2 gap-4'>
              <TextField
                label='First Name'
                value={details.firstName}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
                onChange={(e) =>
                  setDetails({ ...details, firstName: e.target.value })
                }
                fullWidth
              />
              <TextField
                label='Last Name'
                value={details.lastName}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
                onChange={(e) =>
                  setDetails({ ...details, lastName: e.target.value })
                }
                fullWidth
              />
            </div>
            <TextField
              label='Email'
              value={details.email}
              error={Boolean(errors.email)}
              helperText={errors.email}
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              fullWidth
            />
            <TextField
              label='Password'
              type='password'
              value={details.password}
              error={Boolean(errors.password)}
              helperText={errors.password}
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              fullWidth
            />
            <TextField
              label='Confirm Password'
              type='password'
              value={details.confirmPassword}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              onChange={(e) =>
                setDetails({ ...details, confirmPassword: e.target.value })
              }
              fullWidth
            />
          </Box>
        );

      case 1:
        return (
          <Box className='space-y-4'>
            <TextField
              label='Company Name'
              value={details.companyName}
              error={Boolean(errors.companyName)}
              helperText={errors.companyName}
              onChange={(e) =>
                setDetails({ ...details, companyName: e.target.value })
              }
              fullWidth
            />
            <FormControl fullWidth error={Boolean(errors.businessType)}>
              <InputLabel>Business Type</InputLabel>
              <Select
                value={details.businessType}
                label='Business Type'
                onChange={(e) =>
                  setDetails({ ...details, businessType: e.target.value })
                }
              >
                <MenuItem value='customer'>Customer</MenuItem>
                <MenuItem value='firm'>Firm</MenuItem>
              </Select>
            </FormControl>
            {(() => {
              if (details.businessType === 'firm') {
                return (
                  <TextField
                    label='Business Registration Number'
                    value={details.registrationNumber}
                    error={Boolean(errors.registrationNumber)}
                    helperText={errors.registrationNumber}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        registrationNumber: e.target.value,
                      })
                    }
                    fullWidth
                  />
                );
              } else if (details.businessType === 'customer') {
                return (
                  <div className='flex flex-col gap-[30px]'>
                    <TextField
                      label='City'
                      value={details.city}
                      error={Boolean(errors.city)}
                      helperText={errors.city}
                      onChange={(e) =>
                        setDetails({ ...details, city: e.target.value })
                      }
                      fullWidth
                    />
                    <TextField
                      label='Region'
                      value={details.region}
                      error={Boolean(errors.region)}
                      helperText={errors.region}
                      onChange={(e) =>
                        setDetails({ ...details, region: e.target.value })
                      }
                      fullWidth
                    />
                  </div>
                );
              } else {
                return null;
              }
            })()}
          </Box>
        );

      case 2:
        return (
          <Box className='space-y-4'>
            <TextField
              label='Bank Account Number'
              value={details.accountNumber}
              error={Boolean(errors.accountNumber)}
              helperText={errors.accountNumber}
              onChange={(e) =>
                setDetails({ ...details, accountNumber: e.target.value })
              }
              fullWidth
            />
            <TextField
              label='Routing Number'
              value={details.routingNumber}
              error={Boolean(errors.routingNumber)}
              helperText={errors.routingNumber}
              onChange={(e) =>
                setDetails({ ...details, routingNumber: e.target.value })
              }
              fullWidth
            />
            <TextField
              label='Tax ID / EIN'
              value={details.taxId}
              error={Boolean(errors.taxId)}
              helperText={errors.taxId}
              onChange={(e) =>
                setDetails({ ...details, taxId: e.target.value })
              }
              fullWidth
            />
          </Box>
        );

      case 3:
        return (
          <Box className='space-y-4'>
            <Card className='p-6'>
              <Typography variant='h6' className='mb-4'>
                Review Your Information
              </Typography>
              <div className='space-y-2'>
                <Typography>
                  <strong>Name:</strong> {details.firstName} {details.lastName}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {details.email}
                </Typography>
                <Typography>
                  <strong>Company:</strong> {details.companyName}
                </Typography>
                <Typography>
                  <strong>Business Type:</strong> {details.businessType}
                </Typography>
                <Typography>
                  <strong>Registration Number:</strong>{' '}
                  {details.registrationNumber}
                </Typography>
                <Typography>
                  <strong>Account Number:</strong> {details.accountNumber}
                </Typography>
                <Typography>
                  <strong>Tax ID:</strong> {details.taxId}
                </Typography>
              </div>
            </Card>
            <FormControlLabel
              control={
                <Checkbox
                  checked={details.termsAccepted}
                  onChange={(e) =>
                    setDetails({ ...details, termsAccepted: e.target.checked })
                  }
                />
              }
              className='text-black'
              label='I agree to the Terms of Service and Privacy Policy'
            />
            {errors.termsAccepted && (
              <Typography color='error' variant='caption'>
                {errors.termsAccepted}
              </Typography>
            )}
          </Box>
        );
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-row'>
      <LeftPanel />
      <div className='flex flex-col w-full lg:w-1/2 p-8'>
        <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col gap-[20px] h-full'>
          <Typography variant='h4' className='text-center mb-8 text-black'>
            Create Your Payment Account
          </Typography>

          <Stepper activeStep={activeStep} className='mb-8'>
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={() => (
                    <div
                      className={`p-2 rounded-full ${
                        activeStep === index
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100'
                      }`}
                    >
                      {step.icon}
                    </div>
                  )}
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <div className='mt-8'>
            {renderStepContent(activeStep)}

            <div className='mt-8 flex justify-between'>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                variant='outlined'
              >
                Back
              </Button>
              <Button
                variant='contained'
                onClick={
                  activeStep === steps.length - 1 ? handleSubmit : handleNext
                }
                className='bg-blue-600'
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
