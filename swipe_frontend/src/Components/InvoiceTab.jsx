import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setInvoices } from "../features/invoicesSlice";
import InitialLoader from "./Loader.jsx";

const InvoiceTab = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices.invoices || []);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(invoices);
  }, [invoices]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setInvoices(tableData));
    }, 400);
    return () => clearTimeout(timeout);
  }, [tableData, dispatch]);

  const inputClass = (val) =>
    `bg-black border px-2 py-1 rounded ${
      val == null ? "border-red-500" : "border-green-500"
    }`;

  const updatefield = (serial, field, value) => {
    setTableData((prev) =>
      prev.map((inv) =>
        inv.serialNumber === serial ? { ...inv, [field]: value } : inv
      )
    );
  };

  const computeProduct = (p) => {
    const qty = Number(p.quantity);
    const unitPrice = Number(p.unitPrice);
    const taxRate = Number(p.taxRate);
    const discount = Number(p.discount) || 0;

    if (isNaN(qty) || isNaN(unitPrice) || isNaN(taxRate)) {
      return p;
    }

    const amountBeforeTax = qty * unitPrice - discount;
    const taxAmount = (amountBeforeTax * taxRate) / 100;
    const priceWithTax = amountBeforeTax + taxAmount;

    return {
      ...p,
      taxableValue: amountBeforeTax,
      amountBeforeTax,
      taxAmount,
      priceWithTax,
    };
  };

  const computeInvoice = (inv) => {
    const amountBeforeTax = inv.products.reduce(
      (s, p) => s + (Number(p.amountBeforeTax) || 0),
      0
    );

    const taxamount = inv.products.reduce(
      (s, p) => s + (Number(p.taxAmount) || 0),
      0
    );

    return {
      ...inv,
      amountBeforeTax,
      taxamount,
      totalAmount: amountBeforeTax + taxamount,
    };
  };
  const BASE_FIELDS = ["quantity", "unitPrice", "taxRate", "discount"];

  const updateProduct = (serial, index, field, value) => {
    const updated = tableData.map((inv) => {
      if (inv.serialNumber !== serial) return inv;

      const updatedProducts = inv.products.map((p, i) => {
        if (i !== index) return p;

        const updatedProduct = { ...p, [field]: value };

        if (BASE_FIELDS.includes(field)) {
          return computeProduct(updatedProduct);
        }
        return updatedProduct;
      });

      const updatedInvoice = { ...inv, products: updatedProducts };

      if (BASE_FIELDS.includes(field)) {
        return computeInvoice(updatedInvoice);
      }

      return updatedInvoice;
    });

    setTableData(updated);
  };

  if (invoices.length === 0) return <InitialLoader />;

  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-6">Invoices</h2>

      <div className="overflow-x-auto w-full">
        <table className="min-w-max w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-600 bg-gray-800">
              <th className="px-6 py-2">Serial</th>
              <th className="px-6 py-2">Customer</th>
              <th className="px-6 py-2">GSTIN</th>
              <th className="px-6 py-2">Product</th>
              <th className="px-6 py-2">Qty</th>
              <th className="px-6 py-2">Unit Price</th>
              <th className="px-6 py-2">Discount</th>
              <th className="px-6 py-2">Tax %</th>
              <th className="px-6 py-2">Tax Amt</th>
              <th className="px-6 py-2">Price w/Tax</th>
              <th className="px-6 py-2">Amt Before Tax</th>
              <th className="px-6 py-2">Total Tax</th>
              <th className="px-6 py-2">Total</th>
              <th className="px-6 py-2">Pending</th>
              <th className="px-6 py-2">Pay Mode</th>
              <th className="px-6 py-2">Status</th>
              <th className="px-6 py-2">Created By</th>
              <th className="px-6 py-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((inv) =>
              inv.products.map((p, index) => (
                <tr
                  key={`${inv.serialNumber}-${index}`}
                  className="border-b border-gray-700"
                >
                  <td className="px-6 py-2">
                    {index === 0 && inv.serialNumber}
                  </td>

                  <td className="px-6 py-2">
                    {index === 0 && (
                      <input
                        className={inputClass(inv.customerName)}
                        value={inv.customerName ?? ""}
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

                  <td className="px-6 py-2">
                    {index === 0 && (
                      <input
                        className={inputClass(inv.gstin)}
                        value={inv.gstin ?? ""}
                        onChange={(e) =>
                          updatefield(inv.serialNumber, "gstin", e.target.value)
                        }
                      />
                    )}
                  </td>

                  <td className="px-6 py-2">
                    <input
                      className={inputClass(p.name)}
                      value={p.name ?? ""}
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

                  <td className="px-6 py-2">
                    <input
                      className={inputClass(p.quantity)}
                      value={p.quantity ?? ""}
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

                  <td className="px-6 py-2">
                    <input
                      className={inputClass(p.unitPrice)}
                      value={p.unitPrice ?? ""}
                      onChange={(e) =>
                        updateProduct(
                          inv.serialNumber,
                          index,
                          "unitPrice",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td className="px-6 py-2">
                    <input
                      className={inputClass(p.discount)}
                      value={p.discount ?? ""}
                      onChange={(e) =>
                        updateProduct(
                          inv.serialNumber,
                          index,
                          "discount",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td className="px-6 py-2">
                    <input
                      className={inputClass(p.taxRate)}
                      value={p.taxRate ?? ""}
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

                  <td className="px-6 py-2">
                    <input
                      className={inputClass(p.taxAmount)}
                      value={p.taxAmount ?? ""}
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

                  <td className="px-6 py-2">
                    <input
                      className={inputClass(p.priceWithTax)}
                      value={p.priceWithTax ?? ""}
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

                  <td className="px-6 py-2">
                    {index === 0 && (
                      <input
                        className={inputClass(inv.amountBeforeTax)}
                        value={inv.amountBeforeTax ?? ""}
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

                  <td className="px-6 py-2">
                    {index === 0 && (
                      <input
                        className={inputClass(inv.taxamount)}
                        value={inv.taxamount ?? ""}
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

                  <td className="px-6 py-2">
                    {index === 0 && (
                      <input
                        className={inputClass(inv.totalAmount)}
                        value={inv.totalAmount ?? ""}
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

                  <td className="px-6 py-2">
                    {index === 0 && (
                      <input
                        className={inputClass(inv.amountPending)}
                        value={inv.amountPending ?? ""}
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

                  <td className="px-6 py-2">
                    {index === 0 && (
                      <input
                        className={inputClass(inv.paymentMethod)}
                        value={inv.paymentMethod ?? ""}
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

                  <td className="px-6 py-2">
                    {index === 0 && (
                      <input
                        className={inputClass(inv.status)}
                        value={inv.status ?? ""}
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

                  <td className="px-6 py-2">
                    {index === 0 && (
                      <input
                        className={inputClass(inv.createdBy)}
                        value={inv.createdBy ?? ""}
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

                  <td className="px-6 py-2">
                    {index === 0 && (
                      <div className="bg-black px-2 py-1 rounded">
                        {inv.invoiceDate}
                      </div>
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
