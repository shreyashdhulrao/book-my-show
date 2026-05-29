import React, { useState, useRef } from "react";
import { createEvent, uploadImage } from "../lib/appwrite";
import { useNavigate } from "react-router-dom";

export default function EventForm() {
  const [formData, setFormData] = useState({
    name: "",
    organizer: "",
    date: "",
    time: "",
    location: "",
    type: "",
    end_date: "",
    capacity: "",
    registration_deadline: "",
    description: "",
    image: null,
  });

  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [cropSrc, setCropSrc] = useState(null);
  const cropperRef = useRef(null);


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageId = "";

      // 2. Upload image using Appwrite storage
      if (formData.image) {
        const file = await uploadImage(formData.image);
        imageId = file.$id;
        console.log("IMAGE OBJECT:", file);
        console.log("IMAGE ID:", file.$id);
      }

      // 3. Save event in database
      await createEvent({
        name: formData.name,
        organizer: formData.organizer,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        type: formData.type,
        end_date: formData.end_date,
        capacity: Number(formData.capacity),
        registration_deadline: formData.registration_deadline,
        description: formData.description,
        status: "Upcoming",
        image_id: imageId,        // storage file ID
        // image_code: imageCode, // your custom generated code
      });

      alert("Event created successfully!");
      setFormData({
        name: "",
        organizer: "",
        date: "",
        time: "",
        location: "",
        type: "",
        end_date: "",
        capacity: "",
        registration_deadline: "",
        description: "",
        image: null,
      })
      setPreview(null)
      navigate("/manage-events");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-133 border border-zinc-300 dark:border-zinc-600 rounded-2xl overflow-hidden w-full">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl h-full overflow-y-scroll w-[100%] p-4 ">
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-start w-full">
          <div className="grid grid-cols-2 gap-3 w-full mb-3 text-sm">
            {/* Event Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200" htmlFor="name" >Event Name</label>
              <input
                type="text"
                name="name"
                placeholder="Event Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-zinc-300 dark:border-zinc-600 dark:text-white border p-3 focus:outline-none rounded-xl"
                required
              />
            </div>

            {/* Organizer */}
            <div className="flex flex-col gap-1">
              <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">Organizer</label>
              <input
                type="text"
                name="organizer"
                placeholder="Organizer"
                value={formData.organizer}
                onChange={handleChange}
                className="w-full border-zinc-300 dark:border-zinc-600 dark:text-white border p-3 focus:outline-none rounded-xl"
                required
              />
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1">
              <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">Event Date</label>
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
              <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">Event Time</label>
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
              <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Event Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border-zinc-300 dark:border-zinc-600 dark:text-white border p-3 focus:outline-none rounded-xl"
                required
              />
            </div>

            {/* End Date */}
            <div className="flex flex-col gap-1">
              <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">End Date</label>
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
              <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">Registration Deadline</label>
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
              <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">Event Type</label>
              <input
                type="text"
                name="type"
                placeholder="Event Type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border-zinc-300 dark:border-zinc-600 dark:text-white border p-3 focus:outline-none rounded-xl"
                required
              />
            </div>

            {/* Capacity */}
            <div className="flex flex-col gap-1">
              <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">Capacity</label>
              <input
                type="number"
                name="capacity"
                placeholder="Person Capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full border-zinc-300 dark:border-zinc-600 dark:text-white border p-3 focus:outline-none rounded-xl"
                required
              />
            </div>

            {/* Description */}
            <div className="col-span-1 md:col-span-2 flex gap-1 flex-col" >
              <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">Description</label>
              <textarea
                name="description"
                placeholder="Event Description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full border-zinc-300 dark:border-zinc-600 dark:text-white border p-3 focus:outline-none rounded-xl"
                rows="4"
              />
            </div>

            {/* Image Upload */}
            <div className="col-span-1 md:col-span-2 flex gap-1 flex-col">
              <label className="text-sm ps-3 text-zinc-600 font-light dark:text-zinc-200">Event Image</label>

              {!preview ? (
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  required
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div >
  );
}