'use client';

import FormComboboxField from '@/components/form/form-combobox-field';
import FormInputField from '@/components/form/form-input-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { COUNTRIES } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Flag, KeyRound, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { resetValues, Schema, SchemaType } from './utils';
import { RefObject, useEffect, useState } from 'react';

const list = COUNTRIES.sort((a, b) =>
  a.nativeName.localeCompare(b.nativeName)
).map((c) => ({
  id: c.code,
  value: c.nativeName,
}));

export default function HeroExamples({
  title = 'Examples',
  showCombo = true,
}: {
  title?: string;
  showCombo?: boolean;
}) {
  const form = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues: showCombo
      ? {
          username: 'John Doe',
          password: 'Abcd1234',
          country: 'SE',
        }
      : resetValues,
  });

  const {
    control,
    handleSubmit,
    formState,
    formState: { isSubmitting },
  } = form;

  const [inputRef, setInputRef] = useState<RefObject<HTMLInputElement> | null>(
    null
  );

  useEffect(() => {
    if (inputRef) {
      inputRef.current?.focus();
    }
  }, [inputRef]);

  const onSubmit = async (formdata: SchemaType) => {
    console.log(formdata);

    if (!showCombo) formdata.country = undefined;

    toast({
      title: 'submitted data',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(formdata, null, 2)}
          </code>
        </pre>
      ),
    });
  };
  const handleOnReset = async () => {
    form.reset(resetValues);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 mx-auto border rounded-lg bg-card/20 dark:bg-black/30 py-6 mt-2"
      >
        <div className="font-semibold text-lg -mt-2">{title}</div>
        <div className="flex flex-col gap-3 w-3/4 pl-4">
          {showCombo ? (
            <>
              <FormInputField
                name="username"
                control={control}
                formState={formState}
                label="Username"
                labelVariant={'floating-border'}
                placeholder="Enter your username"
                icon={<User height={16} width={16} />}
                iconBorderStyle="dashed"
                className="dark:bg-secondary/30"
                classNameLabel="text-base -translate-y-[18px] peer-focus:-translate-y-[18px]"
                setInputRef={setInputRef}
              />
              <FormInputField
                type="password"
                name="password"
                formState={formState}
                control={control}
                label="Password"
                labelVariant={'border'}
                icon={<KeyRound height={16} width={16} />}
                iconPlacement="left"
                placeholder=""
                className={''}
              />
              <FormComboboxField
                name="country"
                form={form}
                searchPlaceholder="Search country..."
                emptyResultText="No country found."
                list={list}
                onChange={(fieldValue) => {
                  console.log('selected country-code', fieldValue);
                }}
                label="Select Country"
                labelVariant={'inside'}
                icon={<Flag height={16} width={16} />}
                iconBorderStyle="dashed"
                iconPlacement="right"
                description="What is your preferred language"
                className={'dark:bg-secondary/20'}
                classNameLabel="text-[0.75rem]"
              />
            </>
          ) : (
            <>
              <FormInputField
                name="username"
                control={control}
                formState={formState}
                label="Username"
                placeholder="Enter your username"
              />
              <FormInputField
                type="password"
                name="password"
                formState={formState}
                control={control}
                label="Password"
              />
            </>
          )}
          <div className="flex gap-4 justify-between">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
            <Button
              variant={'secondary'}
              type="button"
              onClick={handleOnReset}
              className="w-full"
              disabled={isSubmitting}
            >
              {'Reset'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
