'use client';

import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Calendar,
  EyeOff,
  Flag,
  Minus,
  SquareDashedBottom,
  SquareSquare,
  Underline,
  Undo,
} from 'lucide-react';
import { useForm } from 'react-hook-form';

import TooltipWrapper, { ToggleGroupWrapper } from '@/components/@index';

import FormComboboxField from '@/components/form/form-combobox-field';
import { TFormFieldLabelVariant } from '@/components/form/form-field-wrapper';
import { ThemeSwitchV2 } from '@/components/theme-switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { COUNTRIES, MONTH_NAMES } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import { z } from 'zod';
import CodeDrawer from './code-drawer';
SyntaxHighlighter.registerLanguage('tsx', tsx);

type TLabelVariant = TFormFieldLabelVariant | 'inside';
type TIconPosition = 'left' | 'right' | 'none';
type TIconBorder = 'none' | 'line' | 'dashed';
type TListVariant = 'countries' | 'monthNames';
type TAttrKey = 'countryA' | 'monthA';

const listCountries = COUNTRIES.sort((a, b) =>
  a.nativeName.localeCompare(b.nativeName)
).map((c) => ({
  id: c.code,
  value: c.nativeName,
}));
const listMonthnames = MONTH_NAMES.map((c) => ({
  id: c,
  value: c,
}));

const Schema = z.object({
  countryA: z.string({
    required_error: 'Please select a country.',
  }),
  monthA: z.string({
    required_error: 'Please select a month.',
  }),
});

type SchemaType = z.infer<typeof Schema>;

const resetValues: SchemaType = {
  countryA: '',
  monthA: '',
};

export default function PlaygroundCombobox() {
  const [attrKey, setAttrKey] = useState<TAttrKey>('countryA');
  const [listVariant, setListVariant] = useState<TListVariant>('countries');
  const [label, setLabel] = useState('Select Country');
  const [labelPosition, setLabelPosition] = useState<TLabelVariant>('inside');
  const [searchPlaceholder, setSearchPlaceholder] =
    useState('Search country...');
  const [emptyResultText, setEmptyResultText] = useState('No country found.');
  const [description, setDescription] = useState('');
  const [iconPosition, setIconPosition] = useState<TIconPosition>('right');
  const [iconBorder, setIconBorder] = useState<TIconBorder>('dashed');
  const [icon, setIcon] = useState<React.ReactNode | undefined>(
    <Flag height={16} width={16} />
  );
  const [simulateError, setSimulateError] = useState(false);
  const [list, setList] = useState(listCountries);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    console.log('useEffect', simulateError);

    if (simulateError) {
      // @ts-expect-error simulate error
      form.setValue(attrKey, undefined);
      formRef.current?.requestSubmit();
      setSimulateError(false);
    }

    return () => {};
  }, [simulateError]);

  const form = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues: resetValues,
  });

  const { handleSubmit } = form;

  const handleOnToggleLabelPos = async (value: TLabelVariant) => {
    setLabelPosition(value ? value : 'none');
  };
  const handleOnToggleIconPos = async (value: TIconPosition) => {
    setIconPosition(value ? value : 'none');
    if (value === 'none') setIcon(undefined);
    else {
      setIcon(<Flag height={16} width={16} />);
    }
  };
  const handleOnToggleIconBorder = async (value: TIconBorder) => {
    setIconBorder(value ? value : 'none');
  };
  const handleOnChangeList = async (value: TListVariant) => {
    setListVariant(value);
    if (value === 'countries') {
      setAttrKey('countryA');
      setList(listCountries);
      setLabel('Select Country');
      setIcon(<Flag height={16} width={16} />);
      setSearchPlaceholder('Search country...');
      setEmptyResultText('No country found.');
    } else {
      setAttrKey('monthA');
      setList(listMonthnames);
      setLabel('Select Month');
      setIcon(<Calendar height={16} width={16} />);
      setSearchPlaceholder('Search month...');
      setEmptyResultText('No month found.');
    }
  };
  const handleOnSimulateError = async () => {
    setSimulateError(!simulateError);
  };
  const handleOnSubmit = async () => {
    setSimulateError(false);
  };
  const handleOnReset = async (value: string = '') => {
    form.reset({ [attrKey]: value });
    setDescription('');
  };

  const createComponentCodeFromAttributes = () => {
    const codeString: string[] = [];

    codeString.push(
      `/* the list-items must contain\nthe attributes 'id' and 'value' */`
    );
    if (listVariant === 'countries') {
      codeString.push(`const list = COUNTRY_ARRAY.map((c) => ({
  id: c.code,
  value: c.nativeName,
}));\n`);
    } else {
      codeString.push(`const list = MONTHNAME_ARRAY.map((month) => ({
  id: month,
  value: month,
}));\n`);
    }

    codeString.push(`<FormComboboxField`);

    codeString.push(`\tname="${attrKey.slice(0, -1)}"`);
    codeString.push(`\tform={form}`);
    codeString.push(`\tlist={list}`);

    codeString.push(`\tonChange={(fieldValue) => {
    console.log('react on changes separately');
  }}`);

    if (label) codeString.push(`\tlabel="${label}"`);
    if (labelPosition && labelPosition !== 'none')
      codeString.push(`\tlabelVariant="${labelPosition}"`);

    codeString.push(`\tsearchPlaceholder="${searchPlaceholder}"`);

    if (iconPosition !== 'none') {
      codeString.push(
        `\ticon={${
          listVariant === 'countries'
            ? `<Flag height={16} width={16} />`
            : `<Calendar height={16} width={16} />`
        }}`
      );
      codeString.push(`\ticonPosition="${iconPosition}"`);
      if (iconBorder !== 'none')
        codeString.push(`\ticonBorder="${iconBorder}"`);
    }

    codeString.push(`/>`);

    // setCodeString(codeString.join(''));

    return codeString.join('\n');
  };

  return (
    <>
      <div className="relative self-center flex flex-col gap-1 justify-center items-center w-full max-w-[400px] border-dashed border-2 p-4 bg-background">
        <div className="absolute top-1 right-1">
          <ThemeSwitchV2 />{' '}
        </div>
        <div className="flex flex-col gap-1 text-xl font-semibold">
          Combobox
        </div>
        <div className="w-11/12 max-w-[350px] self-center">
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
              <div className="flex flex-col gap-3 w-full">
                <FormComboboxField
                  name={attrKey}
                  form={form}
                  list={list}
                  onChange={(fieldValue) => {
                    console.log('selected atrtibute', attrKey, fieldValue);
                    handleOnReset(fieldValue);
                  }}
                  searchPlaceholder={searchPlaceholder}
                  emptyResultText={emptyResultText}
                  label={label}
                  labelVariant={labelPosition}
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
                    key: 'inside',
                    value: 'inside',
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
            <div className="font-semibold text-primary">Change List</div>
            <div>
              <ToggleGroupWrapper
                values={[
                  {
                    key: 'countries',
                    value: 'Countries',
                    icon: <Flag className="h-4 w-4" />,
                  },
                  {
                    key: 'monthNames',
                    value: 'Month Names',
                    icon: <Calendar className="h-4 w-4" />,
                  },
                ]}
                value={listVariant}
                onChange={handleOnChangeList}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-primary">Search Placeholder</div>
            <div>
              <Input
                value={searchPlaceholder}
                onChange={(e) => setSearchPlaceholder(e.target.value)}
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
                  onClick={() => handleOnReset()}
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
            title={`<FormComboboxField>`}
            createCodeFunction={createComponentCodeFromAttributes}
            className="text-sm"
          />
        </div>
      </div>
    </>
  );
}
