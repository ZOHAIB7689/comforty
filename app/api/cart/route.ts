import { NextRequest, NextResponse } from "next/server";
import { db , cartTable } from "@/lib/drizzle"
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";

export const GET = async (request:NextRequest) => {
  try {
    const res = await db.select().from(cartTable)
    return NextResponse.json({message:"Database connected succesfully" , res})

  } catch (error) {
    console.error("something went wrong",error )
    return NextResponse.json({mesage:"something went wrong"}, {status:401})
  }
};

export const POST = async(request: NextRequest) => {

  const req = await request.json()
  const uid = uuid()
  const setCookies = await cookies()
  const userIdCookie = setCookies.get("user_id")
  
  if (!userIdCookie) {
      setCookies.set("user_id", uid)
  }

  try {
    const res = await db.insert(cartTable).values({
        product_id:req.product_id,
        quantity:1,
        user_id: (await cookies()).get("user_id")?.value as string
    }).returning()
   
    return NextResponse.json({
      message: "Database connected succesfully",
      res,
    });
  } catch (error) {
    console.error("something went wrong", error)
    return NextResponse.json({message: "something went wrong"}, {status: 401})
  }
};
