import React, { useState, useEffect } from "react";
import { getEventById, formatDate, getImageUrl, deleteImage, updateEvent, uploadImage } from "../lib/appwrite";
import { useParams, useNavigate } from "react-router-dom";

export const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";

    return new Date(dateStr).toISOString().split("T")[0];
};

export default function EditEvent() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        organizer: "",
        date: "",
        time: "",
        location: "",
        end_date: "",
        registration_deadline: "",
        type: "",
        capacity: "",
        description: "",
        image: null,
        status: "",
    });
    const [preview, setPreview] = useState(null);

    // FETCH DATA FROM APPWRITE
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await getEventById(id);

                const formatted = {
                    ...res,
                    date: formatDateForInput(res.date),
                    end_date: formatDateForInput(res.end_date),
                    registration_deadline: formatDateForInput(res.registration_deadline),
                };

                setFormData(formatted);

                // 🔥 IMPORTANT: set preview AFTER data loads
                if (res.image_id) {
                    setPreview(getImageUrl(res.image_id));
                } else {
                    setPreview(null);
                }

            } catch (error) {
                console.log(error);
            }
        };

        fetchEvents();
    }, [id]);

    // Handle Change
    const handleChange = (e) => {

        const { name, value, files } = e.target;

        if (name === "image" && files && files[0]) {

            const file = files[0];

            setFormData({
                ...formData,
                image: file,
            });

            setPreview(URL.createObjectURL(file));

        } else {

            setFormData({
                ...formData,
                [name]: value,
            });

        }
    };

    useEffect(() => {
        return () => {
            if (preview && preview.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    // Remove Image
    const removeImage = async (e) => {
        e.preventDefault();

        const conf = window.confirm("Are you sure you want to delete this image?");

        if (!conf) return;

        try {
            // 👇 only delete if image exists in DB (edit mode case)
            if (formData.image_id) {
                await deleteImage(formData.image_id);
            }

            setFormData((prev) => ({
                ...prev,
                image: null,
                image_id: null,
            }));

            setPreview(null);
        } catch (error) {
            console.log(error);
        }
    };

    // Submit Updated Data
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imageId = formData.image_id;

            // ✅ If user selected new image
            if (formData.image instanceof File) {

                // Delete old image from Appwrite storage
                if (formData.image_id) {
                    await deleteImage(formData.image_id);
                }

                // Upload new image
                const uploadedFile = await uploadImage(formData.image);

                // Save new file id
                imageId = uploadedFile.$id;
            }

            // ✅ Update event in Appwrite DB
            await updateEvent(id, {
                name: formData.name,
                organizer: formData.organizer,
                date: formData.date,
                time: formData.time,
                location: formData.location,
                type: formData.type,
                end_date: formData.end_date,
                registration_deadline: formData.registration_deadline,
                capacity: Number(formData.capacity),
                description: formData.description,
                status: formData.status,
                image_id: imageId,
            });

            alert("Event Updated Successfully!");

            navigate("/manage-events");

        } catch (error) {
            console.log(error);
            alert("Failed to update event");
        }
    };



    return (

        <div className="h-133 border border-zinc-300 dark:border-zinc-600 rounded-2xl overflow-hidden w-full">

            <div className="bg-white dark:bg-zinc-900 rounded-2xl h-full overflow-y-scroll w-full p-4">

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center justify-start w-full"
                >

                    <div className="grid grid-cols-2 gap-3 w-full mb-3 text-sm">

                        {/* Event Name */}
                        <div className="flex flex-col gap-1">

                            <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">
                                Event Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border-zinc-300 dark:border-zinc-600 dark:text-white border p-3 focus:outline-none rounded-xl"
                                required
                            />
                        </div>



                        {/* Organizer */}
                        <div className="flex flex-col gap-1">

                            <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">
                                Organizer
                            </label>

                            <input
                                type="text"
                                name="organizer"
                                value={formData.organizer}
                                onChange={handleChange}
                                className="w-full border-zinc-300 dark:border-zinc-600 dark:text-white border p-3 focus:outline-none rounded-xl"
                                required
                            />
                        </div>



                        {/* Date */}
                        <div className="flex flex-col gap-1">

                            <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">
                                Event Date
                            </label>

                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full border-zinc-300 dark:border-zinc-600 dark:text-white border p-3 focus:outline-none rounded-xl"
                                required
                            />
                        </div>



                        {/* Time */}
                        <div className="flex flex-col gap-1">

                            <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">
                                Event Time
                            </label>

                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="w-full border-zinc-300 dark:border-zinc-600 dark:text-white border p-3 focus:outline-none rounded-xl"
                                required
                            />
                        </div>



                        {/* Location */}
                        <div className="flex flex-col gap-1">

                            <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full border-zinc-300 dark:border-zinc-600 dark:text-white border p-3 focus:outline-none rounded-xl"
                                required
                            />
                        </div>



                        {/* End Date */}
                        <div className="flex flex-col gap-1">

                            <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">
                                End Date
                            </label>

                            <input
                                type="date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleChange}
                                className="w-full border-zinc-300 dark:border-zinc-600 dark:text-white border p-3 focus:outline-none rounded-xl"
                                required
                            />
                        </div>



                        {/* Registration Deadline */}
                        <div className="flex flex-col gap-1">

                            <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">
                                Registration Deadline
                            </label>

                            <input
                                type="date"
                                name="registration_deadline"
                                value={formData.registration_deadline}
                                onChange={handleChange}
                                className="w-full border-zinc-300 dark:border-zinc-600 dark:text-white border p-3 focus:outline-none rounded-xl"
                                required
                            />
                        </div>



                        {/* Type */}
                        <div className="flex flex-col gap-1">

                            <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">
                                Event Type
                            </label>

                            <input
                                type="text"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full border-zinc-300 dark:border-zinc-600 dark:text-white border p-3 focus:outline-none rounded-xl"
                                required
                            />
                        </div>



                        {/* Capacity */}
                        <div className="flex flex-col gap-1">

                            <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">
                                Capacity
                            </label>

                            <input
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                className="w-full border-zinc-300 dark:border-zinc-600 dark:text-white border p-3 focus:outline-none rounded-xl"
                                required
                            />
                        </div>

                        {/* Status */}
                        <div className="flex flex-col gap-1">

                            <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">
                                Status
                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border-zinc-300 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white border p-3 focus:outline-none rounded-xl"
                                required
                            >

                                <option value="Upcoming">Upcoming</option>

                                <option value="Live">Live</option>

                                <option value="Completed">Completed</option>

                                <option value="Postponed">Postponed</option>

                                <option value="Cancelled">Cancelled</option>

                            </select>

                        </div>

                        {/* Description */}
                        <div className="col-span-2 flex flex-col gap-1">

                            <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full border-zinc-300 dark:border-zinc-600 dark:text-white border p-3 focus:outline-none rounded-xl"
                            />
                        </div>



                        {/* Image */}
                        <div className="col-span-2 flex flex-col gap-1">

                            <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">
                                Event Image
                            </label>

                            {!preview ? (

                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full h-14 border border-zinc-300 dark:border-zinc-600 dark:text-white px-3 py-2 rounded-xl focus:outline-none"
                                />

                            ) : (

                                <div className="relative w-32 h-32 mt-2">

                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-full h-full object-cover rounded-2xl border border-zinc-300"
                                    />

                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-1 right-1 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                                    >
                                        ✕
                                    </button>

                                </div>
                            )}
                        </div>

                    </div>



                    {/* Submit Button */}
                    <div className="w-full flex justify-center">

                        <button
                            type="submit"
                            className="w-fit px-5 text-sm bg-zinc-200 dark:bg-zinc-800 dark:text-white border border-zinc-300 dark:border-zinc-600 cursor-pointer hover:bg-blue-500 text-zinc-5 m00  hover:text-white py-3 rounded-lg transition transition-color"
                        >
                            Update Event
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}