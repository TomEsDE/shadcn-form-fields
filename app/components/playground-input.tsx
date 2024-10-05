'use client';

import FormInputField from '@/components/form/form-input-field';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  EyeOff,
  Hash,
  KeyRound,
  Minus,
  SquareDashedBottom,
  SquareSquare,
  Text,
  Underline,
  Undo,
  User,
} from 'lucide-react';
import { useForm } from 'react-hook-form';

import TooltipWrapper, { ToggleGroupWrapper } from '@/components/@index';

import { TFormFieldLabelVariant } from '@/components/form/form-field-wrapper';
import { ThemeSwitchV2 } from '@/components/theme-switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import CodeDrawer from './code-drawer';

type TIconPosition = 'left' | 'right' | 'none';
type TIconBorder = 'none' | 'line' | 'dashed';
type TInputType = 'text' | 'password' | 'number';

const Schema = z.object({
  usernameA: z.string().min(3, 'Name must be at least 3 characters long'),
});

type SchemaType = z.infer<typeof Schema>;

const resetValues: SchemaType = {
  usernameA: '',
};

export default function PlaygroundInput() {
  const [inputType, setInputType] = useState<TInputType>('text');
  const [labelPosition, setLabelPosition] =
    useState<TFormFieldLabelVariant>('top');
  const [placeholder, setPlaceholder] = useState('Enter your username');
  const [description, setDescription] = useState('');
  const [iconPosition, setIconPosition] = useState<TIconPosition>('right');
  const [iconBorder, setIconBorder] = useState<TIconBorder>('dashed');
  const [icon, setIcon] = useState<React.ReactNode | undefined>(
    <User height={16} width={16} />
  );
  const [simulateError, setSimulateError] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    console.log('useEffect', simulateError);

    if (simulateError) {
      form.setValue('usernameA', 'ab');
      formRef.current?.requestSubmit();
      setSimulateError(false);
    }

    return () => {};
  }, [simulateError]);

  const form = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues: resetValues,
  });

  const { control, formState, handleSubmit } = form;

  const handleOnToggleLabelPos = async (value: TFormFieldLabelVariant) => {
    setLabelPosition(value ? value : 'none');
    setPlaceholder(
      !['floating-border'].includes(value) ? 'Enter your username' : ''
    );
  };
  const handleOnToggleIconPos = async (value: TIconPosition) => {
    setIconPosition(value ? value : 'none');
    if (value === 'none') setIcon(undefined);
    else {
      setIcon(<User height={16} width={16} />);
    }
  };
  const handleOnToggleIconBorder = async (value: TIconBorder) => {
    setIconBorder(value ? value : 'none');
  };
  const handleOnToggleType = async (value: TInputType) => {
    setInputType(value ? value : 'text');
    if (value === 'number') {
      form.reset({ usernameA: '3' });
    } else {
      form.reset({ usernameA: 'John' });
    }
  };
  const handleOnSimulateError = async () => {
    setInputType('text');
    setSimulateError(!simulateError);
  };
  const handleOnSubmit = async () => {
    setSimulateError(false);
  };
  const handleOnReset = async () => {
    form.reset({ usernameA: '' });
    setDescription('');
  };

  const createComponentCodeFromAttributes = () => {
    const codeString: string[] = [];
    codeString.push(`<FormInputField`);

    codeString.push(`\ttype="${inputType}"`);
    codeString.push(`\tname="username"`);
    codeString.push(`\tcontrol={control}`);
    codeString.push(`\tformState={formState}`);

    if (labelPosition && labelPosition !== 'none') {
      codeString.push(`\tlabel="Username"`);
      codeString.push(`\tlabelVariant="${labelPosition}"`);
    }
    codeString.push(`\tplaceholder="${placeholder}"`);

    if (description && description.trim().length > 0) {
      codeString.push(`\tdescription="${description}"`);
    }

    if (iconPosition !== 'none') {
      codeString.push(
        `\ticon={${`<User height={16} width={16} />`}}                 `
      );
      codeString.push(`\ticonPosition="${iconPosition}"`);
      if (iconBorder !== 'none')
        codeString.push(`\ticonBorder="${iconBorder}"`);
    }
    codeString.push(`/>`);

    // todo for unknown reason this one shows the line-numbers not in fixed width and will indent more at line 10+
    return codeString.map((s, idx) => (idx < 9 ? `\t${s}` : s)).join('\n');
  };

  return (
    <>
      <div className="relative self-center flex flex-col gap-1 justify-center items-center w-full max-w-[400px] border-dashed border-2 p-4 bg-background">
        <div className="absolute top-1 right-1">
          <ThemeSwitchV2 />{' '}
        </div>
        <div className="flex flex-col gap-1 text-xl font-semibold">Input</div>
        <div className="w-10/12 max-w-[350px] self-center">
          <Form {...form}>
            <form
              ref={formRef}
              onSubmit={
                simulateError
                  ? handleSubmit(handleOnSubmit)
                  : (e) => e.preventDefault()
              }
              className="flex flex-col items-center gap-4 mx-auto py-2 mt-2"
            >
              <div className="flex flex-col gap-3 w-full pl-4">
                <FormInputField
                  name="usernameA"
                  type={inputType}
                  control={control}
                  formState={formState}
                  label="Username"
                  labelVariant={labelPosition}
                  placeholder={placeholder}
                  icon={icon}
                  iconPlacement={
                    iconPosition === 'none' ? undefined : iconPosition
                  }
                  iconBorderStyle={iconBorder}
                  description={description}
                  className="dark:bg-secondary/30"
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className="relative w-10/12 md:w-3/4 mx-auto h-auto flex flex-col gap-2 items-center md:items-start md:text-left">
        <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 [&>*]:p-4 [&>*]:border-[1px] [&>*]:bborder-dashed border-[1px] bborder-dashed bg-background/40">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-primary">Label Position</div>
            <div>
              <ToggleGroupWrapper
                values={[
                  {
                    key: 'top',
                    value: 'top',
                    icon: <ArrowUp className="h-4 w-4" />,
                  },
                  {
                    key: 'left',
                    value: 'left',
                    icon: <ArrowLeft className="h-4 w-4" />,
                  },
                  {
                    key: 'border',
                    value: 'border',
                    icon: <Underline className="h-4 w-4" />,
                  },
                  {
                    key: 'floating-border',
                    value: 'floating',
                    icon: <SquareSquare className="h-4 w-4" />,
                  },
                  {
                    key: 'none',
                    value: 'none',
                    icon: <EyeOff className="h-4 w-4" />,
                  },
                ]}
                value={labelPosition}
                onChange={handleOnToggleLabelPos}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-primary">Icon Position</div>
            <div>
              <ToggleGroupWrapper
                values={[
                  {
                    key: 'left',
                    value: 'left',
                    icon: <ArrowLeft className="h-4 w-4" />,
                  },
                  {
                    key: 'right',
                    value: 'right',
                    icon: <ArrowRight className="h-4 w-4" />,
                  },
                  {
                    key: 'none',
                    value: 'none',
                    icon: <EyeOff className="h-4 w-4" />,
                  },
                ]}
                value={iconPosition}
                onChange={handleOnToggleIconPos}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-primary">Icon Border</div>
            <div>
              <ToggleGroupWrapper
                values={[
                  {
                    key: 'dashed',
                    value: 'dashed',
                    icon: (
                      <SquareDashedBottom className="h-4 w-4 border-dashed" />
                    ),
                  },
                  {
                    key: 'line',
                    value: 'line',
                    icon: <Minus className="h-4 w-4" />,
                  },
                  {
                    key: 'none',
                    value: 'none',
                    icon: <EyeOff className="h-4 w-4" />,
                  },
                ]}
                value={iconBorder}
                onChange={handleOnToggleIconBorder}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-primary">Input Type</div>
            <div>
              <ToggleGroupWrapper
                values={[
                  {
                    key: 'text',
                    value: 'text',
                    icon: <Text className="h-4 w-4" />,
                  },
                  {
                    key: 'password',
                    value: 'password',
                    icon: <KeyRound className="h-4 w-4" />,
                  },
                  {
                    key: 'number',
                    value: 'number',
                    icon: <Hash className="h-4 w-4" />,
                  },
                ]}
                value={inputType}
                onChange={handleOnToggleType}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-primary">Description</div>
            <div>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-background"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-primary">Simulate Error</div>
            <div className="flex gap-4 justify-between">
              <Button
                variant={'destructive'}
                type="button"
                onClick={handleOnSimulateError}
                className="grow"
              >
                Error
              </Button>
              <TooltipWrapper tooltip="Reset">
                <Button
                  variant={'secondary'}
                  type="button"
                  onClick={handleOnReset}
                  className="px-2"
                >
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipWrapper>
            </div>
          </div>
        </div>
        <div className="self-center lg:absolute -top-8 right-0">
          <CodeDrawer
            title={`<FormInputField>`}
            createCodeFunction={createComponentCodeFromAttributes}
            className="text-sm"
          />
        </div>
      </div>
    </>
  );
}
