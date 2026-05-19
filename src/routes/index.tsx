import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/')({ component: App });

function App() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Button>OAuth</Button>
    </div>
  );
}
