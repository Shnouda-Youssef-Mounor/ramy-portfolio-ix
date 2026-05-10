import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "p2lov31q",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});
