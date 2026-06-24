interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex  flex-col items-center justify-between border-t border-slate-200 bg-white px-4 py-3 sm:px-6 mt-4">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={currentPage === 0}
          onClick={() => onPageChange(currentPage - 1)}
          className="relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          disabled={currentPage >= totalPages - 1}
          onClick={() => onPageChange(currentPage + 1)}
          className="relative ml-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          Próxima
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <span className="isolate inline-flex rounded-md shadow-sm gap-1">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="relative inline-flex items-center border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-40"
            >
              Anterior
            </button>

            <span className="relative inline-flex items-center border border-slate-300 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 focus:z-20">
              {currentPage + 1}
            </span>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className="relative inline-flex items-center border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-40"
            >
              Próxima
            </button>
          </span>
        </div>
      </div>
    </nav>
  );
}
