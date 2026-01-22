import { flexRender } from "@tanstack/react-table";


const Table = ({ table }) => {
  return (
    <table className="table-auto  w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="border-b border-[#E0E0E0]">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="px-4 text-sm font-semibold text-[#3B3B3B] py-2 text-left"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="divide-y">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50 border-b border-[#E0E0E0]">
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="px-4 py-3 text-xs font-normal text-[#6C6C6C]"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
