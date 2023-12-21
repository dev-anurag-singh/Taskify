'use client';

import { Card } from '@prisma/client';
import { Draggable } from '@hello-pangea/dnd';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { CardWithList } from '@/types';
import { fetcher } from '@/lib/fetcher';

// import { useCardModal } from '@/hooks/use-card-modal';

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  const { data: card } = useQuery<CardWithList>({
    queryKey: ['card', data.id],
    queryFn: () => fetcher(`/api/cards/${data.id}`),
  });

  return (
    <Dialog>
      <Draggable draggableId={data.id} index={index}>
        {provided => (
          <DialogTrigger asChild>
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              role='button'
              className='truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm'
            >
              {data.title}
            </div>
          </DialogTrigger>
        )}
      </Draggable>
      <DialogContent>{card?.title}</DialogContent>
    </Dialog>
  );
};
