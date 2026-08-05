import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ChangeEmailModal from "./ChangeEmailModal";
import {
    HiOutlineUser,
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineShieldCheck,
    HiOutlineCalendar,
    HiOutlineClock,
    HiOutlinePencilAlt,
    HiOutlineKey,
    HiOutlineCamera,
} from "react-icons/hi";

function Profile() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);

    const [editData, setEditData] = useState({
        name: "",
        phone: "",
        email: "",
    });
    const [showEmailModal, setShowEmailModal] = useState(false);

    const [emailData, setEmailData] = useState({
        newEmail: "",
        password: "",
        otp: "",
    });
    const [saving, setSaving] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [previewImage, setPreviewImage] = useState("");

    const fetchProfile = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setUser(data.user);

            setEditData({
                name: data.user.name,
                phone: data.user.phone,
                email: data.user.email,
            });

            setPreviewImage(
                data.user.profileImage
                    ? `${import.meta.env.VITE_API_URL.replace("/api", "")}${data.user.profileImage}`
                    : ""
            );
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };



    const saveProfile = async () => {

        try {
            setSaving(true);
            const formData = new FormData();

            formData.append("name", editData.name);
            formData.append("phone", editData.phone);

            if (selectedImage) {
                formData.append("profileImage", selectedImage);
            }

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/profile`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: formData,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            toast.success(data.message);

            localStorage.setItem("user", JSON.stringify(data.user));
            window.dispatchEvent(new Event("storage"));
            setUser(data.user);

            setShowEditModal(false);

            setSelectedImage(null);

            fetchProfile();

        } catch (error) {


            toast.error(error.message);

        }
        finally {
            setSaving(false);
        }
    };

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        if (file.size > 50 * 1024) {
            return toast.error("Image size must be less than 50 KB");
        }

        setSelectedImage(file);

        setPreviewImage(URL.createObjectURL(file));

    };

    useEffect(() => {
        fetchProfile();
    }, []);
    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="text-xl font-semibold text-slate-600">
                    Loading Profile...
                </div>
            </div>
        );
    }





    return (
        <div className="p-8">

            <div className="max-w-6xl mx-auto">

                {/* Header */}

             <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

    {/* Left Side */}
    <div className="flex items-center gap-6">

        <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl">

            {user?.profileImage ? (
                <img
                    src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${user.profileImage}`}
                    alt="Profile"
                    className="h-full w-full object-cover"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-cyan-600">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
            )}

        </div>

        <div>
            <h1 className="text-4xl font-bold text-slate-800">
                {user?.name}
            </h1>

            <p className="mt-2 text-lg text-slate-500">
                {user?.email}
            </p>
        </div>

    </div>

    {/* Right Side Buttons */}
    <div className="flex items-center gap-3">

        <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-white font-semibold shadow-md transition hover:bg-cyan-700"
        >
            <HiOutlinePencilAlt size={18} />
            Edit
        </button>

        <button
            onClick={() => navigate("/change-password")}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold shadow-md transition hover:bg-black"
        >
            <HiOutlineKey size={18} />
            Password
        </button>

        <button
            onClick={() => setShowEmailModal(true)}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-white font-semibold shadow-md transition hover:bg-emerald-700"
        >
            <HiOutlineMail size={18} />
            Email
        </button>

    </div>

