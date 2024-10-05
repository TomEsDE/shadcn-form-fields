import { Button } from '@/components/ui/button';
import HeroExamples from './hero-examples';
import { Play } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
      <div className="md:w-1/2 h-auto flex flex-col gap-8 text-center items-center md:items-start md:text-left">
        <div className="[text-wrap:balance] text-[clamp(2rem,10cqw,2.5rem)]/[1.125] mdd:text-[clamp(2rem,5cqw,2.5rem)]/[1.125] font-bold text-primary">
          shadcn form <span className="text-nowrap">{'<field />'}</span>{' '}
          components
        </div>
        <div className="font-extralight text-muted-foreground [text-wrap:balance] text-xl md:text-2xl">
          Improve your development with compact, feature rich form field
          components for shadcn
        </div>
        <div className="font-extralight text-muted-foreground [text-wrap:balance] text-xl md:text-2xl">
          Change label positions, add icons or manage complete comboboxes within{' '}
          <span className="text-primary font-semibold">just one</span> component
        </div>
        <Link href="#playground" className="h-full flex items-end md:pb-8">
          <Button type="button" className="w-fit flex gap-4">
            {'Playground'} <Play className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="md:w-1/2 md:p-10 md:scale-125">
        <HeroExamples />
      </div>
    </div>
  );
}
