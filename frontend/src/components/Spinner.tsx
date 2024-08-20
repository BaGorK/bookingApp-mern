const Spinner = () => {
  return (
    <div className='flex w-full items-center justify-center'>
      <div
        className='text-surface m-12 inline-block h-12 w-12 animate-spin rounded-full border-8 border-solid border-current border-e-transparent align-[-0.125em] text-slate-600 motion-reduce:animate-[spin_2.5s_linear_infinite]'
        role='status'
      >
        <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Spinner;
