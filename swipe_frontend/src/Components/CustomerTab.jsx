import { useSelector, useDispatch } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const CustomersTab = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices.invoices || []);

  const map = {};

  invoices.forEach((inv) => {
    if (!map[inv.customerName]) {
      map[inv.customerName] = {
        customerName: inv.customerName,
        phone: inv.customerPhone,
        totalPurchase: inv.totalAmount,
      };
    } else {
      map[inv.customerName].totalPurchase += inv.totalAmount;
    }
  });

  const customers = Object.values(map);

  const columns = [
    {
      header: "Customer Name",
      accessorKey: "customerName",
    },
    {
      header: "Phone Number",
      accessorKey: "phone",
    },
    {
      header: "Total Purchase Amount",
      accessorKey: "totalPurchase",
    },
  ];

  const table = useReactTable({
    data: customers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="text-white">
      <h2 className="text-xl mb-4">Customers</h2>

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

export default CustomersTab;
