import { randomUUID } from "crypto"
import { NextRequest } from "next/server"
import { prisma } from "../../../../db/prisma"

interface ListCategoriesRequest extends NextRequest { }

async function getCategories(request: ListCategoriesRequest) {
  let response

  // get categories from prisma
  const categories = await prisma.category.findMany()

  return new Response(JSON.stringify({ categories }))
}

interface CreateCategoryRequest extends NextRequest { }

async function createCategory(request: CreateCategoryRequest) {
  const { name, description } = await request.json()

  const product = await prisma.category.create({
    data: {
      id: randomUUID(),
      name,
      description
    }
  })

  return new Response(JSON.stringify({ product }))
}

export { getCategories as GET, createCategory as POST }