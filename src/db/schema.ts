import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// ENUMS
// ---------------------------------------------------------------------------

export const userRoleEnum = pgEnum("user_role", [
  "super_admin",
  "administrator",
  "editor",
  "marketing",
  "viewer",
]);

export const leadStatusEnum = pgEnum("lead_status", [
  "baru",
  "dihubungi",
  "survey_dijadwalkan",
  "penawaran_dikirim",
  "negosiasi",
  "deal",
  "tidak_jadi",
]);

export const publishStatusEnum = pgEnum("publish_status", [
  "draft",
  "published",
  "archived",
]);

// ---------------------------------------------------------------------------
// USERS
// ---------------------------------------------------------------------------

export const users = pgTable("users", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: userRoleEnum("role").notNull().default("administrator"),
  avatar: text("avatar"),
  status: text("status").notNull().default("active"),
  lastLogin: timestamp("last_login", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// SETTINGS (single row)
// ---------------------------------------------------------------------------

export const settings = pgTable("settings", {
  id: integer("id").primaryKey().default(1),
  companyName: text("company_name").notNull().default(""),
  companyEmail: text("company_email").notNull().default(""),
  phone: text("phone").notNull().default(""),
  whatsapp: text("whatsapp").notNull().default(""),
  address: text("address").notNull().default(""),
  googleMaps: text("google_maps").notNull().default(""),
  facebook: text("facebook").notNull().default(""),
  instagram: text("instagram").notNull().default(""),
  youtube: text("youtube").notNull().default(""),
  linkedin: text("linkedin").notNull().default(""),
  logo: text("logo").notNull().default(""),
  favicon: text("favicon").notNull().default(""),
  workingHours: text("working_hours").notNull().default(""),
  heroTotalFrames: integer("hero_total_frames").notNull().default(0),
  defaultLanguage: text("default_language").notNull().default("id"),
  theme: text("theme").notNull().default("light"),
  analyticsId: text("analytics_id").notNull().default(""),
  metaPixel: text("meta_pixel").notNull().default(""),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// SERVICES
// ---------------------------------------------------------------------------

export const services = pgTable("services", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  icon: text("icon").notNull().default("building"),
  heroImage: text("hero_image").notNull().default(""),
  description: text("description").notNull().default(""),
  content: text("content").notNull().default(""),
  benefits: json("benefits").$type<string[]>().notNull().default([]),
  workflow: json("workflow").$type<string[]>().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  displayOrder: integer("display_order").notNull().default(0),
  seoTitle: text("seo_title").notNull().default(""),
  seoDescription: text("seo_description").notNull().default(""),
  status: publishStatusEnum("status").notNull().default("published"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// PROJECTS (PORTFOLIO)
// ---------------------------------------------------------------------------

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull().default("residential"),
  location: text("location").notNull().default(""),
  province: text("province").notNull().default(""),
  client: text("client").notNull().default(""),
  architect: text("architect").notNull().default(""),
  contractor: text("contractor").notNull().default("Asia Engineer"),
  year: integer("year").notNull().default(sql`extract(year from now())`),
  status: text("status").notNull().default("selesai"),
  area: text("area").notNull().default(""),
  duration: text("duration").notNull().default(""),
  budget: text("budget").notNull().default(""),
  shortDescription: text("short_description").notNull().default(""),
  fullDescription: text("full_description").notNull().default(""),
  challenges: text("challenges").notNull().default(""),
  engineeringSolution: text("engineering_solution").notNull().default(""),
  constructionMethod: text("construction_method").notNull().default(""),
  materials: text("materials").notNull().default(""),
  heroImage: text("hero_image").notNull().default(""),
  thumbnail: text("thumbnail").notNull().default(""),
  featured: boolean("featured").notNull().default(false),
  seoTitle: text("seo_title").notNull().default(""),
  seoDescription: text("seo_description").notNull().default(""),
  tags: json("tags").$type<string[]>().notNull().default([]),
  statusPublish: publishStatusEnum("status_publish").notNull().default("published"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const projectImages = pgTable("project_images", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  image: text("image").notNull(),
  caption: text("caption").notNull().default(""),
  alt: text("alt").notNull().default(""),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// GALLERY
// ---------------------------------------------------------------------------

export const gallery = pgTable("gallery", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  category: text("category").notNull().default("residential"),
  title: text("title").notNull().default(""),
  image: text("image").notNull(),
  alt: text("alt").notNull().default(""),
  caption: text("caption").notNull().default(""),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// TEAM
// ---------------------------------------------------------------------------

export const team = pgTable("team", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  photo: text("photo").notNull().default(""),
  name: text("name").notNull(),
  position: text("position").notNull().default(""),
  biography: text("biography").notNull().default(""),
  experience: text("experience").notNull().default(""),
  linkedin: text("linkedin").notNull().default(""),
  instagram: text("instagram").notNull().default(""),
  displayOrder: integer("display_order").notNull().default(0),
  status: publishStatusEnum("status").notNull().default("published"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// TESTIMONIALS
// ---------------------------------------------------------------------------

export const testimonials = pgTable("testimonials", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  clientName: text("client_name").notNull(),
  company: text("company").notNull().default(""),
  photo: text("photo").notNull().default(""),
  projectId: uuid("project_id").references(() => projects.id, { onDelete: "set null" }),
  rating: integer("rating").notNull().default(5),
  testimonial: text("testimonial").notNull().default(""),
  isPlaceholder: boolean("is_placeholder").notNull().default(true),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const faq = pgTable("faq", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  category: text("category").notNull().default("umum"),
  question: text("question").notNull(),
  answer: text("answer").notNull().default(""),
  priority: integer("priority").notNull().default(0),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// ARTICLES
// ---------------------------------------------------------------------------

export const articles = pgTable("articles", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  cover: text("cover").notNull().default(""),
  author: text("author").notNull().default("Tim Asia Engineer"),
  category: text("category").notNull().default("berita"),
  content: text("content").notNull().default(""),
  excerpt: text("excerpt").notNull().default(""),
  readingTime: integer("reading_time").notNull().default(3),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(false),
  seoTitle: text("seo_title").notNull().default(""),
  seoDescription: text("seo_description").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// CONTACT MESSAGES (LEADS)
// ---------------------------------------------------------------------------

export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  company: text("company").notNull().default(""),
  phone: text("phone").notNull().default(""),
  email: text("email").notNull().default(""),
  projectType: text("project_type").notNull().default(""),
  budget: text("budget").notNull().default(""),
  location: text("location").notNull().default(""),
  message: text("message").notNull().default(""),
  attachment: text("attachment").notNull().default(""),
  status: leadStatusEnum("status").notNull().default("baru"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// MEDIA LIBRARY
// ---------------------------------------------------------------------------

export const media = pgTable("media", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  folder: text("folder").notNull().default("general"),
  filename: text("filename").notNull(),
  url: text("url").notNull(),
  mime: text("mime").notNull().default(""),
  size: integer("size").notNull().default(0),
  alt: text("alt").notNull().default(""),
  caption: text("caption").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
