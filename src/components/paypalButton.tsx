import React, { useEffect, useRef } from 'react';

import { loadScript } from '@paypal/paypal-js';

interface PayPalButtonProps {
  amount: string;
  currency: string;
  onSuccess: (details: any) => void;
  onError?: (error: Error) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  amount,
  currency,
  onSuccess,
  onError,
}) => {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let paypalButtonsInstance: any;

    // Load PayPal SDK
    loadScript({
      clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID ?? '',
      currency,
    })
      .then((paypal) => {
        if (!paypal?.Buttons || !paypalRef.current) return;

        // Render PayPal button
        paypalButtonsInstance = paypal.Buttons({
          createOrder: async () => {
            try {
              // Make a request to your backend to create the order
              const response = await fetch('/api/paypal/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, currency }),
              });

              if (!response.ok) {
                throw new Error('Failed to create PayPal order');
              }

              const data = await response.json();

              if (!data.orderID) {
                throw new Error('Order ID not received from backend');
              }

              return data.orderID; // Return the PayPal order ID
            } catch (error) {
              console.error('Create Order Error:', error);
              if (onError) onError(error as Error);
              throw error; // Propagate the error to PayPal SDK
            }
          },
          onApprove: async (data) => {
            try {
              if (!data.orderID) {
                throw new Error('Order ID is missing');
              }

              // Capture the order on your backend
              const response = await fetch('/api/paypal/capture-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: data.orderID }),
              });

              if (!response.ok) {
                throw new Error('Failed to capture PayPal order');
              }

              const captureData = await response.json();
              onSuccess(captureData); // Trigger the success callback
            } catch (error) {
              console.error('Capture Error:', error);
              if (onError) onError(error as Error);
            }
          },
          onError: (error) => {
            console.error('PayPal Button Error:', error);
            if (onError)
              throw new Error('An error occurred during the payment process.');
          },
        });

        if (paypalButtonsInstance) {
          paypalButtonsInstance.render(paypalRef.current);
        }
      })
      .catch((error) => {
        console.error('PayPal SDK Load Error:', error);
        if (onError) onError(error as Error);
      });

    // Cleanup function to remove existing buttons
    return () => {
      if (paypalButtonsInstance) {
        paypalButtonsInstance.close();
      }
    };
  }, [amount, currency, onSuccess, onError]);

  return <div ref={paypalRef}></div>;
};

export default PayPalButton;
