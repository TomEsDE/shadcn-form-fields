import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Control, FieldPath, FieldValues, FormState } from 'react-hook-form';
import FormFieldWrapper, { TFormFieldBaseProps } from './form-field-wrapper';

interface TFormInputField<T extends FieldValues> extends TFormFieldBaseProps {
  type?: 'text' | 'password' | 'number';
  name: FieldPath<T>;
  control: Control<T>;
  formState: FormState<T>;
  placeholder?: string;
  className?: string;
}

function FormInputField<T extends FieldValues>({
  type = 'text',
  name,
  control,
  formState: { errors, isSubmitting },
  label,
  labelVariant,
  description,
  placeholder,
  className,
  classNameLabel,
  classNameDescription,
  icon,
  iconPlacement,
  iconBorderStyle,
}: TFormInputField<T>) {
  return (
    <FormFieldWrapper
      name={name}
      control={control}
      errors={errors}
      label={label}
      labelVariant={labelVariant}
      description={description}
      classNameLabel={classNameLabel}
      classNameDescription={classNameDescription}
      icon={icon}
      iconPlacement={iconPlacement}
      iconBorderStyle={iconBorderStyle}
    >
      {({ field }) => (
        <Input
          {...field}
          id={name}
          type={type}
          className={cn(
            errors[name] && 'border-destructive border focus-visible:ring-0',
            `bg-background placeholder:text-left placeholder:italic placeholder:opacity-70 peer`,
            !icon ? '' : iconPlacement === 'left' ? 'pl-10' : 'pr-10',
            className
          )}
          placeholder={
            !['floating-border'].includes(labelVariant ?? '')
              ? placeholder
              : ' '
          }
          disabled={isSubmitting}
        />
      )}
    </FormFieldWrapper>
  );
}

export default FormInputField;
