import { createClient } from "next-sanity";
export const client = createClient({
    projectId: "fdytho0d",
    dataset: "production",
    apiVersion: "2026-05-15",
    useCdn: false,
});