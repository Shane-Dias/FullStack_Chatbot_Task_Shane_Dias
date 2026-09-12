import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

interface FieldWrapperProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function FieldWrapper({ label, error, required, children }: FieldWrapperProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {children}
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, required, ...rest }, ref) => (
  <FieldWrapper label={label} error={error} required={required}>
    <input ref={ref} className="input-field" {...rest} />
  </FieldWrapper>
));
Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, required, ...rest }, ref) => (
    <FieldWrapper label={label} error={error} required={required}>
      <textarea ref={ref} className="input-field min-h-[100px] resize-y" {...rest} />
    </FieldWrapper>
  )
);
Textarea.displayName = "Textarea";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, required, options, ...rest }, ref) => (
    <FieldWrapper label={label} error={error} required={required}>
      <select ref={ref} className="input-field" {...rest}>
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  )
);
Select.displayName = "Select";
