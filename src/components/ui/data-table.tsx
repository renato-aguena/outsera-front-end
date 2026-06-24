import React from "react";

export interface Column<T> {
  header: React.ReactNode;
  accessorKey: keyof T | ((row: T) => React.ReactNode);
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export function DataTable<T>({ columns, data }: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm relative scrollbar-thin overflow-y-auto max-h-[45dvh]">
      <table className="w-full text-left text-sm text-slate-600 border-collapse">
        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-700 border-b border-slate-200 sticky top-0">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} scope="col" className="px-6 py-4">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-12 text-center text-slate-400"
              >
                Nenhuma informação encontrada
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => {
              const rowKey = rowIndex;

              return (
                <tr
                  key={rowKey}
                  className="hover:bg-slate-50/80 transition-colors duration-150"
                >
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-6 py-4 whitespace-nowrap">
                      {typeof col.accessorKey === "function"
                        ? col.accessorKey(row)
                        : (row[col.accessorKey] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
