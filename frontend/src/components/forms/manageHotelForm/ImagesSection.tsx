import { useFormContext } from 'react-hook-form';
import { HotelFormDataType } from './ManageHotelForm';

export default function ImagesSection() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormDataType>();

  const existingImageUrls = watch('imageUrls');

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    e.preventDefault();
    setValue(
      'imageUrls',
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div>
      <h2 className='text-2xl font-bold mb-3'>Images</h2>
      <div className='border rounded p-4 flex flex-col gap-4'>
        {existingImageUrls && (
          <div className='grid grid-cols-6 gap-4'>
            {existingImageUrls.map((url, i) => (
              <div className='relative group' key={i}>
                <img
                  src={url}
                  alt={`image-${i + 1}`}
                  className='min-h-full object-cover'
                />
                <button
                  onClick={(e) => handleDelete(e, url)}
                  className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition duration-300 group-hover:opacity-100 text-white '
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type='file'
          multiple
          accept='image/*'
          {...register('imageFiles', {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);

              if (totalLength === 0)
                return 'At least one image should be added';

              if (totalLength > 6)
                return 'Total number of image cannot be more than 6';

              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className='text-red-700 text-sm font-normal'>
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
}
