import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Control, FieldPath, FieldValues, FormState } from 'react-hook-form';
import FormFieldWrapper, { TFormFieldBaseProps } from './form-field-wrapper';
import { TFormFieldLabelVariant } from './form-field-wrapper';

type TLabelVariant = TFormFieldLabelVariant | 'inside';

interface TFormSelectField<T extends FieldValues>
  extends Omit<TFormFieldBaseProps, 'labelVariant'> {
  name: FieldPath<T>;
  formState: FormState<T>;
  control: Control<T>;
  onChange?: (fieldValue: string) => void;
  selectPlaceholder: string;
  className?: string;
  children: React.ReactNode;
  labelVariant?: TLabelVariant;
}

function FormSelectField<T extends FieldValues>({
  name,
  formState: { errors, isSubmitting },
  control,
  onChange,
  selectPlaceholder,
  label,
  labelVariant,
  description,
  className,
  classNameLabel,
  classNameDescription,
  icon,
  iconPlacement,
  iconBorderStyle,
  children,
}: TFormSelectField<T>) {
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
        <Select
          onValueChange={(value) => {
            field.onChange(value);
            if (onChange) onChange(value);
          }}
          value={field.value}
          defaultValue={undefined}
          disabled={isSubmitting}
        >
          <SelectTrigger
            className={cn(
              errors[name] && 'border-destructive border focus-visible:ring-0',
              `bg-background h-auto peer`,
              !field.value && 'italic text-foreground/50',
              !icon ? '' : iconPlacement === 'left' ? 'pl-10' : 'pr-10',
              className
            )}
          >
            <div className=" flex flex-col items-start">
              {labelVariant === 'inside' && (
                <span className="font-semibold uppercase text-[0.70rem] text-primary">
                  {label}
                  {/* {name} */}
                </span>
              )}
              <SelectValue placeholder={selectPlaceholder} />
            </div>
          </SelectTrigger>
          <SelectContent>{children}</SelectContent>
        </Select>
      )}
    </FormFieldWrapper>
  );
}

export default FormSelectField;
