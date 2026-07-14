import { useEffect } from "react";

function FilePreviewModal({
    open,
    fileUrl,
    title,
    onClose,
}) {

    useEffect(() => {

        const handleKeyDown = (e) => {

            if (e.key === "Escape") {

                onClose();

            }

        };

        if (open) {

            window.addEventListener("keydown", handleKeyDown);

        }

        return () => {

            window.removeEventListener("keydown", handleKeyDown);

        };

    }, [open, onClose]);

    if (!open) return null;

    const isPdf = fileUrl?.toLowerCase().endsWith(".pdf");

    const handleDownload = async () => {

        try {

            const response = await fetch(fileUrl);

            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;

            link.download = fileUrl.split("/").pop();

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-6"
            onClick={onClose}
        >

            <div
                className="relative flex max-h-[90vh] w-full max-w-5xl flex-col rounded-3xl bg-white p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    onClick={onClose}
                    className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-red-500 text-xl font-bold text-white hover:bg-red-600"
                >
                    ✕
                </button>

                <h2 className="mb-6 text-2xl font-bold text-slate-800">
                    {title}
                </h2>

                {isPdf ? (

                    <iframe
                        src={fileUrl}
                        title={title}
                        className="h-[70vh] w-full rounded-2xl border"
                    />

                ) : (

                    <div className="flex flex-1 items-center justify-center overflow-auto rounded-2xl bg-slate-100 p-4">

                        <img
                            src={fileUrl}
                            alt={title}
                            className="max-h-[65vh] max-w-full object-contain"
                        />

                    </div>

                )}

                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">

                    <p className="text-sm text-slate-500">
                        Click Download to save this file.
                    </p>

                    <button
                        onClick={handleDownload}
                        className="rounded-xl bg-emerald-500 px-6 py-3 font-bold text-white transition hover:bg-emerald-600"
                    >
                        ⬇ Download
                    </button>

                </div>

            </div>

        </div>

    );

}

export default FilePreviewModal;