import type { PropsWithChildren, ReactNode } from 'react';
import { ShadcnTooltip, TooltipContent } from './ui/tooltip';
import { TooltipTrigger } from './ui/tooltip';

type Props = PropsWithChildren<{
  content: ReactNode;
}>;

export const Tooltip = ({ children, content }: Props) => (
  <ShadcnTooltip>
    <TooltipTrigger asChild>{children}</TooltipTrigger>
    <TooltipContent>{content}</TooltipContent>
  </ShadcnTooltip>
);
