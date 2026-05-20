import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: App });

function App() {
  return <div className="flex min-h-[calc(100svh-3.5rem)] p-6">home</div>;
}
