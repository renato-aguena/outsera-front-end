import React from "react";

interface TextInputProps {
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  handleSubmit: React.SubmitEventHandler<HTMLFormElement>;
}

export function TextInput({
  placeholder,
  value,
  setValue,
  handleSubmit,
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
        />
      </form>
    </div>
  );
}
