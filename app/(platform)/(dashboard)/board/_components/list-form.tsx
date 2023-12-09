'use client';

import { Plus, X } from 'lucide-react';
import { ListWrapper } from './list-wrapper';
import { ElementRef, useEffect, useRef, useState } from 'react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { FormInput } from '@/components/form/form-input';
import { FormSubmit } from '@/components/form/form-submit';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/useAction';
import { createList } from '@/actions/create-list';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';

function ListForm() {
  const router = useRouter();
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: data => {
      toast.success(`List ${data.title} created`);
      disableEditing();
      router.refresh();
    },
    onError: error => toast.error(error),
  });

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const enableEditing = () => {
    setIsEditing(true);
  };
  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };

  useEventListener('keydown', onKeyDown);

  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;

    execute({ title, boardId: params.boardId as string });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          className='w-full p-3 rounded-md bg-white space-y-4 shadow-md'
        >
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id='title'
            placeholder='Enter list title...'
            className='text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition'
          />
          <div className='flex items-center gap-x-1'>
            <FormSubmit>Add List</FormSubmit>
            <Button
              type='button'
              onClick={disableEditing}
              size={'sm'}
              variant={'ghost'}
            >
              <X className='h-5 w-5' />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className='w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm'
      >
        <Plus className='h-4 w-4 mr-2' />
        Add a list
      </button>
    </ListWrapper>
  );
}

export default ListForm;
