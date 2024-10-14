import { defineCollection, z } from "astro:content";
import { notionLoader } from "notion-astro-loader";
import {
  notionPageSchema,
  propertySchema,
  transformedPropertySchema,
} from "notion-astro-loader/schemas";

const database = defineCollection({
  loader: notionLoader({
    auth: import.meta.env.NOTION_TOKEN,
    database_id: import.meta.env.NOTION_DATABASE_ID,
    // Use Notion sorting and filtering
    filter: {
      or: [
        { property: "Status", status: { equals: "In Progress" } },
        { property: "Status", status: { equals: "Priority" } },
      ],
    },
  }),
  schema: notionPageSchema({
    properties: z.object({
      Name: transformedPropertySchema.title,
      Created: propertySchema.created_time.optional(),
      Status: transformedPropertySchema.status,
      "Due Date Proximity": transformedPropertySchema.formula,
      Note: transformedPropertySchema.rich_text.optional(),
    }),
  }),
});

export const collections = { database };
