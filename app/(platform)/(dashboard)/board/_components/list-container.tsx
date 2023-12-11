'use client';

import { ListWithCards } from '@/types';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import ListForm from './list-form';
import { useEffect, useState } from 'react';
import ListItem from './list-item';
import { useAction } from '@/hooks/useAction';
import { updateListOrder } from '@/actions/update-list-order';
import toast from 'react-hot-toast';
import { updateCardOrder } from '@/actions/update-card-order';

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

function ListContainer({ data, boardId }: ListContainerProps) {
  const [orderedData, setOrderedData] = useState(data);
  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => toast.success('List has been reordered'),
  });

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => toast.success('Card reordered'),
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    // return if dropped at the same position

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // User reorders list

    if (type === 'list') {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setOrderedData(items);

      // Persist to DB
      executeUpdateListOrder({ items, boardId });
    }

    // User moves a card

    if (type === 'card') {
      let newOrderedData = [...orderedData];

      // Source and destination list
      const sourceList = newOrderedData.find(
        list => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        list => list.id === destination.droppableId
      );

      if (!sourceList || !destList) {
        return;
      }

      // Check if cards exists on the sourceList
      if (!sourceList.card) {
        sourceList.card = [];
      }

      // Check if cards exists on the destList
      if (!destList.card) {
        destList.card = [];
      }
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.card,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });

        sourceList.card = reorderedCards;

        setOrderedData(newOrderedData);

        executeUpdateCardOrder({
          items: reorderedCards,
          boardId,
        });
      } else {
        // Remove card from the source list
        const [movedCard] = sourceList.card.splice(source.index, 1);

        // Assign the new listId to the moved card
        movedCard.listId = destination.droppableId;

        // Add card to the destination list
        destList.card.splice(destination.index, 0, movedCard);

        sourceList.card.forEach((card, idx) => {
          card.order = idx;
        });

        // Update the order for each card in the destination list
        destList.card.forEach((card, idx) => {
          card.order = idx;
        });

        setOrderedData(newOrderedData);
        //Persist to DB

        executeUpdateCardOrder({
          boardId,
          items: destList.card,
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='lists' type='list' direction='horizontal'>
        {provided => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='flex gap-3 h-full'
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className='flex-shrink-0 w-1' />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ListContainer;
