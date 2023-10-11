import { DollarSign, FileImage, ShoppingBasket, VenetianMaskIcon } from "lucide-react"
import { ChangeEvent, useMemo, useState } from "react"

interface Category {
  value: string
  name: string
}

export default function ProductInput() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [categories, setCategories] = useState<Category[]>([
    { value: '', name: 'All' },
    { value: 'Highlights', name: 'Highlights' },
    { value: 'Clothes', name: 'Clothes' }
  ])
  const [chosenCategory, setChosenCategory] = useState<string>('')

  function handleChooseCategory(element: any) {
    setChosenCategory(element.target.value)
  }

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

      <div className="w-full flex-1 p-4 border-t flex flex-col items-center md:h-full md:border-l md:border-t-0">
        <h1 className="text-zinc-600 font-bold text-2xl">Product details</h1>

        <div className="group flex flex-col gap-2 self-stretch py-4 my-4 border-b">
          <label htmlFor="name" className="font-semibold group-focus-within:text-violet-700">Product name</label>
          <div className='flex'>
            <span className="
              rounded-md
              flex-1
              bg-transparent
              border-slate-400/30
              border
              px-5
              py-3
              flex
              gap-3
              focus-within:bg-zinc-100"
            >
              <ShoppingBasket className="text-zinc-400 h-5 group-focus-within:text-violet-700" />
              <input
                name="name"
                id="name"
                className="flex-1 text-sm bg-transparent text-zinc-800 placeholder-zinc-400 focus:outline-none"
                type="text"
                placeholder='Insert name'
              />
            </span>
          </div>
        </div>

        <div className="group flex flex-col gap-2 self-stretch pb-4 mb-4 border-b">
          <label htmlFor="price" className="font-semibold group-focus-within:text-violet-700">Price</label>
          <div className='flex'>
            <span className="
              rounded-md
              flex-1
              bg-transparent
              border-slate-400/30
              border
              px-5
              py-3
              flex
              gap-3
              focus-within:bg-zinc-100"
            >
              <DollarSign className="text-zinc-400 h-5 group-focus-within:text-violet-700" />
              <input
                name="price"
                id="price"
                className="flex-1 text-sm bg-transparent text-zinc-800 placeholder-zinc-400 focus:outline-none"
                type="text"
                placeholder='Insert name'
              />
            </span>
          </div>
        </div>

        <div className="group flex flex-col gap-2 self-stretch pb-4 mb-4 border-b">
          <label htmlFor="description" className="font-semibold group-focus-within:text-violet-700">Description</label>
          <div className='flex'>
            <span className="
              rounded-md
              flex-1
              bg-transparent
              border-slate-400/30
              border
              px-5
              py-3
              flex
              gap-3
              h-48
              focus-within:bg-zinc-100"
            >
              <textarea
                name="description"
                id="description"
                className="flex-1 text-sm bg-transparent h-48 text-zinc-800 placeholder-zinc-400 focus:outline-none"
              >Describe your product here.</textarea>
            </span>
          </div>
        </div>

        <div className="group flex flex-col gap-2 self-stretch">
          <label htmlFor="category" className="font-semibold group-focus-within:text-violet-700">Category</label>
          <select id="countries" value={chosenCategory} onChange={handleChooseCategory} className="self-stretch bg-violet-700 text-zinc-50 text-sm rounded-md p-3">
            {categories.map(category => (
              <option value={category.value} key={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
      </div>
    </form>
  )
}