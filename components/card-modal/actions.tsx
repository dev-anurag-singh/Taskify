'use client';

import toast from 'react-hot-toast';
import { Copy, Trash } from 'lucide-react';
import { useParams } from 'next/navigation';

import { CardWithList } from '@/types';
import { useAction } from '@/hooks/useAction';
import { Button } from '@/components/ui/button';
import { deleteCard } from '@/actions/delete-card';
import { Skeleton } from '@/components/ui/skeleton';

interface ActionsProps {
  data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams();

  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: data => {
        toast.success(`Card "${data.title}" deleted`);
      },
      onError: error => {
        toast.error(error);
      },
    }
  );

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({
      id: data.id,
      boardId,
    });
  };

  return (
    <div className='space-y-2 mt-2'>
      <p className='text-xs font-semibold'>Actions</p>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        variant='destructive'
        className='w-full justify-start'
      >
        <Trash className='h-4 w-4 mr-2' />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className='space-y-2 mt-2'>
      <Skeleton className='w-20 h-4 bg-neutral-200' />
      <Skeleton className='w-full h-8 bg-neutral-200' />
      <Skeleton className='w-full h-8 bg-neutral-200' />
    </div>
  );
};
