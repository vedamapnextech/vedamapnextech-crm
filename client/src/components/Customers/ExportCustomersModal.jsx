import { useMemo, useState } from "react";
import exportCustomersExcel from "../../utils/exportCustomersExcel";



function ExportCustomersModal({
    open,
    onClose,
    customers,
}) {

    const [selected, setSelected] = useState([]);
    const [search, setSearch] = useState("");

    const filteredCustomers = useMemo(() => {

        return customers.filter((customer) =>

            customer.wbCode.toLowerCase().includes(search.toLowerCase()) ||

            customer.name.toLowerCase().includes(search.toLowerCase()) ||

            customer.company.toLowerCase().includes(search.toLowerCase())

        );

    }, [customers, search]);

    if (!open) return null;

    const handleSelectAll = (checked) => {

        if (checked) {

            setSelected(filteredCustomers.map(c => c._id));
        } else {

            setSelected([]);

        }

    };

    const handleCheck = (id) => {

        if (selected.includes(id)) {

            setSelected(selected.filter(item => item !== id));

        } else {

            setSelected([...selected, id]);

        }

    };

    const download = () => {

        const data = customers.filter(c =>
            selected.includes(c._id)
        );

        exportCustomersExcel(data);

        onClose();

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-[500px] rounded-3xl bg-white p-6">

                <h2 className="text-2xl font-bold mb-6">
                    Export Customers
                </h2>
                <p className="mb-5 text-sm text-slate-500">
                    Selected Customers : <b>{selected.length}</b>
                </p>


                <input
                    type="text"
                    placeholder="Search WB Code, Customer..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mb-5 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                />

                <label className="flex items-center gap-3 font-semibold">

                    <input
                        type="checkbox"
                        checked={
                            selected.length === filteredCustomers.length &&
                            filteredCustomers.length > 0
                        }
                        onChange={(e) =>
                            handleSelectAll(e.target.checked)
                        }
                    />

                    Select All

                </label>

                <div className="mt-5 max-h-64 overflow-y-auto space-y-3">

                    {filteredCustomers.map(customer => (

                        <label
                            key={customer._id}
                            className="flex items-center gap-3"
                        >

                            <input
                                type="checkbox"
                                checked={selected.includes(customer._id)}
                                onChange={() =>
                                    handleCheck(customer._id)
                                }
                            />

                            <span>

                                {customer.wbCode} - {customer.name}

                            </span>

                        </label>

                    ))}

                </div>

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="rounded-xl bg-slate-200 px-5 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={selected.length === 0}
                        onClick={download}
                        className="rounded-xl bg-emerald-500 px-5 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Download Excel
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ExportCustomersModal;