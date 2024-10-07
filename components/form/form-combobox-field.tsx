import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  UseFormReturn,
  FieldPath,
  FieldValues,
  PathValue,
  Path,
} from 'react-hook-form';
import FormFieldWrapper, { TFormFieldBaseProps } from './form-field-wrapper';
import { ReactNode, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { TFormFieldLabelVariant } from './form-field-wrapper';

type TLabelVariant = TFormFieldLabelVariant | 'inside';
type TListItemBase<T> = { id: PathValue<T, Path<T>>; value: string };

interface TFormComboboxField<T extends FieldValues, P extends TListItemBase<T>>
  extends Omit<TFormFieldBaseProps, 'labelVariant'> {
  name: FieldPath<T>;
  form: UseFormReturn<T>;
  getButtonText?: (fieldValue: string) => string | undefined;
  searchPlaceholder?: string;
  emptyResultText?: string;
  list: P[];
  onChange?: (fieldValue: string) => void;
  listJsx?: (listItem: P) => ReactNode;
  className?: string;
  labelVariant?: TLabelVariant;
}

function FormComboboxField<T extends FieldValues, P extends TListItemBase<T>>({
  name,
  form,
  getButtonText,
  searchPlaceholder = 'Search...',
  emptyResultText = 'No result',
  list,
  onChange,
  listJsx,
  label,
  labelVariant,
  description,
  className,
  classNameLabel,
  classNameDescription,
  icon,
  iconPlacement,
  iconBorderStyle,
}: TFormComboboxField<T, P>) {
  const {
    control,
    formState: { errors, isSubmitting },
  } = form;
  const [open, setOpen] = useState(false);
  return (
    <FormFieldWrapper
      name={name}
      control={control}
      errors={errors}
      label={labelVariant !== 'inside' ? label : undefined}
      labelVariant={labelVariant === 'inside' ? 'none' : labelVariant}
      description={description}
      classNameLabel={classNameLabel}
      classNameDescription={classNameDescription}
      icon={icon}
      iconPlacement={iconPlacement}
      iconBorderStyle={iconBorderStyle}
    >
      {({ field }) => (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            asChild
            className={cn(
              errors[name] && 'border-destructive border focus-visible:ring-0',
              `bg-background peer`,
              !field.value && 'italic text-foreground/50',
              !icon ? '' : iconPlacement === 'left' ? 'pl-10' : 'pr-10',
              className
            )}
          >
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn('w-full flex justify-between h-auto', className)}
              disabled={isSubmitting}
            >
              <div className=" flex flex-col items-start">
                {labelVariant === 'inside' && (
                  <span
                    className={cn(
                      'font-semibold uppercase text-[0.70rem] text-primary',
                      classNameLabel
                    )}
                  >
                    {label}
                  </span>
                )}
                <span className="font-normal">
                  {getButtonText
                    ? getButtonText(field.value)
                    : list.find((item) => item.id === field.value)?.value ??
                      label}
                  {/* `Select ${name}...`} */}
                </span>
              </div>

              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          {/* relative content-width-fix from here https://github.com/shadcn-ui/ui/issues/1690 */}
          <PopoverContent className="p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
            <Command>
              <CommandInput placeholder={searchPlaceholder} />
              <CommandList>
                <CommandEmpty>{emptyResultText}</CommandEmpty>
                <CommandGroup>
                  {list.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.value}
                      onSelect={() => {
                        form.setValue(name, item.id);
                        if (onChange) onChange(item.id);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          field.value === item.id ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {listJsx ? listJsx(item) : item.value}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </FormFieldWrapper>
  );
}

export default FormComboboxField;
