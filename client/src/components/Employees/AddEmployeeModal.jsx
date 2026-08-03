import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function AddEmployeeModal({
    setOpenModal,
    getEmployees,
    onSuccess,
    selectedEmployee,
}) {

    const [loading, setLoading] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);

    const [selectedAadhaar, setSelectedAadhaar] = useState(null);

    const [aadhaarName, setAadhaarName] = useState("");

    const [preview, setPreview] = useState("");

    const [employeeData, setEmployeeData] = useState({

        employeeId: "",

        fullName: "",

        mobileNumber: "",

        email: "",

        department: "",

        designation: "",

        role: "Engineer",

        joiningDate: "",

        dateOfBirth: "",

        emergencyContactMobile: "",

        status: "Active",

        address: "",

        remarks: "",

        profilePhoto: "",

        aadhaarDocument: "",

    });

    useEffect(() => {

        if (selectedEmployee) {

            setEmployeeData({

                employeeId: selectedEmployee.employeeId || "",

                fullName: selectedEmployee.fullName || "",

                mobileNumber: selectedEmployee.mobileNumber || "",

                email: selectedEmployee.email || "",

                department: selectedEmployee.department || "",

                designation: selectedEmployee.designation || "",

                role: selectedEmployee.role || "Engineer",

                joiningDate: selectedEmployee.joiningDate
                    ? selectedEmployee.joiningDate.substring(0, 10)
                    : "",


                dateOfBirth: selectedEmployee.dateOfBirth
                    ? selectedEmployee.dateOfBirth.substring(0, 10)
                    : "",

                emergencyContactMobile:
                    selectedEmployee.emergencyContactMobile || "",

                status: selectedEmployee.status || "Active",

                address: selectedEmployee.address || "",

                remarks: selectedEmployee.remarks || "",

                profilePhoto: selectedEmployee.profilePhoto || "",

                aadhaarDocument: selectedEmployee.aadhaarDocument || "",


            });

        }

    }, [selectedEmployee]);

    const handleChange = (e) => {

        let { name, value } = e.target;

        if (name === "employeeId") {

            value = value.toUpperCase().replace(/\s/g, "");

        }

        if (
            name === "mobileNumber" ||
            name === "emergencyContactMobile"
        ) {

            value = value.replace(/\D/g, "").slice(0, 10);

        }
        if (
            name === "fullName" ||
            name === "department" ||
            name === "designation" ||
            name === "role"
        ) {

            value = value
                .trim()
                .replace(/\s+/g, " ")
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase());

        }

        setEmployeeData({

            ...employeeData,

            [name]: value,

        });

    };





    const handlePhotoChange = (e) => {

        const file = e.target.files[0];

        if (file.size > 50 * 1024) {

            toast.error("Profile photo must be less than 50 KB.");

            e.target.value = "";

            return;

        }


        if (!file) return;

        setSelectedFile(file);

        setPreview(URL.createObjectURL(file));

    };



    const handleAadhaarChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        if (file.size > 50 * 1024) {

            toast.error("Aadhaar must be less than 50 KB.");

            e.target.value = "";

            return;

        }

        setSelectedAadhaar(file);

        setAadhaarName(file.name);

    };



    const handleSubmit = async () => {

        if (

            !employeeData.fullName.trim() ||

            !employeeData.mobileNumber.trim() ||

            !employeeData.email.trim() ||

            !employeeData.department.trim() ||

            !employeeData.designation.trim() ||

            !employeeData.joiningDate ||

            !employeeData.dateOfBirth

        ) {

            toast.error("Please fill all required fields.");

            return;

        }

        if (!/\S+@\S+\.\S+/.test(employeeData.email)) {

            toast.error("Enter a valid email address.");

            return;

        }

        if (!selectedAadhaar && !employeeData.aadhaarDocument) {

            toast.error("Aadhaar Card is required.");

            return;

        }

        if (
            employeeData.emergencyContactMobile &&
            employeeData.emergencyContactMobile.length !== 10
        ) {

            toast.error("Emergency Contact must be 10 digits.");

            return;

        }



        // ================= Upload Profile Photo =================

        let profilePhoto = employeeData.profilePhoto;

        if (selectedFile) {

            const formData = new FormData();

            formData.append("profilePhoto", selectedFile);

            const uploadResponse = await fetch(

                `${import.meta.env.VITE_API_URL}/employees/upload-photo`,

                {

                    method: "POST",

                    body: formData,

                }

            );

            const uploadData = await uploadResponse.json();

            if (!uploadResponse.ok) {

                toast.error(uploadData.message || "Photo upload failed.");

                setLoading(false);

                return;

            }

            profilePhoto = uploadData.imageUrl;

        }






        // ================= Upload Aadhaar =================

        let aadhaarDocument = employeeData.aadhaarDocument || "";

        if (selectedAadhaar) {

            const formData = new FormData();

            formData.append("aadhaarDocument", selectedAadhaar);

            const uploadResponse = await fetch(

                `${import.meta.env.VITE_API_URL}/employees/upload-aadhaar`,

                {
                    method: "POST",
                    body: formData,
                }

            );

            const uploadData = await uploadResponse.json();

            if (!uploadResponse.ok) {

                toast.error(uploadData.message || "Aadhaar upload failed.");

                setLoading(false);

                return;

            }

            aadhaarDocument = uploadData.documentUrl;

        }






        const payload = {

            ...employeeData,

            fullName: employeeData.fullName.trim(),

            mobileNumber: employeeData.mobileNumber.trim(),

            email: employeeData.email.trim(),

            department: employeeData.department.trim(),

            designation: employeeData.designation.trim(),

            role: employeeData.role.trim(),

            dateOfBirth: employeeData.dateOfBirth,

            emergencyContactMobile:
                employeeData.emergencyContactMobile.trim(),

            address: employeeData.address.trim(),

            remarks: employeeData.remarks.trim(),

            profilePhoto,

            aadhaarDocument,

        };

        try {

            setLoading(true);

            const url = selectedEmployee

                ? `${import.meta.env.VITE_API_URL}/employees/${selectedEmployee._id}`

                : `${import.meta.env.VITE_API_URL}/employees`;

            const method = selectedEmployee ? "PUT" : "POST";

            const response = await fetch(url, {

                method,

                headers: {

                    "Content-Type": "application/json",

                },

                body: JSON.stringify(payload),

            });

            const data = await response.json();

            if (!response.ok) {

                toast.error(data.message || "Something went wrong.");

                setLoading(false);

                return;

            }

            toast.success(

                selectedEmployee

                    ? "Employee updated successfully."

                    : "Employee added successfully."

            );

            if (getEmployees) {
                await getEmployees();
            }

            if (onSuccess) {
                await onSuccess();
            }

            setOpenModal(false);

        }

        catch (error) {

            console.log(error);

            toast.error("Something went wrong.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">

            <div className="max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-slate-200 p-8">

                    <div>

                        <h2 className="text-3xl font-bold text-slate-800">

                            {selectedEmployee ? "Edit Employee" : "Add Employee"}

                        </h2>

                        <p className="mt-2 text-slate-500">

                            Fill employee information below.

                        </p>

                    </div>

                    <button

                        onClick={() => setOpenModal(false)}

                        className="rounded-xl bg-red-100 px-4 py-2 font-bold text-red-600 hover:bg-red-600 hover:text-white"

                    >

                        ✕

                    </button>

                </div>





                <div className="border-b border-slate-200 p-8">

                    <div className="flex flex-col items-center">

                        <div className="relative">

                            <img
                                src={
                                    preview
                                        ? preview
                                        : selectedEmployee?.profilePhoto
                                            ? `${import.meta.env.VITE_API_URL.replace("/api", "")}${selectedEmployee.profilePhoto}`
                                            : "https://ui-avatars.com/api/?name=Employee&background=10B981&color=fff&size=250"
                                }
                                alt="Profile"
                                className="h-40 w-40 rounded-full border-4 border-emerald-500 object-cover shadow-xl"
                            />

                            <label
                                htmlFor="profilePhoto"
                                className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-emerald-500 p-3 text-white shadow-lg hover:bg-emerald-600 transition"
                            >
                                📷
                            </label>

                        </div>

                        <input
                            id="profilePhoto"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                        />

                        <h3 className="mt-5 text-xl font-bold text-slate-800">
                            Profile Photo
                        </h3>

                        <p className="mt-2 text-slate-500">
                            JPG, PNG or WEBP • Max 50 KB
                        </p>





                        <div className="mt-6 border-t border-slate-200 pt-6">

                            <h3 className="text-base font-bold text-slate-700">
                                Aadhaar Card
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                                PDF, JPG, JPEG or PNG • Max 50 KB
                            </p>

                            <div className="mt-4 flex items-center gap-4">

                                <label className="cursor-pointer rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white hover:bg-emerald-600">

                                    Choose Aadhaar

                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={handleAadhaarChange}
                                        className="hidden"
                                    />

                                </label>

                                <span className="text-sm text-slate-600 break-all">
                                    {aadhaarName || "No file selected"}
                                </span>

                            </div>

                        </div>












                    </div>




                </div>











                {/* Form */}

                <div className="grid gap-6 p-8 md:grid-cols-2">





                    <div>

                        <label className="mb-2 block font-semibold">
                            Date of Birth *
                        </label>

                        <input
                            type="date"
                            name="dateOfBirth"
                            value={employeeData.dateOfBirth}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-slate-300 px-5 py-4"
                        />

                    </div>


                    <div>

                        <label className="mb-2 block font-semibold">

                            Full Name *

                        </label>

                        <input

                            type="text"

                            name="fullName"

                            value={employeeData.fullName}

                            onChange={handleChange}

                            className="w-full rounded-2xl border border-slate-300 px-5 py-4"

                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">

                            Mobile Number *

                        </label>

                        <input

                            type="text"

                            name="mobileNumber"

                            value={employeeData.mobileNumber}

                            onChange={handleChange}

                            className="w-full rounded-2xl border border-slate-300 px-5 py-4"

                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">

                            Email *

                        </label>

                        <input

                            type="email"

                            name="email"

                            value={employeeData.email}

                            onChange={handleChange}

                            className="w-full rounded-2xl border border-slate-300 px-5 py-4"

                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">

                            Department *

                        </label>

                        <input

                            type="text"

                            name="department"

                            value={employeeData.department}

                            onChange={handleChange}

                            className="w-full rounded-2xl border border-slate-300 px-5 py-4"

                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">

                            Designation *

                        </label>

                        <input

                            type="text"

                            name="designation"

                            value={employeeData.designation}

                            onChange={handleChange}

                            className="w-full rounded-2xl border border-slate-300 px-5 py-4"

                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">

                            Role *

                        </label>
                        <input
                            type="text"
                            name="role"
                            value={employeeData.role}
                            onChange={handleChange}
                            placeholder="Enter Role"
                            className="w-full rounded-2xl border border-slate-300 px-5 py-4"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">

                            Joining Date *

                        </label>

                        <input

                            type="date"

                            name="joiningDate"

                            value={employeeData.joiningDate}

                            onChange={handleChange}

                            className="w-full rounded-2xl border border-slate-300 px-5 py-4"

                        />

                    </div>


                    <div>

                        <label className="mb-2 block font-semibold">

                            Status *

                        </label>

                        <select

                            name="status"

                            value={employeeData.status}

                            onChange={handleChange}

                            className="w-full rounded-2xl border border-slate-300 px-5 py-4"

                        >

                            <option value="Active">Active</option>

                            <option value="Inactive">Inactive</option>

                        </select>

                    </div>




                    <div>

                        <label className="mb-2 block font-semibold">
                            Emergency Contact Mobile
                        </label>

                        <input
                            type="text"
                            name="emergencyContactMobile"
                            value={employeeData.emergencyContactMobile}
                            onChange={handleChange}
                            placeholder="Optional"
                            className="w-full rounded-2xl border border-slate-300 px-5 py-4"
                        />

                    </div>



                    <div className="md:col-span-2">

                        <label className="mb-2 block font-semibold">

                            Address

                        </label>

                        <textarea

                            name="address"

                            value={employeeData.address}

                            onChange={handleChange}

                            rows={3}

                            className="w-full rounded-2xl border border-slate-300 px-5 py-4 resize-none"

                        />

                    </div>

                    <div className="md:col-span-2">

                        <label className="mb-2 block font-semibold">

                            Remarks

                        </label>

                        <textarea

                            name="remarks"

                            value={employeeData.remarks}

                            onChange={handleChange}

                            rows={5}

                            maxLength={1000}

                            className="w-full rounded-2xl border border-slate-300 px-5 py-4 resize-none"

                        />

                        <div className="mt-2 text-right text-sm text-slate-500">

                            {employeeData.remarks.length}/1000

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-4 border-t border-slate-200 p-8">

                    <button

                        onClick={() => setOpenModal(false)}

                        className="rounded-2xl border border-slate-300 px-8 py-4 font-semibold hover:bg-slate-100"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={handleSubmit}

                        disabled={loading}

                        className="rounded-2xl bg-emerald-500 px-8 py-4 font-bold text-white hover:bg-emerald-600 disabled:opacity-50"

                    >

                        {loading
                            ? "Saving..."
                            : selectedEmployee
                                ? "Update Employee"
                                : "Add Employee"}

                    </button>

                </div>

            </div>

        </div>

    );
}

export default AddEmployeeModal;