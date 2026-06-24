import { ChangeEventHandler } from "react";

export interface SelectInputOptions {
  value: string | number | readonly string[] | undefined;
  label: string;
}

interface SelectInputProps {
  value: string | number | readonly string[] | undefined;
  onChange: ChangeEventHandler<HTMLSelectElement, HTMLSelectElement>;
  options: SelectInputOptions[];
}

export function SelectInput({ value, onChange, options }: SelectInputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <select
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
