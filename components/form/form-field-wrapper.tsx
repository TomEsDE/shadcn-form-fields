import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import {
  Control,
  ControllerRenderProps,
  FieldErrors,
  FieldPath,
  FieldValues,
  Path,
} from 'react-hook-form';

export type TFormFieldLabelVariant =
  | 'top'
  | 'left'
  | 'border'
  | 'floating-border'
  | 'none';

export interface TFormFieldBaseProps {
  // label: { text: string; variant: TFormFieldLabelVariant };
  label?: string;
  labelVariant?: TFormFieldLabelVariant;
  classNameLabel?: string;
  description?: string;
  classNameDescription?: string;
  classNameErrors?: string;
  icon?: React.ReactNode;
  iconPlacement?: 'left' | 'right';
  iconBorderStyle?: 'none' | 'line' | 'dashed';
}

interface TFormFieldWrapper<T extends FieldValues> extends TFormFieldBaseProps {
  name: FieldPath<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  children: ({
    field,
  }: {
    field: ControllerRenderProps<T, Path<T>>;
  }) => React.ReactNode;
}

function FormFieldWrapper<T extends FieldValues>({
  name,
  control,
  errors,
  label,
  labelVariant = !!label ? 'top' : 'none',
  classNameLabel,
  description,
  classNameDescription,
  classNameErrors,
  icon,
  iconPlacement,
  iconBorderStyle,
  children,
}: TFormFieldWrapper<T>) {
  return (
    <div className={cn(!errors[name] && 'pb-2')}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="space-y-0">
            <div
              className={cn(
                'relative',
                labelVariant === 'top' && 'space-y-2',
                labelVariant === 'left' && 'flex gap-2 items-center'
              )}
            >
              {/**
               * 'top'- or 'left'-Label
               */}
              <TopLeftLabel
                label={label}
                labelVariant={labelVariant}
                className={classNameLabel}
                isError={!!errors[name]}
                htmlFor={name}
              />

              <div className="relative grow">
                {/**
                 * icon
                 */}
                <Icon
                  icon={icon}
                  iconPlacement={iconPlacement}
                  iconBorderStyle={iconBorderStyle}
                />

                {/**
                 * children, the actual form-field
                 */}
                <FormControl>{children({ field })}</FormControl>

                {/**
                 * 'border'- or 'floating-border'-Label => must be below the children in order to work
                 */}
                <BorderLabel
                  label={label}
                  labelVariant={labelVariant}
                  className={classNameLabel}
                  isError={!!errors[name]}
                  htmlFor={name}
                  iconPlacement={iconPlacement}
                />
              </div>
            </div>
            <FormDescription
              className={cn(
                'text-left ml-1',
                labelVariant === 'left' && 'text-right mr-1',
                classNameDescription
              )}
            >
              {description}
            </FormDescription>
            <FormMessage
              className={cn(
                'text-left ml-1 pt-1',
                errors[name] && 'pb-2',
                labelVariant === 'left' && 'text-right mr-1',
                classNameErrors
              )}
            />
          </FormItem>
        )}
      />
    </div>
  );
}

function TopLeftLabel({
  label,
  labelVariant,
  className,
  htmlFor,
  isError,
}: {
  label?: string;
  labelVariant: TFormFieldLabelVariant;
  className?: string;
  htmlFor: string;
  isError: boolean;
}) {
  if (!label || !['top', 'left'].includes(labelVariant)) return <></>;
  return (
    <>
      <FormLabel
        htmlFor={htmlFor}
        className={cn(
          'flex text-left text-primary ml-1',
          isError && 'text-destructive peer-focus:text-destructive',
          className
        )}
      >
        {label}
      </FormLabel>
    </>
  );
}

function BorderLabel({
  label,
  labelVariant,
  className,
  htmlFor,
  isError,
  iconPlacement,
}: {
  label?: string;
  labelVariant: TFormFieldLabelVariant;
  className?: string;
  htmlFor: string;
  isError: boolean;
  iconPlacement?: 'left' | 'right';
}) {
  if (!label || !['border', 'floating-border'].includes(labelVariant))
    return <></>;
  return (
    <>
      <label
        htmlFor={htmlFor}
        className={cn(
          `absolute text-sm text-primary/80
            duration-300 transform -translate-y-[16px] scale-75 top-1.5 z-10
            origin-[0] mx-1 px-1 bg-background font-semibold
            peer-focus:mx-1 peer-focus:px-1 peer-focus:text-primary
            peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-[16px] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`,
          labelVariant === 'floating-border' &&
            `peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2
              peer-placeholder-shown:top-1/2 peer-placeholder-shown:mx-2 ${
                iconPlacement === 'left' && 'peer-placeholder-shown:ml-10'
              }`,
          isError && 'text-destructive peer-focus:text-destructive',
          className
        )}
      >
        {label}
      </label>
    </>
  );
}

function Icon({
  icon,
  iconPlacement,
  iconBorderStyle,
}: {
  icon?: React.ReactNode;
  iconPlacement?: 'left' | 'right';
  iconBorderStyle?: 'none' | 'line' | 'dashed';
}) {
  if (!icon) return <></>;

  return (
    <>
      <div
        className={cn(
          'absolute inset-y-0 flex items-center px-1.5 pointer-events-none',
          iconPlacement === 'left' ? 'left-0.5' : 'right-0.5',
          iconBorderStyle !== 'none' &&
            (iconPlacement === 'left'
              ? `border-r border-${iconBorderStyle}`
              : `border-l border-${iconBorderStyle}`)
        )}
      >
        {icon}
      </div>
    </>
  );
}

export default FormFieldWrapper;
