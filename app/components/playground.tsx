import { Separator } from '@radix-ui/react-separator';
import { Play } from 'lucide-react';
import PlaygroundInput from './playground-input';

import PlaygroundCombobox from './playground-combobox';
import PlaygroundSelect from './playground-select';

export default function Playground() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-24">
      <div className="flex flex-col gap-4 text-center -mt-8 md:-mt-14">
        <div
          id="playground"
          className="flex gap-6 justify-center text-primary items-center"
        >
          <Play className="hidden sm:block h-12 w-12 p-1 pl-2 border-[3px] border-primary rounded-full mt-2" />
          <div className="text-5xl font-bold">Playground</div>
        </div>
        <div className="font-extralight text-muted-foreground [text-wrap:balance] text-xl">
          Play with some component attributes and see how it looks!
        </div>
      </div>
      <div className="flex flex-col gap-4 -mt-10">
        <PlaygroundInput />
      </div>
      <Separator className="w-10/12 mx-auto h-0.5 bg-primary/50" />
      <div className="flex flex-col gap-4">
        <PlaygroundCombobox />
      </div>
      <Separator className="w-10/12 mx-auto h-0.5 bg-primary/50" />
      <div className="flex flex-col gap-4">
        <PlaygroundSelect />
      </div>
      <Separator className="w-10/12 mx-auto h-0.5 bg-primary/50" />
      <div className="flex flex-col gap-4 text-center text-primary text-2xl [text-wrap:balance]">
        more wrapper components to come like
        <strong>{'<ToggleGroupWrapper>'}</strong>
        stay tuned
      </div>
    </div>
  );
}
