import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true, // Set to false for ISR or tag-based revalidation
});

// Client with token for authenticated requests
export const previewClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_READ_TOKEN,
});

// Helper to get the appropriate client
export const getClient = (preview = false) =>
    preview ? previewClient : client;
