const CloseIcon = ({ toClose, className = 'size-8', color = '#EF5350' }) => {
  return (
    <button onClick={toClose}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        viewBox='0 0 24 24'
        fill='none'
      >
        <path
          d='m9 9 3 3m0 0 3 3m-3-3-3 3m3-3 3-3M4 16.8V7.2c0-1.12 0-1.68.218-2.108.192-.377.497-.682.874-.874C5.52 4 6.08 4 7.2 4h9.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C20 5.52 20 6.08 20 7.2v9.6c0 1.12 0 1.68-.218 2.108a2.001 2.001 0 0 1-.874.874c-.428.218-.986.218-2.104.218H7.197c-1.118 0-1.678 0-2.105-.218a2 2 0 0 1-.874-.874C4 18.48 4 17.92 4 16.8z'
          stroke={`${color}`}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </button>
  );
};

export default CloseIcon;
