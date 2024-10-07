'use client';

import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Calendar,
  EyeOff,
  Minus,
  Route,
  SquareDashedBottom,
  SquareSquare,
  Underline,
  Undo,
} from 'lucide-react';
import { useForm } from 'react-hook-form';

import TooltipWrapper, { ToggleGroupWrapper } from '@/components/@index';

import { TFormFieldLabelVariant } from '@/components/form/form-field-wrapper';
import FormSelectField from '@/components/form/form-select-field';
import { ThemeSwitchV2 } from '@/components/theme-switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectItem } from '@/components/ui/select';
import { MONTH_NAMES, USER_ROLES } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import CodeDrawer from './code-drawer';

type TLabelVariant = TFormFieldLabelVariant | 'inside';
type TIconPosition = 'left' | 'right' | 'none';
type TIconBorder = 'none' | 'line' | 'dashed';
type TListVariant = 'roles' | 'monthNames';
type TAttrKey = 'roleB' | 'monthB';

const listRoles = USER_ROLES.map((c) => ({
  id: c as string,
  value: c as string,
}));
const listMonthnames = MONTH_NAMES.map((c) => ({
  id: c as string,
  value: c as string,
}));

const Schema = z.object({
  roleB: z.string({
    required_error: 'Please select a role.',
  }),
  monthB: z.string({
    required_error: 'Please select a month.',
  }),
});

type SchemaType = z.infer<typeof Schema>;

const resetValues: SchemaType = {
  roleB: '',
  monthB: '',
};

export default function PlaygroundSelect() {
  const [attrKey, setAttrKey] = useState<TAttrKey>('roleB');
  const [listVariant, setListVariant] = useState<TListVariant>('roles');
  const [label, setLabel] = useState('Select Role');
  const [labelPosition, setLabelPosition] = useState<TLabelVariant>('top');
  const [selectPlaceholder, setSelectPlaceholder] = useState('Select role...');
  const [description, setDescription] = useState('');
  const [iconPosition, setIconPosition] = useState<TIconPosition>('right');
  const [iconBorder, setIconBorder] = useState<TIconBorder>('dashed');
  const [icon, setIcon] = useState<React.ReactNode | undefined>(
    <Route height={16} width={16} />
  );
  const [simulateError, setSimulateError] = useState(false);
  const [list, setList] = useState(listRoles);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    createComponentCodeFromAttributes();
  }, []);

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

  const { handleSubmit, control, formState } = form;

  const handleOnToggleLabelPos = async (value: TLabelVariant) => {
    setLabelPosition(value ? value : 'none');
  };
  const handleOnToggleIconPos = async (value: TIconPosition) => {
    setIconPosition(value ? value : 'none');
    if (value === 'none') setIcon(undefined);
    else {
      setIcon(<Route height={16} width={16} />);
    }
  };
  const handleOnToggleIconBorder = async (value: TIconBorder) => {
    setIconBorder(value ? value : 'none');
  };
  const handleOnChangeList = async (value: TListVariant) => {
    setListVariant(value);
    handleOnReset();
    if (value === 'roles') {
      setAttrKey('roleB');
      setList(listRoles);
      setLabel('Select Role');
      setIcon(<Route height={16} width={16} />);
      setSelectPlaceholder('Select role...');
    } else {
      setAttrKey('monthB');
      setList(listMonthnames);
      setLabel('Select Month');
      setIcon(<Calendar height={16} width={16} />);
      setSelectPlaceholder('Select month...');
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
    codeString.push(`<FormSelectField`);

    codeString.push(`\n  name="${attrKey.slice(0, -1)}"`);
    codeString.push(`\n  control={control}\n  formState={formState}`);
    codeString.push(`\n  onChange={(fieldValue) => {
    console.log('react on changes separately');
  }}`);

    if (label) codeString.push(`\n  label="${label}"`);
    if (labelPosition && labelPosition !== 'none')
      codeString.push(`\n  labelVariant="${labelPosition}"`);

    codeString.push(`\n  selectPlaceholder="${selectPlaceholder}"`);

    if (iconPosition !== 'none') {
      codeString.push(
        `\n  icon={${
          listVariant === 'roles'
            ? `<Route height={16} width={16} />`
            : `<Calendar height={16} width={16} />`
        }}`
      );
      codeString.push(`\n  iconPosition="${iconPosition}"`);
      if (iconBorder !== 'none')
        codeString.push(`\n  iconBorder="${iconBorder}"`);
    }

    codeString.push(`>`);

    // list
    const { itemName, keyName, valueName } =
      listVariant === 'roles'
        ? { itemName: 'role', keyName: 'role.id', valueName: 'role.name' }
        : { itemName: 'month', keyName: 'month', valueName: 'month' };
    codeString.push(`\n   {/* display your list-items independent
      from the form field component */}
    {${listVariant}.map((${itemName}) => (
      <SelectItem key={${keyName}} value={${valueName}}>
        {${valueName}}
      </SelectItem>
    ))}`);
    codeString.push(`\n</FormSelectField>`);

    return codeString.join('');
  };

  return (
    <>
      <div className="relative self-center flex flex-col gap-1 justify-center items-center w-full max-w-[400px] border-dashed border-2 p-4 bg-background">
        <div className="absolute top-1 right-1">
          <ThemeSwitchV2 />{' '}
        </div>
        <div className="flex flex-col gap-1 text-xl font-semibold">Select</div>
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
                <FormSelectField
                  name={attrKey}
                  control={control}
                  formState={formState}
                  onChange={(fieldValue) => {
                    console.log('selected atrtibute', attrKey, fieldValue);
                    handleOnReset(fieldValue);
                  }}
                  selectPlaceholder={selectPlaceholder}
                  label={label}
                  labelVariant={labelPosition}
                  icon={icon}
                  iconPlacement={
                    iconPosition === 'none' ? undefined : iconPosition
                  }
                  iconBorderStyle={iconBorder}
                  description={description}
                  className="dark:bg-secondary/30"
                >
                  {/* implement your list-items completely independent from the form field component */}
                  {list.map((item) => (
                    <SelectItem key={item.id} value={item.value}>
                      {item.value}
                    </SelectItem>
                  ))}
                </FormSelectField>
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
                    key: 'roles',
                    value: 'Countries',
                    icon: <Route className="h-4 w-4" />,
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
            <div className="font-semibold text-primary">Select Placeholder</div>
            <div>
              <Input
                value={selectPlaceholder}
                onChange={(e) => setSelectPlaceholder(e.target.value)}
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
            title={`<FormSelectField>`}
            createCodeFunction={createComponentCodeFromAttributes}
            className="text-sm"
          />
        </div>
      </div>
    </>
  );
}
