'use client';

import { updateBoard } from '@/actions/update-board';
import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/useAction';
import { Board } from '@prisma/client';
import { ElementRef, useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

interface BoardTitleFormProps {
  data: Board;
}

function BoardTitleForm({ data }: BoardTitleFormProps) {
  const { execute } = useAction(updateBoard, {
    onSuccess: newData => {
      toast.success(`Board "${newData.title}" updated!`);
      setBoardTitle(newData.title);
      disableEditing();
    },
    onError: error => {
      toast.error('Error while updating Board');
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);
  const [boardTitle, setBoardTitle] = useState(data.title);

  const enableEditing = () => {
    setIsEditing(true);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const onSubmit = (formData: FormData) => {
    const title = formData.get('board-title') as string;
    execute({ title, id: data.id });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        ref={formRef}
        action={onSubmit}
        className='flex items-center gap-x-2'
      >
        <FormInput
          ref={inputRef}
          id='board-title'
          onBlur={onBlur}
          defaultValue={boardTitle}
          className='text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none'
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      variant={'transparent'}
      className='font-bold text-lg h-auto w-auto p-1 px-2'
    >
      {boardTitle}
    </Button>
  );
}

export default BoardTitleForm;
