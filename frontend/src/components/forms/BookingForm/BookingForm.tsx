import { useForm } from 'react-hook-form';
import {
  PaymentIntentResponse,
  UserType,
} from '../../../../../backend/src/shared/types';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { useSearchContext } from '../../../contexts/SearchContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRoomBookings } from '../../../services/api-client';
import toast from 'react-hot-toast';

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  totalCost: number;
  paymentIntentId: string;
};

export default function BookingForm({ currentUser, paymentIntent }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const { hotelId } = useParams();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { adultCount, checkIn, checkOut, childCount } = useSearchContext();

  const { mutate: bookRoom, isPending } = useMutation({
    mutationFn: createRoomBookings,
    onSuccess: () => {
      toast.success('Booking Saved Successful');
      queryClient.invalidateQueries({
        queryKey: ['fetchMyBookings'],
      });
      navigate('/my-bookings');
    },
    onError: () => {
      toast.error('Error when saving booking');
    },
  });

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      adultCount,
      childCount,
      hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.error?.message) {
      return toast.error(result.error.message);
    }
    // console.log(result);

    if (result.paymentIntent?.status === 'succeeded') {
      // book the room
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5'
    >
      <span className='text-3xl font-bold'>Confirm Your Details</span>

      <div className='grid grid-cols-2 gap-6'>
        <label className='text-gray-700 text-sm font-bold flex-1'>
          First Name
          <input
            className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal'
            type='text'
            readOnly
            disabled
            {...register('firstName')}
          />
        </label>
        <label className='text-gray-700 text-sm font-bold flex-1'>
          Last Name
          <input
            className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal'
            type='text'
            readOnly
            disabled
            {...register('lastName')}
          />
        </label>
        <label className='text-gray-700 text-sm font-bold flex-1'>
          Email
          <input
            className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal'
            type='text'
            readOnly
            disabled
            {...register('email')}
          />
        </label>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl font-semibold'>Your Price Summary</h2>

        <div className='bg-blue-200 p-4 rounded-md'>
          <div className='font-semibold text-lg'>
            Total Cost: £{paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className='text-xs'>Includes taxes and charges</div>
        </div>
      </div>

      <div className='space-y-2'>
        <h3 className='text-xl font-semibold'> Payment Details</h3>
        <CardElement
          id='payment-element'
          className='border rounded-md p-2 text-sm'
        />
      </div>

      <div className='flex justify-end'>
        <button
          disabled={isPending}
          type='submit'
          className='bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-500 text-md disabled:bg-gray-500'
        >
          {isPending ? 'Saving...' : 'Confirm Booking'}
        </button>
      </div>
    </form>
  );
}
