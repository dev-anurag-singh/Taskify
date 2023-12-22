'use client';

import { AuditLog, Card } from '@prisma/client';
import { Draggable } from '@hello-pangea/dnd';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { CardWithList } from '@/types';
import { fetcher } from '@/lib/fetcher';
import { Header } from '@/components/card-modal/header';
import { Description } from '@/components/card-modal/description';
import { Actions } from '@/components/card-modal/actions';
import { Activity } from '@/components/card-modal/activity';

// import { useCardModal } from '@/hooks/use-card-modal';

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ['card', data.id],
    queryFn: () => fetcher(`/api/cards/${data.id}`),
  });
  const { data: cardAuditData } = useQuery<AuditLog>({
    queryKey: ['card-logs', data.id],
    queryFn: () => fetcher(`/api/cards/${data.id}/logs`),
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
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
        <div className='grid grid-cols-1 md:grid-cols-4 md:gap-4'>
          <div className='col-span-3'>
            <div className='w-full space-y-6'>
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description data={cardData} />
              )}
              {!cardAuditData ? (
                <Activity.Skeleton />
              ) : (
                <Activity items={cardAuditData} />
              )}
            </div>
          </div>
          {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
