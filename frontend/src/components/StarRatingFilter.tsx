type Props = {
  selectedStars: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function StarRatingFilter({ selectedStars, onChange }: Props) {
  return <div>StarRatingFilter</div>;
}
