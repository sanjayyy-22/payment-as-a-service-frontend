import PayPalButton from './components/paypalButton';

const App = () => {
  const handleSuccess = (details: { id: string }) => {
    alert(`Payment successful! Transaction ID: ${details.id}`);
    console.log('Payment details:', details);
  };

  const handleError = (error: Error) => {
    alert('An error occurred during the payment process.');
    console.error('Payment error:', error);
  };

  return (
    <div className='App'>
      <h1>Pay with PayPal</h1>
      <PayPalButton
        amount='10.00'
        currency='USD'
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
};

export default App;
