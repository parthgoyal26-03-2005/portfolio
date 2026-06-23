import { cn } from "@/app/lib/utils";

type FormFieldProps = {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  className?: string;
  required?: boolean;
};

export function FormField({
  label,
  placeholder,
  name,
  type = "text",
  multiline = false,
  rows = 4,
  className,
  required,
}: FormFieldProps) {
  const inputClass = cn(
    "w-full border-b border-glass-stroke bg-transparent py-3 text-on-surface outline-none transition-colors duration-300",
    "placeholder:text-text-muted/50 focus:border-primary",
    className,
  );

  return (
    <div className="space-y-1.5">
      <label className="font-mono-label text-text-muted">{label}</label>
      {multiline ? (
        <textarea
          name={name}
          rows={rows}
          placeholder={placeholder}
          className={cn(inputClass, "resize-none")}
          required={required}
        />
      ) : (
        <input name={name} type={type} placeholder={placeholder} className={inputClass} required={required} />
      )}
    </div>
  );
}
