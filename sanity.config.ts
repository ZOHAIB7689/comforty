import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

export default defineConfig({
  name: "default",
  title: "My Sanity Project",

  projectId: process.env.NEXT_SANITY_PROJECT_ID || "", // Required
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",      // Required
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2021-06-13",
  
  plugins: [deskTool()],

  schema: {
    types: [], // Add your schema types here
  },
});
