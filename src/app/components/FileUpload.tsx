import React from 'react';

type FileUploadProps = {
  inputRef: React.RefObject<HTMLInputElement>;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  error: string | null;
  imageUrl: string | null;
};

export default function FileUpload({
  inputRef,
  onDrop,
  onChange,
  onClick,
  error,
}: FileUploadProps) {
  return (
    <div
      className='w-full max-w-md bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 flex flex-col items-center border-2 border-dashed border-gray-300 dark:border-zinc-700 hover:border-blue-400 transition-colors cursor-pointer mb-8'
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={onClick}
      tabIndex={0}
      role='button'
      aria-label='Upload image'
    >
      <input
        type='file'
        accept='image/*'
        className='hidden'
        ref={inputRef}
        onChange={onChange}
      />
      <div className='flex flex-col items-center gap-2'>
        <span className='text-lg font-medium text-gray-700 dark:text-gray-200'>
          Drag & drop or click to upload
        </span>
        <span className='text-xs text-gray-400'>PNG, JPG, SVG, WEBP...</span>
      </div>
      {error && <div className='text-red-500 mt-2'>{error}</div>}
    </div>
  );
}
