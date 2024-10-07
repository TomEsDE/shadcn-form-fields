import { Input, InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Control, FieldPath, FieldValues, FormState } from 'react-hook-form';
import FormFieldWrapper, { TFormFieldBaseProps } from './form-field-wrapper';
import { RefObject, useEffect, useRef } from 'react';

interface TFormInputField<T extends FieldValues>
  extends TFormFieldBaseProps,
    InputProps {
  // type?: 'text' | 'password' | 'number';
  name: FieldPath<T>;
  control: Control<T>;
  formState: FormState<T>;
  setInputRef?: (inputRef: RefObject<HTMLInputElement>) => void;
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
  setInputRef,
  ...inputProps
}: TFormInputField<T>) {
  const _inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (setInputRef) setInputRef(_inputRef);
  }, [_inputRef]);

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
          disabled={field.disabled || isSubmitting}
          {...inputProps}
          // to get access to ref, see here: https://www.react-hook-form.com/faqs/#Howtosharerefusage
          ref={(e) => {
            field.ref(e);
            // @ts-expect-error no other way, solution provided by react-hook-form - it works
            _inputRef.current = e;
          }}
          // in case you want extra access to the onChange-event
          onChange={(e) => {
            field.onChange(e);
            if (inputProps.onChange) {
              inputProps.onChange(e);
            }
          }}
        />
      )}
    </FormFieldWrapper>
  );
}

export default FormInputField;
