import React from 'react';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface IToggleGroupWrapper<T extends string> {
  values: { key: T; value: string; icon?: React.ReactNode }[];
  onChange: (item: T) => void;
  value: T;
}
export function ToggleGroupWrapper<T extends string>({
  values,
  onChange,
  value,
}: IToggleGroupWrapper<T>) {
  return (
    <ToggleGroup
      type="single"
      variant={'default'}
      onValueChange={onChange}
      value={value}
      className="flex-wrap justify-start"
    >
      {values.map((item) => (
        <TooltipWrapper
          key={item.key}
          tooltip={item.value}
          className="[&>*]:bg-inherit [&>*]:px-2 [&>*]:h-7"
        >
          <ToggleGroupItem value={item.key} aria-label={`Toggle ${item}`}>
            {item.icon ? item.icon : item.value}
          </ToggleGroupItem>
        </TooltipWrapper>
      ))}
    </ToggleGroup>
  );
}

export default function TooltipWrapper({
  tooltip,
  children,
  className,
}: Readonly<{
  tooltip: string;
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={cn(className)}>{children}</TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
