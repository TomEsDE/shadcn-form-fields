'use client';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import copy from 'copy-to-clipboard';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { toast } from '@/hooks/use-toast';
import { Code, Copy } from 'lucide-react';
import TooltipWrapper from '@/components/@index';
SyntaxHighlighter.registerLanguage('tsx', tsx);

interface CodeDrawerProps {
  title: string;
  createCodeFunction: () => string;
  className?: string;
  isIconAsButton?: boolean;
}
export default function CodeDrawer({
  title,
  createCodeFunction,
  className,
  isIconAsButton: isIconAsTrigger,
}: CodeDrawerProps) {
  const [codeString, setCodeString] = useState<string>('');
  const handleOnCopyCode = async () => {
    copy(codeString);
    toast({
      title: 'Copied',
      description: 'Code successfully copied to Clipboard!',
    });
  };
  return (
    <Drawer>
      <DrawerTrigger
        onClick={() => setCodeString(createCodeFunction)}
        className="hover:text-primary"
      >
        {isIconAsTrigger ? (
          <TooltipWrapper tooltip="show code">
            <Code className="" />
          </TooltipWrapper>
        ) : (
          <pre className={className}>{`show <code>`}</pre>
        )}
      </DrawerTrigger>
      <DrawerContent className="flex justify-center items-center">
        <DrawerHeader>
          <DrawerTitle>
            <pre>{title}</pre>
          </DrawerTitle>
        </DrawerHeader>

        <div className="relative border rounded-lg px-4 py-4 bg-[rgb(40,44,52)]/[1] w-11/12 sm:w-fit h-fit max-w-md">
          <Button
            variant={'ghost'}
            className="absolute top-0 right-1 p-2 hover:bg-inherit text-muted-foreground hover:text-muted-foreground/50"
            onClick={handleOnCopyCode}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <SyntaxHighlighter
            showLineNumbers={true}
            useInlineStyles={true}
            language="tsx"
            style={oneDark}
            customStyle={{
              fontSize: '9pt',
              padding: '0px',
              margin: '0px',
              // background: 'black',
            }}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
