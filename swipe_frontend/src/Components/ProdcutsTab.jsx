import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setInvoices } from "../features/invoicesSlice";
import InitialLoader from "./Loader.jsx";

const ProductsTab = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices.invoices || []);
  const [tableData, setTableData] = useState([]);
  const [check, setCheck] = useState(false);

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

  const computeProduct = (p) => {
    const qty = Number(p.quantity);
    const unitPrice = Number(p.unitPrice);
    const taxRate = Number(p.taxRate);
    const discount = Number(p.discount) || 0;

    if (isNaN(qty) || isNaN(unitPrice) || isNaN(taxRate)) {
      return p;
    }

    const taxableValue = qty * unitPrice - discount;
    const taxAmount = (taxableValue * taxRate) / 100;
    const priceWithTax = taxableValue + taxAmount;

    return {
      ...p,
      taxableValue,
      taxAmount,
      priceWithTax,
    };
  };

  const BASE_FIELDS = ["quantity", "unitPrice", "taxRate", "discount"];

  const updateProduct = (serial, productIndex, field, value) => {
    const updated = tableData.map((inv) => {
      if (inv.serialNumber !== serial) return inv;

      const updatedProducts = inv.products.map((p, i) => {
        if (i !== productIndex) return p;

        const updatedProduct = { ...p, [field]: value };

        if (BASE_FIELDS.includes(field)) {
          return computeProduct(updatedProduct);
        }

        return updatedProduct;
      });

      return { ...inv, products: updatedProducts };
    });

    setTableData(updated);
  };

  useEffect(() => {
    if (!invoices || invoices.length === 0) return;
    const allMissing = invoices.every((inv) => inv.products.length === 0);
    setCheck(allMissing);
  }, [invoices]);

  if (invoices.length === 0 || check) return <InitialLoader />;

  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-6">Products</h2>

      <div className="overflow-x-auto w-full">
        <table className="min-w-max w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-600 bg-gray-800">
              <th className="px-6 py-2">Serial</th>
              <th className="px-6 py-2">Product Name</th>
              <th className="px-6 py-2">Qty</th>
              <th className="px-6 py-2">Unit Price</th>
              <th className="px-6 py-2">Unit</th>
              <th className="px-6 py-2">Discount</th>
              <th className="px-6 py-2">Taxable Value</th>
              <th className="px-6 py-2">Tax %</th>
              <th className="px-6 py-2">Tax Amt</th>
              <th className="px-6 py-2">Price w/Tax</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((inv) =>
              inv.products.map((p, idx) => (
                <tr
                  key={`${inv.serialNumber}-${idx}`}
                  className="border-b border-gray-700"
                >
                  <td className="px-6 py-2">{inv.serialNumber}</td>

                  <td className="px-6 py-2">
                    <input
                      className={inputClass(p.name)}
                      value={p.name ?? ""}
                      onChange={(e) =>
                        updateProduct(inv.serialNumber, idx, "name", e.target.value)
                      }
                    />
                  </td>

                  <td className="px-6 py-2">
                    <input
                      className={`${inputClass(p.quantity)} w-16`}
                      value={p.quantity ?? ""}
                      onChange={(e) =>
                        updateProduct(inv.serialNumber, idx, "quantity", e.target.value)
                      }
                    />
                  </td>

                  <td className="px-6 py-2">
                    <input
                      className={`${inputClass(p.unitPrice)} w-24`}
                      value={p.unitPrice ?? ""}
                      onChange={(e) =>
                        updateProduct(inv.serialNumber, idx, "unitPrice", e.target.value)
                      }
                    />
                  </td>

                  <td className="px-6 py-2">
                    <input
                      className={inputClass(p.unit)}
                      value={p.unit ?? ""}
                      onChange={(e) =>
                        updateProduct(inv.serialNumber, idx, "unit", e.target.value)
                      }
                    />
                  </td>

                  <td className="px-6 py-2">
                    <input
                      className={`${inputClass(p.discount)} w-20`}
                      value={p.discount ?? ""}
                      onChange={(e) =>
                        updateProduct(inv.serialNumber, idx, "discount", e.target.value)
                      }
                    />
                  </td>

                  {/* editable but auto-updated */}
                  <td className="px-6 py-2">
                    <input
                      className={`${inputClass(p.taxableValue)} w-24`}
                      value={p.taxableValue ?? ""}
                      onChange={(e) =>
                        updateProduct(inv.serialNumber, idx, "taxableValue", e.target.value)
                      }
                    />
                  </td>

                  <td className="px-6 py-2">
                    <input
                      className={`${inputClass(p.taxRate)} w-16`}
                      value={p.taxRate ?? ""}
                      onChange={(e) =>
                        updateProduct(inv.serialNumber, idx, "taxRate", e.target.value)
                      }
                    />
                  </td>

                  <td className="px-6 py-2">
                    <input
                      className={`${inputClass(p.taxAmount)} w-24`}
                      value={p.taxAmount ?? ""}
                      onChange={(e) =>
                        updateProduct(inv.serialNumber, idx, "taxAmount", e.target.value)
                      }
                    />
                  </td>

                  <td className="px-6 py-2">
                    <input
                      className={`${inputClass(p.priceWithTax)} w-28`}
                      value={p.priceWithTax ?? ""}
                      onChange={(e) =>
                        updateProduct(inv.serialNumber, idx, "priceWithTax", e.target.value)
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
