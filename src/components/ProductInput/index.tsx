import { FileImage } from "lucide-react"
import { ChangeEvent, useMemo, useState } from "react"

export default function ProductInput() {
  const [imageFile, setImageFile] = useState<File | null>(null)

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget
    if (!files) {
      return
    }
    const selectedFile = files[0]
    setImageFile(selectedFile)
  }


  const previewURL = useMemo(() => {
    if (!imageFile) {
      return null
    }

    return URL.createObjectURL(imageFile)
  }, [imageFile])


  return (
    <form className="flex flex-col md:flex-row items-center gap-4 flex-1" action="">
      <div className="self-stretch md:w-2/5">
        <label
          htmlFor="product-image"
          className="relative border flex rounded-md cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5 w-full aspect-square">
          {previewURL ? (
            <img
              src={previewURL}
              className="" />
          ) : (
            <>
              <FileImage className="w-4 h-4" />
              Choose an image
            </>
          )}
        </label>
        <input type="file" id="product-image" accept="image/png, image/jpeg" className="sr-only" onChange={handleFileSelected} />
      </div>

      <div className="w-full flex-1 p-4 border-t md:h-full md:border-l md:border-t-0">
        <input type="text" name="" id="" placeholder="TESTE" />
      </div>
    </form>
  )
}