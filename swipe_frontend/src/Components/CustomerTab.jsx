import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setInvoices } from "../features/invoicesSlice";
import InitialLoader from "./Loader.jsx";
const CustomersTab = () => {
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

  // update invoice-level fields (customer related)
  const updatefield = (serial, field, value) => {
    const updated = tableData.map((inv) =>
      inv.serialNumber === serial ? { ...inv, [field]: value } : inv
    );
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
      <h2 className="text-2xl font-semibold mb-6">Customers</h2>

      <div className="overflow-x-auto w-full">
        <table className="min-w-max w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-600 bg-gray-800">
              <th className="px-6 py-2 text-left">Serial</th>
              <th className="px-6 py-2 text-left">Customer Name</th>
              <th className="px-6 py-2 text-left">Phone</th>
              <th className="px-6 py-2 text-left">Company</th>
              <th className="px-6 py-2 text-left">GSTIN</th>
              <th className="px-6 py-2 text-left">Total Amount</th>
              <th className="px-6 py-2 text-left">Pending</th>
              <th className="px-6 py-2 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((inv) => (
              <tr key={inv.serialNumber} className="border-b border-gray-700">
                <td className="px-6 py-2">{inv.serialNumber}</td>

                <td className="px-6 py-2">
                  <input
                    className={inputClass(inv.customerName)}
                    value={inv.customerName ?? ""}
                    placeholder={inv.customerName == null ? "❗missing" : ""}
                    onChange={(e) =>
                      updatefield(
                        inv.serialNumber,
                        "customerName",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td className="px-6 py-2">
                  <input
                    className={inputClass(inv.customerPhone, "w-36")}
                    value={inv.customerPhone ?? ""}
                    placeholder={inv.customerPhone == null ? "❗missing" : ""}
                    onChange={(e) =>
                      updatefield(
                        inv.serialNumber,
                        "customerPhone",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td className="px-6 py-2">
                  <input
                    className={inputClass(inv.customerCompanyName)}
                    value={inv.customerCompanyName ?? ""}
                    placeholder={
                      inv.customerCompanyName == null ? "❗missing" : ""
                    }
                    onChange={(e) =>
                      updatefield(
                        inv.serialNumber,
                        "customerCompanyName",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td className="px-6 py-2">
                  <input
                    className={inputClass(inv.gstin)}
                    value={inv.gstin ?? ""}
                    placeholder={inv.gstin == null ? "❗missing" : ""}
                    onChange={(e) =>
                      updatefield(inv.serialNumber, "gstin", e.target.value)
                    }
                  />
                </td>

                <td className="px-6 py-2">
                  <input
                    className={`${inputClass(inv.totalAmount)} w-28`}
                    value={inv.totalAmount ?? ""}
                    placeholder={inv.totalAmount == null ? "❗missing" : ""}
                    onChange={(e) =>
                      updatefield(
                        inv.serialNumber,
                        "totalAmount",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td className="px-6 py-2">
                  <input
                    className={`${inputClass(inv.amountPending)} w-28`}
                    value={inv.amountPending ?? ""}
                    placeholder={inv.amountPending == null ? "❗missing" : ""}
                    onChange={(e) =>
                      updatefield(
                        inv.serialNumber,
                        "amountPending",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td className="px-6 py-2">
                  <input
                    className={inputClass(inv.status)}
                    value={inv.status ?? ""}
                    placeholder={inv.status == null ? "❗missing" : ""}
                    onChange={(e) =>
                      updatefield(inv.serialNumber, "status", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersTab;
