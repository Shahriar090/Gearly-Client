import { useDropzone } from "react-dropzone"


// this component only responsible for file uploading

type Props = {
  image: File | null
  setImage: (file: File | null) => void
  preview: string | null
  setPreview: (preview: string | null) => void
}

const CategoryImageUpload = ({
  image,
  setImage,
  preview,
  setPreview,
}: Props) => {

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      setImage(file)
      setPreview(URL.createObjectURL(file))
    },
  })

  return (
    <div className="border p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-3">Category Image</h3>

      <div
        {...getRootProps()}
        className="border-dashed border-2 p-6 h-52 flex items-center justify-center cursor-pointer"
      >
        <input {...getInputProps()} />

        {preview ? (
          <img
            src={preview}
            className="h-40 object-cover"
          />
        ) : (
          <p>Drop image or click to upload</p>
        )}
      </div>
    </div>
  )
}

export default CategoryImageUpload