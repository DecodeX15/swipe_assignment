import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setInvoices } from "../features/invoicesSlice";
import InitialLoader from "./Loader.jsx";
const ProductsTab = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices.invoices || []);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(invoices);
  }, [invoices]);

  useEffect(() => {
    const t = setTimeout(() => {
      dispatch(setInvoices(tableData));
    }, 400);
    return () => clearTimeout(t);
  }, [tableData, dispatch]);

  const inputClass = (val, extra = "") =>
    `bg-black border px-2 py-1 rounded ${extra} ${
      val == null ? "border-red-500" : "border-green-500"
    }`;

  const updateProduct = (serial, productIndex, field, value) => {
    const updated = tableData.map((inv) => {
      if (inv.serialNumber !== serial) return inv;
      const updatedProducts = inv.products.map((p, i) =>
        i === productIndex ? { ...p, [field]: value } : p
      );
      return { ...inv, products: updatedProducts };
    });
    setTableData(updated);
  };
  if (invoices.length === 0)
    return (
      <>
        <InitialLoader />
      </>
    );
  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-6">Products</h2>

      <div className="overflow-x-auto w-full">
        <table className="min-w-max w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-600 bg-gray-800">
              <th className="px-6 py-2 text-left">Serial</th>
              <th className="px-6 py-2 text-left">Product Name</th>
              <th className="px-6 py-2 text-left">Qty</th>
              <th className="px-6 py-2 text-left">Unit Price</th>
              <th className="px-6 py-2 text-left">Unit</th>
              <th className="px-6 py-2 text-left">Discount</th>
              <th className="px-6 py-2 text-left">Taxable Value</th>
              <th className="px-6 py-2 text-left">Tax %</th>
              <th className="px-6 py-2 text-left">Tax Amt</th>
              <th className="px-6 py-2 text-left">Price w/Tax</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((inv) =>
              inv.products.map((p, idx) => (
                <tr
                  key={`${inv.serialNumber}-${idx}`}
                  className="border-b border-gray-700"
                >
                  {/* Serial Number */}
                  <td className="px-6 py-2">{inv.serialNumber}</td>

                  {/* Product Name */}
                  <td className="px-6 py-2">
                    <input
                      className={inputClass(p.name)}
                      value={p.name ?? ""}
                      placeholder={p.name == null ? "❗missing" : ""}
                      onChange={(e) =>
                        updateProduct(
                          inv.serialNumber,
                          idx,
                          "name",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  {/* Quantity */}
                  <td className="px-6 py-2">
                    <input
                      className={`${inputClass(p.quantity)} w-16`}
                      value={p.quantity ?? ""}
                      placeholder={p.quantity == null ? "❗missing" : ""}
                      onChange={(e) =>
                        updateProduct(
                          inv.serialNumber,
                          idx,
                          "quantity",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  {/* Unit Price */}
                  <td className="px-6 py-2">
                    <input
                      className={`${inputClass(p.unitPrice)} w-24`}
                      value={p.unitPrice ?? ""}
                      placeholder={p.unitPrice == null ? "❗missing" : ""}
                      onChange={(e) =>
                        updateProduct(
                          inv.serialNumber,
                          idx,
                          "unitPrice",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  {/* Unit */}
                  <td className="px-6 py-2">
                    <input
                      className={inputClass(p.unit)}
                      value={p.unit ?? ""}
                      placeholder={p.unit == null ? "❗missing" : ""}
                      onChange={(e) =>
                        updateProduct(
                          inv.serialNumber,
                          idx,
                          "unit",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  {/* Discount */}
                  <td className="px-6 py-2">
                    <input
                      className={`${inputClass(p.discount)} w-25`}
                      value={p.discount ?? ""}
                      placeholder={p.discount == null ? "❗missing" : ""}
                      onChange={(e) =>
                        updateProduct(
                          inv.serialNumber,
                          idx,
                          "discount",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  {/* Taxable Value */}
                  <td className="px-6 py-2">
                    <input
                      className={`${inputClass(p.taxableValue)} w-24`}
                      value={p.taxableValue ?? ""}
                      placeholder={p.taxableValue == null ? "❗missing" : ""}
                      onChange={(e) =>
                        updateProduct(
                          inv.serialNumber,
                          idx,
                          "taxableValue",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  {/* Tax % */}
                  <td className="px-6 py-2">
                    <input
                      className={`${inputClass(p.taxRate)} w-16`}
                      value={p.taxRate ?? ""}
                      placeholder={p.taxRate == null ? "❗missing" : ""}
                      onChange={(e) =>
                        updateProduct(
                          inv.serialNumber,
                          idx,
                          "taxRate",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  {/* Tax Amount */}
                  <td className="px-6 py-2">
                    <input
                      className={`${inputClass(p.taxAmount)} w-24`}
                      value={p.taxAmount ?? ""}
                      placeholder={p.taxAmount == null ? "❗missing" : ""}
                      onChange={(e) =>
                        updateProduct(
                          inv.serialNumber,
                          idx,
                          "taxAmount",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  {/* Price with Tax */}
                  <td className="px-6 py-2">
                    <input
                      className={`${inputClass(p.priceWithTax)} w-28`}
                      value={p.priceWithTax ?? ""}
                      placeholder={p.priceWithTax == null ? "❗missing" : ""}
                      onChange={(e) =>
                        updateProduct(
                          inv.serialNumber,
                          idx,
                          "priceWithTax",
                          e.target.value
                        )
                      }
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTab;
