import { groq } from "next-sanity";

// Get all projects
export const projectsQuery = groq`
  *[_type == "project"] | order(period.end desc) {
    _id,
    title,
    slug,
    category,
    client,
    location,
    period,
    excerpt,
    featuredImage,
    "equipmentCount": count(equipment)
  }
`;

// Get single project by slug
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    client,
    location,
    period,
    description,
    featuredImage,
    gallery,
    equipment[]-> {
      _id,
      name,
      image
    }
  }
`;

// Get all services
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    icon,
    featuredImage
  }
`;

// Get single service by slug
export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    icon,
    features,
    featuredImage
  }
`;

// Get all news articles
export const newsQuery = groq`
  *[_type == "news"] | order(publishedAt desc) [0...10] {
    _id,
    title,
    slug,
    publishedAt,
    category,
    excerpt,
    featuredImage
  }
`;

// Get single news by slug
export const newsBySlugQuery = groq`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    category,
    excerpt,
    body,
    featuredImage
  }
`;

// Get site settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    companyName,
    logo,
    contact,
    socialLinks,
    stats
  }
`;

// Get projects by category
export const projectsByCategoryQuery = groq`
  *[_type == "project" && category == $category] | order(period.end desc) {
    _id,
    title,
    slug,
    category,
    client,
    location,
    period,
    excerpt,
    featuredImage
  }
`;

// Get featured projects (limit 5)
export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(period.end desc) [0...5] {
    _id,
    title,
    slug,
    category,
    location,
    featuredImage
  }
`;

// Get latest news (limit 3)
export const latestNewsQuery = groq`
  *[_type == "news"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    publishedAt,
    category,
    featuredImage
  }
`;
