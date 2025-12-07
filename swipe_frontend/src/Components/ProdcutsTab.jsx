import { useSelector, useDispatch } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const ProductsTab = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices.invoices || []);

  const allProducts = invoices.flatMap((inv) =>
    inv.products.map((p, idx) => ({
      ...p,
      serialNumber: inv.serialNumber,
      productIndex: idx,
    }))
  );

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row, getValue }) => (
        <input
          className="bg-transparent border px-1 rounded"
          defaultValue={getValue()}
          onBlur={(e) => console.log(e)}
        />
      ),
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
      cell: ({ row, getValue }) => (
        <input
          type="number"
          className="bg-transparent border px-1 rounded"
          defaultValue={getValue()}
          onBlur={(e) => console.log(e)}
        />
      ),
    },
    {
      header: "Unit Price",
      accessorKey: "unitPrice",
    },
    {
      header: "Tax Rate",
      accessorKey: "taxRate",
    },
    {
      header: "Price With Tax",
      accessorKey: "priceWithTax",
    },
  ];

  const table = useReactTable({
    data: allProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="text-white">
      <h2 className="text-xl mb-4">Products</h2>

      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id} className="border-b border-gray-500">
              {hg.headers.map((h) => (
                <th key={h.id} className="p-2">
                  {h.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-gray-700">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTab;
