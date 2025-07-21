import React from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';

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
      className='w-full max-w-md bg-white/80 dark:bg-zinc-900/80 rounded-2xl shadow-2xl p-8 flex flex-col items-center border-2 border-dashed border-blue-300 hover:border-blue-500 transition-colors cursor-pointer backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-blue-400 group relative mb-8'
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
      <div className='flex flex-col items-center gap-3 select-none'>
        <CloudArrowUpIcon className='w-14 h-14 text-blue-400 group-hover:animate-bounce mb-1 drop-shadow-lg' />
        <span className='text-lg font-semibold text-gray-700 dark:text-gray-200'>
          Drag & drop or click to upload
        </span>
        <span className='text-xs text-gray-400'>PNG, JPG, SVG, WEBP...</span>
      </div>
      {error && (
        <div className='text-red-500 mt-4 text-sm animate-fade-in'>{error}</div>
      )}
    </div>
  );
}
