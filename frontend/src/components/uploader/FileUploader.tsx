import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";

export default function ImageUploader({ onClose }: { onClose: () => void }) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: File) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);
  return (
    <div className="fixed z-50 top-0 left-0 w-full h-screen flex justify-center items-center bg-black/10 backdrop-blur-sm">
      <div className="w-[40%] lg:w-[50%] md:w-[60%] sm:w-[80%] xs:w-[95%] py-10 px-6 rounded-xl bg-black border-green-500/20 border">
        <h1 className="mb-4 font-display text-center">
          Update Your Profile Image
        </h1>
        <div
          {...getRootProps()}
          className="text-center font-display py-14 md:py-12 sm:py-10 px-4 rounded-md bg-green-200/5 shadow-lg shadow-black/10"
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop file, or click to select file</p>
        </div>
        <div className="flex flex-wrap justify-center mt-4 gap-4">
          {files.map((file: any) => (
            <div
              key={file.name}
              className="w-14 h-14 rounded-lg overflow-hidden"
            >
              <img
                src={file.preview}
                alt={file.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="mt-4 text-center flex gap-3">
          <button
            onClick={onClose}
            className="font-display text-white bg-[#DC3545] w-full py-1.5 rounded-full"
          >
            Cancel
          </button>
          <button className="font-display text-white bg-green-600 w-full py-1.5 rounded-full">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
