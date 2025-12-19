import { groq } from "next-sanity";

// Get all projects
export const projectsQuery = groq`
  *[_type == "project" && !(_id in path("drafts.**"))] | order(period.end desc) {
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
  *[_type == "project" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
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
  *[_type == "service" && !(_id in path("drafts.**"))] | order(order asc) {
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
  *[_type == "service" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
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
  *[_type == "news" && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...10] {
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
  *[_type == "news" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
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
  *[_type == "siteSettings" && !(_id in path("drafts.**"))][0] {
    companyName,
    logo,
    contact,
    socialLinks,
    stats
  }
`;

// Get all vessels
export const vesselsQuery = groq`
  *[_type == "vessel" && !(_id in path("drafts.**"))] | order(order asc, name asc) {
    _id,
    name,
    nameEn,
    slug,
    heroSubtitle,
    heroSubtitleEn,
    heroImage,
    featured
  }
`;

// Get vessel by slug
export const vesselBySlugQuery = groq`
  *[_type == "vessel" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    name,
    nameEn,
    slug,
    heroSubtitle,
    heroSubtitleEn,
    heroImage,
    summary[] {
      label,
      value,
      valueEn
    },
    mainDimensions[] {
      label,
      value,
      valueEn
    },
    capacity[] {
      label,
      value,
      valueEn
    },
    performance[] {
      label,
      value,
      valueEn
    },
    conditions[] {
      label,
      value,
      valueEn
    },
    accommodation[] {
      label,
      value,
      valueEn
    },
    equipmentGroups[] {
      category,
      items[] {
        text,
        textEn
      }
    },
    deckMachinery[] {
      label,
      value,
      valueEn
    },
    certifications,
    featured,
    order
  }
`;

// Get vessel slugs
export const vesselSlugsQuery = groq`
  *[_type == "vessel" && defined(slug.current) && !(_id in path("drafts.**"))]{
    "slug": slug.current
  }
`;

// Get projects by category
export const projectsByCategoryQuery = groq`
  *[_type == "project" && category == $category && !(_id in path("drafts.**"))] | order(period.end desc) {
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
  *[_type == "project" && featured == true && !(_id in path("drafts.**"))] | order(period.end desc) [0...5] {
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
  *[_type == "news" && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    publishedAt,
    category,
    featuredImage
  }
`;
