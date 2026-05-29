// import React from 'react'

// const school_add_image = () => {
//   return (
//     <div className="h-133 border border-zinc-300 rounded-2xl overflow-hidden w-full">
//       <div className="bg-white rounded-2xl h-full overflow-y-scroll w-[100%] p-4 ">
//         Add Image
//       </div>
//     </div>
//   )
// }

// export default school_add_image
import React, { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const SchoolAddImage = () => {
  const fileRef = useRef(null);

  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [crop, setCrop] = useState({
    aspect: 1, // 👈 square crop
  });

  // Select Images
  const handleSelect = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...imageUrls]);
  };

  // Upload (dummy)
  const handleUpload = () => {
    console.log("Uploading images:", images);
    alert("Images uploaded!");
  };

  return (
    <div className="h-[500px] border border-zinc-300 rounded-2xl p-4 bg-white">
      
      {/* Top Actions */}
      <div className="flex justify-between mb-4">
        <button
          onClick={() => fileRef.current.click()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add Images
        </button>

        <button
          onClick={handleUpload}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Upload All
        </button>
      </div>

      {/* Hidden Input */}
      <input
        type="file"
        ref={fileRef}
        multiple
        accept="image/*"
        onChange={handleSelect}
        className="hidden"
      />

      <div className="flex gap-4">
        
        {/* Crop Section */}
        <div className="w-1/2">
          {currentImage && (
            <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
              <img src={currentImage} alt="Crop" />
            </ReactCrop>
          )}
        </div>

        {/* Image Grid */}
        <div className="w-1/2 grid grid-cols-3 gap-2 overflow-y-auto max-h-[350px]">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              onClick={() => setCurrentImage(img)}
              className="w-full h-24 object-cover rounded-lg cursor-pointer border hover:border-blue-500"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchoolAddImage;