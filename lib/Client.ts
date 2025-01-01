import { createClient } from "next-sanity";



export const client = createClient({
  apiVersion: process.env.NEXT_PUBLIC_SANITY_VERSION,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  token:process.env.SANITY_ACCESS_TOKEN,
  useCdn:true
});