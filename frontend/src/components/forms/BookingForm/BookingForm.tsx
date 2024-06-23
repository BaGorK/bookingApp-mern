import { UserType } from '../../../../../backend/src/shared/types';

type Props = {
  currentUser: UserType;
};

export default function BookingForm({ currentUser }: Props) {
  console.log(currentUser);
  return <div>BookingForm</div>;
}
