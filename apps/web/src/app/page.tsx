'use client';

import { TodoList } from '@/components/todos';

export default function Home() {
  return (
    <main className="container py-12">
      <TodoList />
    </main>
  );
}
