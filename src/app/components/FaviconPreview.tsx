import { useState } from 'react';

type FaviconPreviewProps = {
  imageUrl: string;
};

function downloadPng(imageUrl: string, size: number) {
  const img = new window.Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `favicon-${size}x${size}.png`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    }, 'image/png');
  };
  img.src = imageUrl;
}

async function generatePngBlob(
  imageUrl: string,
  size: number
): Promise<Blob | null> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(null);
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png');
    };
    img.src = imageUrl;
  });
}

async function dataUrlToFile(dataUrl: string, filename: string): Promise<File> {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type });
}

export default function FaviconPreview({ imageUrl }: FaviconPreviewProps) {
  const [zipping, setZipping] = useState(false);
  const [icoLoading, setIcoLoading] = useState(false);

  async function handleDownloadZip() {
    setZipping(true);
    const sizes = [16, 32, 48, 64];
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    const blobs = await Promise.all(
      sizes.map((size) => generatePngBlob(imageUrl, size))
    );
    blobs.forEach((blob, i) => {
      if (blob) {
        zip.file(`favicon-${sizes[i]}x${sizes[i]}.png`, blob);
      }
    });
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'favicons.zip';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setZipping(false);
    }, 100);
  }

  async function handleDownloadIco() {
    setIcoLoading(true);
    try {
      // Convert data URL to File
      const file = await dataUrlToFile(imageUrl, 'upload.png');
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/generate-ico', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        throw new Error('ICO generation failed');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'favicon.ico';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIcoLoading(false);
      }, 100);
    } catch (e) {
      alert('ICO generation failed. Try a different image.');
      setIcoLoading(false);
    }
  }

  return (
    <div className='mt-2 w-full flex flex-col items-center'>
      <span className='text-sm text-gray-500 mb-2'>Preview:</span>
      <div className='flex gap-6 flex-wrap justify-center'>
        {[16, 32, 48, 64].map((size) => (
          <div key={size} className='flex flex-col items-center'>
            <div
              className='rounded shadow border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 flex items-center justify-center'
              style={{ width: size, height: size }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt='Favicon preview'
                width={size}
                height={size}
                style={{ objectFit: 'contain', width: size, height: size }}
              />
            </div>
            <span className='text-xs mt-1 text-gray-400'>
              {size}x{size}
            </span>
            <button
              className='mt-2 px-2 py-1 rounded bg-blue-500 text-white text-xs hover:bg-blue-600 transition-colors'
              onClick={() => downloadPng(imageUrl, size)}
            >
              Download PNG
            </button>
          </div>
        ))}
      </div>
      <div className='flex gap-4 mt-6'>
        <button
          className='px-4 py-2 rounded bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-60'
          onClick={handleDownloadZip}
          disabled={zipping}
        >
          {zipping ? 'Preparing ZIP...' : 'Download All as ZIP'}
        </button>
        <button
          className='px-4 py-2 rounded bg-yellow-600 text-white text-sm font-semibold hover:bg-yellow-700 transition-colors disabled:opacity-60'
          onClick={handleDownloadIco}
          disabled={icoLoading}
        >
          {icoLoading ? 'Generating ICO...' : 'Download ICO'}
        </button>
      </div>
    </div>
  );
}
