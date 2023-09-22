import { NextResponse } from 'next/server'


type ResponseData = {
  id: string,
  name: string
  token: string
  imageUrl?: string
}
 
function handler(
  req: Request,
  res: NextResponse<ResponseData>
) {
  const user = {
    id: "15",
    name: "Ome Cingaro",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6Ik9tZSBDaW5nYXJvIiwiaWF0IjoxNTE2MjM5MDIyfQ.WKPApn32dgHLSjaktH--nQMFHTsYiqpnu_dkLzvFNbg"
  }
  return NextResponse.json(user)
}

export { handler as GET, handler as POST }