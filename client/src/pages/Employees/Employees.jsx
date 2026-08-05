// ==================== TODO ====================
// Improve Mobile Responsiveness
// =============================================
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";

import SkeletonCard from "../../components/Common/SkeletonCard";

import exportEmployeesExcel from "../../utils/exportEmployeesExcel"
import EmployeeStats from "../../components/Employees/EmployeeStats";
import EmployeeTable from "../../components/Employees/EmployeeTable";
import AddEmployeeModal from "../../components/Employees/AddEmployeeModal";
import DeleteConfirmationModal from "../../components/Common/DeleteConfirmationModal";

function Employees() {

  const [employees, setEmployees] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [searchParams] = useSearchParams();

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [search, setSearch] = useState("");

  const [departmentFilter, setDepartmentFilter] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [selectedStat, setSelectedStat] = useState("");

  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // ================= Employees =================

  const getEmployees = () => {

    setLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/api/employees`)
      .then((res) => res.json())
      .then((data) => {

        setEmployees(data);

      })
      .finally(() => {

        setLoading(false);

      });

  };

  useEffect(() => {

    getEmployees();

  }, []);

  // ================= Delete =================

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/employees/${selectedEmployee._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to delete employee");
        return;
      }

      toast.success("Employee deleted successfully");

      getEmployees();

      setOpenDeleteModal(false);

      setSelectedEmployee(null);

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  // ================= Stats =================

  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(

    (e) => e.status === "Active"

  ).length;

  const inactiveEmployees = employees.filter(

    (e) => e.status === "Inactive"

  ).length;

  const engineers = employees.filter((e) =>
    e.designation?.toLowerCase().includes("engineer")
  ).length;

  // ================= Filters =================

  const filteredEmployees = employees.filter((employee) => {

    const searchText = search.toLowerCase();

    const matchSearch =

      employee.fullName?.toLowerCase().includes(searchText) ||

      employee.employeeId?.toLowerCase().includes(searchText) ||

      employee.mobileNumber?.toLowerCase().includes(searchText) ||

      employee.email?.toLowerCase().includes(searchText) ||

      employee.department?.toLowerCase().includes(searchText) ||

      employee.designation?.toLowerCase().includes(searchText) ||

      employee.role?.toLowerCase().includes(searchText);

    const matchDepartment =

      departmentFilter === "" ||

      employee.department === departmentFilter;

    const matchStatus =

      statusFilter === "" ||

      employee.status === statusFilter;

    const matchRole =
      roleFilter === "" ||
      employee.designation?.toLowerCase().includes(roleFilter.toLowerCase());
    return (
      matchSearch &&
      matchDepartment &&
      matchStatus &&
      matchRole
    );

  });

  useEffect(() => {
    const status = searchParams.get("status");

    if (status === "Active") {
      setStatusFilter(status);
    } else {
      setStatusFilter("");
    }
  }, [searchParams]);

  return (

    <div className="min-h-screen bg-slate-50 p-8">

      {/* Header */}

      <div className="mb-10 flex items-center justify-between">

        <div>

          <p className="text-sm font-bold uppercase tracking-[5px] text-emerald-600">

            Employee Management

          </p>

          <h1 className="mt-2 text-5xl font-extrabold text-slate-800">

            Employees

          </h1>

          <p className="mt-3 text-lg text-slate-500">

            Manage all company employees and engineers.

          </p>

        </div>

        <button

          onClick={() => {

            setSelectedEmployee(null);

            setOpenModal(true);

          }}

          className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-4 font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"

        >

          + Add Employee

        </button>

      </div>

      {/* Stats */}

      {loading ? (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />

        </div>

      ) : (

        <EmployeeStats
          totalEmployees={totalEmployees}
          activeEmployees={activeEmployees}
          inactiveEmployees={inactiveEmployees}
          engineers={engineers}
          selectedStat={selectedStat}
          setSelectedStat={setSelectedStat}
          setStatusFilter={setStatusFilter}
          setRoleFilter={setRoleFilter}
        />

      )}

      {/* Search */}

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 items-center">
          <input

            type="text"

            placeholder="🔍 Search Employee..."

            value={search}

            onChange={(e) => setSearch(e.target.value)}

            className="rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:border-emerald-500"

          />

          <Select
            options={[
              {
                value: "",
                label: "All Departments",
              },
              ...Array.from(
                new Set(employees.map((e) => e.department))
              ).map((department) => ({
                value: department,
                label: department,
              })),
            ]}
            value={[
              {
                value: "",
                label: "All Departments",
              },
              ...Array.from(
                new Set(employees.map((e) => e.department))
              ).map((department) => ({
                value: department,
                label: department,
              })),
            ].find((option) => option.value === departmentFilter)}
            onChange={(selectedOption) =>
              setDepartmentFilter(selectedOption?.value || "")
            }
            placeholder="All Departments"
            isSearchable
            styles={{
              control: (base, state) => ({
                ...base,
                minHeight: "56px",
                height: "56px",
                borderRadius: "16px",
                borderColor: state.isFocused ? "#10b981" : "#cbd5e1",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "#10b981",
                },
              }),

              valueContainer: (base) => ({
                ...base,
                height: "56px",
                padding: "0 18px",
              }),

              indicatorsContainer: (base) => ({
                ...base,
                height: "56px",
              }),

              input: (base) => ({
                ...base,
                margin: 0,
                padding: 0,
              }),

              placeholder: (base) => ({
                ...base,
                color: "#0f172a",
                fontSize: "18px",
              }),

              singleValue: (base) => ({
                ...base,
                color: "#0f172a",
                fontSize: "18px",
              }),

              menu: (base) => ({
                ...base,
                zIndex: 9999,
                borderRadius: "16px",
              }),
            }}
          />



          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-14 w-full rounded-2xl border border-slate-300 px-5 text-lg outline-none transition focus:border-emerald-500"          >
            <option value="">All Roles</option>

            {Array.from(
              new Set(
                employees
                  .map((employee) => employee.role?.trim())
                  .filter(Boolean)
              )
            )
              .sort()
              .map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
          </select>


          <select

            value={statusFilter}

            onChange={(e) =>

              setStatusFilter(e.target.value)

            }

            className="h-14 w-full rounded-2xl border border-slate-300 px-5 text-lg outline-none transition focus:border-emerald-500"
          >

            <option value="">All Status</option>

            <option value="Active">Active</option>

            <option value="Inactive">Inactive</option>

          </select>

        </div>

      </div>

      {/* Record Counter */}

      <div className="mt-6 flex items-center justify-between">

        <h2 className="text-lg font-bold text-slate-700">
          Showing {filteredEmployees.length} of {employees.length} Employees
        </h2>

        <div className="flex items-center gap-3">

          {(search || departmentFilter || roleFilter || statusFilter) && (

            <button
              onClick={() => {

                setSearch("");

                setRoleFilter("");

                setDepartmentFilter("");

                setStatusFilter("");

                setSelectedStat("");

              }}
              className="rounded-xl bg-slate-200 px-5 py-2 font-semibold transition hover:bg-slate-300"
            >
              Clear Filters
            </button>

          )}

          <button
            onClick={() => exportEmployeesExcel(filteredEmployees)}
            className="rounded-xl bg-emerald-500 px-5 py-2 font-semibold text-white transition hover:bg-emerald-600"
          >
            📊 Export Excel
          </button>

        </div>

      </div>

      {/* Table */}

      <EmployeeTable

        employees={filteredEmployees}

        setOpenModal={setOpenModal}

        setSelectedEmployee={setSelectedEmployee}

        setOpenDeleteModal={setOpenDeleteModal}

      />

      {/* Modal */}

      {openModal && (

        <AddEmployeeModal

          setOpenModal={setOpenModal}

          getEmployees={getEmployees}

          selectedEmployee={selectedEmployee}

        />

      )}

      {/* Delete */}

      <DeleteConfirmationModal

        open={openDeleteModal}

        title="Delete Employee?"

        message={`Are you sure you want to delete "${selectedEmployee?.fullName}"?`}

        onClose={() => {

          setOpenDeleteModal(false);

          setSelectedEmployee(null);

        }}

        onDelete={handleDelete}

      />

    </div>

  );

}

export default Employees;