</div>

                {/* Details */}

                <div className="grid lg:grid-cols-2 gap-6 mt-8">

                    <div className="bg-white rounded-2xl shadow-md p-6">

                        <h2 className="text-xl font-bold mb-6">

                            Personal Information

                        </h2>

                        <div className="space-y-5">

                            <div className="flex items-center gap-4">

                                <HiOutlineUser size={24} className="text-cyan-600" />

                                <div>

                                    <p className="text-slate-500 text-sm">Full Name</p>

                                    <h3 className="font-semibold">{user?.name}</h3>

                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                <HiOutlineMail size={24} className="text-cyan-600" />

                                <div>

                                    <p className="text-slate-500 text-sm">Email</p>

                                    <h3 className="font-semibold">{user?.email}</h3>

                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                <HiOutlinePhone size={24} className="text-cyan-600" />

                                <div>

                                    <p className="text-slate-500 text-sm">Phone</p>

                                    <h3 className="font-semibold">

                                        {user?.phone || "Not Added"}

                                    </h3>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-6">

                        <h2 className="text-xl font-bold mb-6">

                            Account Information

                        </h2>

                        <div className="space-y-5">

                            <div className="flex items-center gap-4">

                                <HiOutlineShieldCheck size={24} className="text-green-600" />

                                <div>

                                    <p className="text-slate-500 text-sm">Role</p>

                                    <h3 className="font-semibold">

                                        {user?.role}

                                    </h3>

                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                <HiOutlineShieldCheck size={24} className="text-blue-600" />

                                <div>

                                    <p className="text-slate-500 text-sm">Status</p>

                                    <h3 className="font-semibold">

                                        {user?.status}

                                    </h3>

                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                <HiOutlineCalendar size={24} className="text-orange-500" />

                                <div>

                                    <p className="text-slate-500 text-sm">Joining Date</p>

                                    <h3 className="font-semibold">

                                        {new Date(user?.joiningDate).toLocaleDateString()}

                                    </h3>

                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                <HiOutlineClock size={24} className="text-purple-600" />

                                <div>

                                    <p className="text-slate-500 text-sm">Last Login</p>

                                    <h3 className="font-semibold">

                                        {user?.lastLogin
                                            ? new Date(user.lastLogin).toLocaleString()
                                            : "Never"}

                                    </h3>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {showEditModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b px-6 py-4">

                            <h2 className="text-2xl font-bold text-slate-800">
                                Edit Profile
                            </h2>

                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-3xl text-slate-500 hover:text-red-600"
                            >
                                ×
                            </button>

                        </div>

                        <div className="p-8 space-y-6">

                            {/* Profile Photo */}

                            <div className="flex flex-col items-center">

                                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-cyan-500 bg-slate-100">

                                    {previewImage ? (

                                        <img
                                            src={previewImage}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />

                                    ) : (

                                        <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-cyan-600">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </div>

                                    )}

                                </div>

                                <label className="mt-4 flex items-center gap-2 cursor-pointer bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-lg">

                                    <HiOutlineCamera size={20} />

                                    Change Photo

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />

                                </label>
                                <p className="text-xs text-slate-500 mt-2">
                                    JPG, PNG • Max 50 KB
                                </p>

                            </div>

                            {/* Name */}

                            <div>

                                <label className="block mb-2 font-semibold">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded-lg px-4 py-3 outline-none focus:border-cyan-500"
                                />

                            </div>

                            {/* Email */}

                            <div>

                                <label className="block mb-2 font-semibold">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={editData.email}
                                    readOnly
                                    className="w-full border rounded-lg px-4 py-3 bg-slate-100 cursor-not-allowed"
                                />

                            </div>

                            {/* Phone */}

                            <div>

                                <label className="block mb-2 font-semibold">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    value={editData.phone}
                                    maxLength={10}
                                    onChange={(e) => {

                                        const value = e.target.value.replace(/\D/g, "");

                                        setEditData({
                                            ...editData,
                                            phone: value,
                                        });

                                    }}
                                    className="w-full border rounded-lg px-4 py-3 outline-none focus:border-cyan-500"
                                    placeholder="Enter Phone Number"
                                />

                            </div>

                        </div>
                        <div className="flex justify-end gap-3 border-t px-6 py-4">

                            <button
                                type="button"
                                onClick={() => {
                                    setShowEditModal(false);
                                    setSelectedImage(null);

                                    setEditData({
                                        name: user.name,
                                        phone: user.phone,
                                        email: user.email,
                                    });

                                    setPreviewImage(
                                        user.profileImage
                                            ? `${import.meta.env.VITE_API_URL}${user.profileImage}`
                                            : ""
                                    );
                                }}
                                className="px-5 py-2 rounded-lg bg-slate-200 hover:bg-slate-300"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={saveProfile}
                                className="px-6 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>

                        </div>

                    </div>

                </div>
            )}

            <ChangeEmailModal
                open={showEmailModal}
                onClose={() => setShowEmailModal(false)}
                user={user}
                token={localStorage.getItem("token")}
                fetchProfile={fetchProfile}
            />

        </div>




    );
}

export default Profile;