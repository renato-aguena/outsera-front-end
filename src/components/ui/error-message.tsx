export function ErrorMessage({ message }: { message: string }) {
  return <span className="text-red-500/40 text-sm">{message}</span>;
}
