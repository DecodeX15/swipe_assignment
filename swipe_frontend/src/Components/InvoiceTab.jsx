const InvoiceTab = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
        Invoices
      </h2>

      {/* Table Placeholder */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-500">
              <th className="p-2">Serial No</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Product</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Tax</th>
              <th className="p-2">Total</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {/* Dynamic data will come from Redux */}
            <tr>
              <td className="p-2">—</td>
              <td className="p-2">—</td>
              <td className="p-2">—</td>
              <td className="p-2">—</td>
              <td className="p-2">—</td>
              <td className="p-2">—</td>
              <td className="p-2">—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTab;
