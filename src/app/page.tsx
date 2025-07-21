'use client';

import { useRef, useState } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import FaviconPreview from './components/FaviconPreview';
import Footer from './components/Footer';

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      setImageUrl(null);
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-[#18181b] dark:to-[#23272f] p-4'>
      <Header />
      <FileUpload
        inputRef={inputRef as React.RefObject<HTMLInputElement>}
        onDrop={onDrop}
        onChange={onChange}
        onClick={() => inputRef.current?.click()}
        error={error}
        imageUrl={imageUrl}
      />
      {imageUrl && <FaviconPreview imageUrl={imageUrl} />}
      <Footer />
    </div>
  );
}
