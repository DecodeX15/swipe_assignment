const CustomersTab = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-white dark:text-white">
        Customers
      </h2>

      {/* Table Placeholder */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="text-white">
            <tr className="text-left border-b border-gray-500">
              <th className="p-2">Customer Name</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Total Purchase</th>
            </tr>
          </thead>

          <tbody className="text-white">
            <tr>
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

export default CustomersTab;
