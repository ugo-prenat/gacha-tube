import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  component: RouteComponent
});

function RouteComponent() {
  return <div className="flex min-h-[calc(100svh-3.5rem)] p-6">admin</div>;
}
