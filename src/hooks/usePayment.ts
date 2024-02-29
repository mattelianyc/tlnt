import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializePaymentSheet } from '../redux/slices/paymentSlice';

interface PaymentSheetResponse {
  success: boolean;
  error?: string;
}

const usePayment = () => {
  const dispatch = useDispatch();
  const { loading, paymentSheetInitialized } = useSelector((state: any) => state.payment);
  const [error, setError] = useState<string | null>(null);

  const presentPayment = useCallback(async (amount: number): Promise<PaymentSheetResponse> => {
    try {
      if (!paymentSheetInitialized) {
        // Dispatch the action without worrying about TypeScript errors here.
        // Just ensure runtime correctness.
        await dispatch(initializePaymentSheet({ amount }) as any);
      }

      // Your payment sheet logic here
      const { error } = await presentPaymentSheet(); // Make sure to define this function or replace it with your actual implementation.
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (error: any) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  }, [dispatch, paymentSheetInitialized]);

  return { presentPayment, loading, paymentSheetInitialized, error };
};

export default usePayment;

async function presentPaymentSheet(): Promise<{ error?: { message: string } }> {
  // Simulate presenting a payment sheet and handling the result
  return new Promise((resolve) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        resolve({});
      } else {
        resolve({ error: { message: "An error occurred" } });
      }
    }, 1000);
  });
}
