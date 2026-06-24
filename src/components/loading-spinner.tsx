export function LoadingSpinner({
  message = "Carregando...",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      <span className="text-sm font-medium text-branding-primary">
        {message}
      </span>
    </div>
  );
}
