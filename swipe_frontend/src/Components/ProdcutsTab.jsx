const ProductsTab = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-white dark:text-white">
        Products
      </h2>

      {/* Table Placeholder */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-500 text-white">
              <th className="p-2">Name</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Unit Price</th>
              <th className="p-2">Tax</th>
              <th className="p-2">Price w/ Tax</th>
            </tr>
          </thead>

          <tbody className="text-white">
            <tr>
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

export default ProductsTab;
