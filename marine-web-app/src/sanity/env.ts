// Sanity environment variables with safe fallbacks for development
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

// Check if Sanity is properly configured
export const isSanityConfigured = !!projectId && projectId !== "your_project_id";
