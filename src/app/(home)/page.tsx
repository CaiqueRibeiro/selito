import ProductSection from "@/components/ProductSection";



export default async function Home() {


  return (
    <main className="flex-1 flex flex-col items-center justify-start gap-8 mt-8">
      <ProductSection section="Highlights" />
    </main>
  )
}