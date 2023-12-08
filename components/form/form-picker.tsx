'use client';

import { unsplash } from '@/lib/unsplash';
import { cn } from '@/lib/utils';
import { Check, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { FormErrors } from './form-errors';

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export function FormPicker({ id, errors }: FormPickerProps) {
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { pending } = useFormStatus();
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        });

        if (result && result.response) {
          const fetchedImages = result.response as Array<Record<string, any>>;
          setImages(fetchedImages);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className='p-6 items-center justify-center'>
        <Loader2 className='h-6 w-6 text-sky-700 animate-spin ' />
      </div>
    );
  }

  return (
    <div className='relative'>
      <div className='grid grid-cols-3 gap-2 mb-2'>
        {images.map(image => (
          <div
            key={image.id}
            className={cn(
              'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
              {
                'opacity-50 hover:opacity-50 cursor-auto': pending,
              }
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            {selectedImageId === image.id && (
              <div className='absolute z-10 inset-y-0 h-full w-full bg-black/30 flex items-center justify-center'>
                <Check className='h-4 w-4 text-white' />
              </div>
            )}
            <input
              type='radio'
              id={id}
              name={id}
              readOnly
              className='hidden'
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              src={image.urls.thumb}
              alt='Unsplash cover images for background'
              fill
              className='object-cover rounded-sm'
            />
          </div>
        ))}
      </div>
      <FormErrors id='image' errors={errors} />
    </div>
  );
}
