import { db } from "@/db";
import {
  articles,
  contactMessages,
  faq,
  gallery,
  projectImages,
  projects,
  services,
  settings,
  team,
  testimonials,
} from "@/db/schema";
import { and, asc, desc, eq } from "drizzle-orm";

export type Settings = typeof settings.$inferSelect;

const DEFAULT_SETTINGS: Settings = {
  id: 1,
  companyName: "",
  companyEmail: "",
  phone: "",
  whatsapp: "",
  address: "",
  googleMaps: "",
  facebook: "",
  instagram: "",
  youtube: "",
  linkedin: "",
  logo: "",
  favicon: "",
  workingHours: "",
  heroTotalFrames: 0,
  defaultLanguage: "id",
  theme: "light",
  analyticsId: "",
  metaPixel: "",
  updatedAt: new Date(),
};

export async function getSettings(): Promise<Settings> {
  const rows = await db.select().from(settings).limit(1);
  return rows[0] ?? DEFAULT_SETTINGS;
}

export async function getServices() {
  return db
    .select()
    .from(services)
    .where(eq(services.status, "published"))
    .orderBy(asc(services.displayOrder));
}

export async function getServiceBySlug(slug: string) {
  const rows = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getFeaturedProjects() {
  return db
    .select()
    .from(projects)
    .where(and(eq(projects.statusPublish, "published"), eq(projects.featured, true)))
    .orderBy(desc(projects.year));
}

export async function getProjects(category?: string) {
  const base = db.select().from(projects).where(eq(projects.statusPublish, "published"));
  const rows = await base.orderBy(desc(projects.year));
  if (category && category !== "all") {
    return rows.filter((p) => p.category === category);
  }
  return rows;
}

export async function getProjectBySlug(slug: string) {
  const rows = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
  const project = rows[0];
  if (!project) return null;
  const images = await db
    .select()
    .from(projectImages)
    .where(eq(projectImages.projectId, project.id))
    .orderBy(asc(projectImages.displayOrder));
  return { project, images };
}

export async function getRelatedProjects(category: string, excludeSlug: string) {
  const rows = await db
    .select()
    .from(projects)
    .where(and(eq(projects.category, category), eq(projects.statusPublish, "published")))
    .orderBy(desc(projects.year))
    .limit(4);
  return rows.filter((p) => p.slug !== excludeSlug).slice(0, 3);
}

export async function getGallery(category?: string) {
  const rows = await db.select().from(gallery).orderBy(desc(gallery.createdAt));
  if (category && category !== "all") {
    return rows.filter((g) => g.category === category);
  }
  return rows;
}

export async function getTeam() {
  return db
    .select()
    .from(team)
    .where(eq(team.status, "published"))
    .orderBy(asc(team.displayOrder));
}

export async function getTestimonials() {
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.published, true))
    .orderBy(desc(testimonials.featured));
}

export async function getFaq(category?: string) {
  const rows = await db
    .select()
    .from(faq)
    .where(eq(faq.published, true))
    .orderBy(asc(faq.priority));
  if (category && category !== "all") {
    return rows.filter((f) => f.category === category);
  }
  return rows;
}

export async function getArticles() {
  return db
    .select()
    .from(articles)
    .where(eq(articles.published, true))
    .orderBy(desc(articles.createdAt));
}

export async function getArticleBySlug(slug: string) {
  const rows = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getDashboardStats() {
  const [projectRows, messageRows, galleryRows, articleRows] = await Promise.all([
    db.select().from(projects),
    db.select().from(contactMessages),
    db.select().from(gallery),
    db.select().from(articles),
  ]);

  const newLeads = messageRows.filter((m) => m.status === "baru").length;
  const dealCount = messageRows.filter((m) => m.status === "deal").length;

  return {
    totalProjects: projectRows.length,
    publishedProjects: projectRows.filter((p) => p.statusPublish === "published").length,
    totalMessages: messageRows.length,
    newLeads,
    dealCount,
    totalGallery: galleryRows.length,
    totalArticles: articleRows.length,
    recentMessages: messageRows
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5),
    recentProjects: projectRows
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5),
  };
}
