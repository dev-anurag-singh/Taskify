import { db } from '@/lib/db/db';
import { auth } from '@clerk/nextjs';
import { notFound, redirect } from 'next/navigation';
import BoardNavbar from '../_components/board-navbar';

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();

  if (!orgId) {
    redirect('/select-org');
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  return {
    title: board?.title || 'board',
  };
}

async function BoardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    boardId: string;
  };
}) {
  const { orgId } = auth();

  if (!orgId) {
    redirect('/select-org');
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className='relative h-full bg-no-repeat bg-cover bg-center'
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar board={board} />
      <div className='absolute inset-0 bg-black/20' />
      <main className='relative pt-28 h-full'>{children}</main>
    </div>
  );
}

export default BoardLayout;
