import { DollarSign, FileImage, ShoppingBasket } from "lucide-react"
import { ChangeEvent, useMemo, useRef, useState } from "react"
import Image from "next/image"

interface Category {
  value: string
  name: string
}

interface ProductInputProps {
  handleProductCreated: () => void
}

export default function ProductInput({ handleProductCreated }: ProductInputProps) {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [categories, setCategories] = useState<Category[]>([
    { value: 'highlights', name: 'Highlights' },
    { value: 'clothes', name: 'Clothes' }
  ])
  const [chosenCategory, setChosenCategory] = useState<string>(categories[0].value)
  const [isSending, setIsSending] = useState<boolean>(false)

  const nameRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)

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

  async function handleSubmit(event: any) {
    event.preventDefault()

    setIsSending(true)

    const name = nameRef.current!.value
    const price = priceRef.current!.value
    const description = descriptionRef.current!.value

    const body = new FormData()

    body.append('name', name)
    body.append('price', price)
    body.append('description', description)
    body.append('category', chosenCategory)

    if (imageFile) {
      body.append('image', imageFile)
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products`, {
      method: "POST",
      body: body
    })

    if (response.ok) {
      const result = await response.json()
    }

    setIsSending(false)
    handleProductCreated()
  }

  // needs it to use Blob URL preview in next/image
  const customImgLoader = ({ src }: { src: string }) => {
    return `${src}`
  }

  return (
    <form className="flex flex-col md:flex-row items-center gap-4 flex-1 overflow-y-scroll" onSubmit={handleSubmit}>
      <div className="self-stretch md:w-2/5">
        <label
          htmlFor="product-image"
          className="relative border flex rounded-md cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5 w-full aspect-square">
          {previewURL ? (
            <Image
              loader={customImgLoader}
              src={previewURL}
              className=""
              alt="Product preview"
              fill={true}
            />
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
                required={true}
                ref={nameRef}
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
                required={true}
                step=".01"
                min={0.01}
                ref={priceRef}
                name="price"
                id="price"
                className="flex-1 text-sm bg-transparent text-zinc-800 placeholder-zinc-400 focus:outline-none"
                type="number"
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
              h-24
              focus-within:bg-zinc-100"
            >
              <textarea
                required={true}
                ref={descriptionRef}
                name="description"
                id="description"
                className="flex-1 text-sm bg-transparent h-48 text-zinc-800 placeholder-zinc-400 focus:outline-none"
              ></textarea>
            </span>
          </div>
        </div>

        <div className="group flex flex-col gap-2 self-stretch">
          <label htmlFor="category" className="font-semibold group-focus-within:text-violet-700">Category</label>
          <select id="countries" value={chosenCategory} onChange={handleChooseCategory} className="self-stretch border text-sm rounded-md p-3">
            {categories.map(category => (
              <option value={category.value} key={category.name}>{category.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-cyan-600 text-zinc-50 rounded-md p-2.5 mt-6 self-stretch flex justify-center items-center gap-3">
          {
            isSending ?
              <>
                <div aria-label="Loading..." role="status">
                  <svg className="animate-spin w-6 h-6 fill-zinc-50" viewBox="3 3 18 18">
                    <path className="opacity-20" d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z">
                    </path>
                    <path d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z">
                    </path>
                  </svg>
                </div>
                <span>Loading...</span>
              </>
              :
              'Register'
          }
        </button>
      </div>
    </form>
  )
}