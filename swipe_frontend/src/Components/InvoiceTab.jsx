import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setInvoices } from "../features/invoicesSlice";

const InvoiceTab = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices.invoices || []);
  const [tableData, setTableData] = useState([]);

  // Load invoices locally for editing
  useEffect(() => {
    setTableData(invoices);
  }, [invoices]);

  // Auto-save (debounced)
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setInvoices(tableData));
    }, 400);

    return () => clearTimeout(timeout);
  }, [tableData]);

  // Update invoice-level field
  const updatefield = (serial, field, value) => {
    const updated = tableData.map((inv) =>
      inv.serialNumber === serial ? { ...inv, [field]: value } : inv
    );
    setTableData(updated);
  };

  // Update product-level field
  const updateProduct = (serial, index, field, value) => {
    const updated = tableData.map((inv) => {
      if (inv.serialNumber !== serial) return inv;

      const updatedProducts = inv.products.map((p, i) =>
        i === index ? { ...p, [field]: value } : p
      );

      return { ...inv, products: updatedProducts };
    });

    setTableData(updated);
  };

  // Border color utility
  const inputClass = (val) =>
    `bg-black border px-2 py-1 rounded  ${
      val == null ? "border-red-500" : "border-green-500"
    }`;

  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-6">Invoices</h2>

      <div className="overflow-x-auto w-full">
        <table className="min-w-max w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-600 bg-gray-800">
              <th className="px-2 py-2 text-left">Serial</th>
              <th className="px-6 py-2 text-left">Customer</th>
              <th className="px-6 py-2 text-left">GSTIN</th>

              <th className="px-6 py-2 text-left">Product</th>
              <th className="px-6 py-2 text-left">Qty</th>
              <th className="px-6 py-2 text-left">Tax %</th>
              <th className="px-6 py-2 text-left">Tax Amt</th>
              <th className="px-6 py-2 text-left">Price w/Tax</th>

              <th className="px-6 py-2 text-left">Amt Before Tax</th>
              <th className="px-6 py-2 text-left">Total Tax</th>
              <th className="px-6 py-2 text-left">Total</th>
              <th className="px-6 py-2 text-left">Pending</th>
              <th className="px-6 py-2 text-left">Pay Mode</th>
              <th className="px-6 py-2 text-left">Status</th>
              <th className="px-6 py-2 text-left">Created By</th>
              <th className="px-6 py-2 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((inv) =>
              inv.products.map((p, index) => (
                <tr
                  key={`${inv.serialNumber}-${index}`}
                  className="border-b border-gray-700"
                >
                  {/* SERIAL NUMBER */}
                  <td className="px-6 py-2">
                    {index === 0 ? inv.serialNumber : ""}
                  </td>

                  {/* CUSTOMER NAME */}
                  <td className="px-6 py-2">
                    {index === 0 && (
                      <input
                        className={inputClass(inv.customerName)}
                        value={inv.customerName ?? ""}
                        placeholder={inv.customerName == null ? "Missing" : ""}
                        onChange={(e) =>
                          updatefield(
                            inv.serialNumber,
                            "customerName",
                            e.target.value
                          )
                        }
                      />
                    )}
                  </td>

                  {/* GSTIN */}
                  <td className="px-6 py-2">
                    {index === 0 && (
                      <input
                        className={inputClass(inv.gstin)}
                        value={inv.gstin ?? ""}
                        placeholder={inv.gstin == null ? "Missing" : ""}
                        onChange={(e) =>
                          updatefield(inv.serialNumber, "gstin", e.target.value)
                        }
                      />
                    )}
                  </td>

                  {/* PRODUCT NAME */}
                  <td className="px-6 py-2">
                    <input
                      className={inputClass(p.name)}
                      value={p.name ?? ""}
                      placeholder={p.name == null ? "Missing" : ""}
                      onChange={(e) =>
                        updateProduct(
                          inv.serialNumber,
                          index,
                          "name",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  {/* QTY */}
                  <td className="px-6 py-2">
                    <input
                      className={`${inputClass(p.quantity)} w-20`}
                      value={p.quantity ?? ""}
                      placeholder={p.quantity == null ? "Missing" : ""}
                      onChange={(e) =>
                        updateProduct(
                          inv.serialNumber,
                          index,
                          "quantity",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  {/* TAX % */}
                  <td className="px-6 py-2">
                    <input
                      className={`${inputClass(p.taxRate)} w-20`}
                      value={p.taxRate ?? ""}
                      placeholder={p.taxRate == null ? "Missing" : ""}
                      onChange={(e) =>
                        updateProduct(
                          inv.serialNumber,
                          index,
                          "taxRate",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  {/* TAX AMOUNT */}
                  <td className="px-6 py-2">
                    <input
                      className={`${inputClass(p.taxAmount)} w-20`}
                      value={p.taxAmount ?? ""}
                      placeholder={p.taxAmount == null ? "Missing" : ""}
                      onChange={(e) =>
                        updateProduct(
                          inv.serialNumber,
                          index,
                          "taxAmount",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  {/* PRICE WITH TAX */}
                  <td className="px-6 py-2">
                    <input
                      className={`${inputClass(p.priceWithTax)} w-24`}
                      value={p.priceWithTax ?? ""}
                      placeholder={p.priceWithTax == null ? "Missing" : ""}
                      onChange={(e) =>
                        updateProduct(
                          inv.serialNumber,
                          index,
                          "priceWithTax",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  {/* AMOUNT BEFORE TAX */}
                  <td className="px-6 py-2">
                    {index === 0 && (
                      <input
                        className={`${inputClass(inv.amountBeforeTax)} w-20`}
                        value={inv.amountBeforeTax ?? ""}
                        placeholder={
                          inv.amountBeforeTax == null ? "Missing" : ""
                        }
                        onChange={(e) =>
                          updatefield(
                            inv.serialNumber,
                            "amountBeforeTax",
                            e.target.value
                          )
                        }
                      />
                    )}
                  </td>

                  {/* TOTAL TAX */}
                  <td className="px-6 py-2">
                    {index === 0 && (
                      <input
                        className={`${inputClass(inv.taxamount)} w-20`}
                        value={inv.taxamount ?? ""}
                        placeholder={inv.taxamount == null ? "Missing" : ""}
                        onChange={(e) =>
                          updatefield(
                            inv.serialNumber,
                            "taxamount",
                            e.target.value
                          )
                        }
                      />
                    )}
                  </td>

                  {/* TOTAL AMOUNT */}
                  <td className="px-6 py-2">
                    {index === 0 && (
                      <input
                        className={`${inputClass(inv.totalAmount)} w-20`}
                        value={inv.totalAmount ?? ""}
                        placeholder={inv.totalAmount == null ? "Missing" : ""}
                        onChange={(e) =>
                          updatefield(
                            inv.serialNumber,
                            "totalAmount",
                            e.target.value
                          )
                        }
                      />
                    )}
                  </td>

                  {/* PENDING */}
                  <td className="px-6 py-2">
                    {index === 0 && (
                      <input
                        className={`${inputClass(inv.amountPending)} w-20`}
                        value={inv.amountPending ?? ""}
                        placeholder={inv.amountPending == null ? "Missing" : ""}
                        onChange={(e) =>
                          updatefield(
                            inv.serialNumber,
                            "amountPending",
                            e.target.value
                          )
                        }
                      />
                    )}
                  </td>

                  {/* PAYMENT METHOD */}
                  <td className="px-6 py-2">
                    {index === 0 && (
                      <input
                        className={`${inputClass(inv.paymentMethod)} w-24`}
                        value={inv.paymentMethod ?? ""}
                        placeholder={inv.paymentMethod == null ? "Missing" : ""}
                        onChange={(e) =>
                          updatefield(
                            inv.serialNumber,
                            "paymentMethod",
                            e.target.value
                          )
                        }
                      />
                    )}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-2">
                    {index === 0 && (
                      <input
                        className={`${inputClass(inv.status)} w-25`}
                        value={inv.status ?? ""}
                        placeholder={inv.status == null ? "Missing" : ""}
                        onChange={(e) =>
                          updatefield(
                            inv.serialNumber,
                            "status",
                            e.target.value
                          )
                        }
                      />
                    )}
                  </td>

                  {/* CREATED BY */}
                  <td className="px-6 py-2">
                    {index === 0 && (
                      <input
                        className={`${inputClass(inv.createdBy)} w-25`}
                        value={inv.createdBy ?? ""}
                        placeholder={inv.createdBy == null ? "Missing" : ""}
                        onChange={(e) =>
                          updatefield(
                            inv.serialNumber,
                            "createdBy",
                            e.target.value
                          )
                        }
                      />
                    )}
                  </td>

                  {/* DATE */}
                  <td className="px-2 py-2">
                    {index === 0 && (
                      <input
                        type="date"
                        className={`${inputClass(inv.createdBy)} w-35`}
                        value={inv.invoiceDate ?? ""}
                        onChange={(e) =>
                          updatefield(
                            inv.serialNumber,
                            "invoiceDate",
                            e.target.value
                          )
                        }
                      />
                    )}
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

export default InvoiceTab;
