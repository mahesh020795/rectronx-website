import { allCatalogProjects, CatalogProject } from "@/data/projects";
import { servicePages, ServicePage } from "@/data/services";
import { getAllComponents } from "@/lib/components";
import { getAllTopicHubs } from "@/lib/topics";

export function getAllServicePages() {
  return servicePages;
}

export function getServicePageBySlug(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}

export function getRelatedServiceProjects(page: ServicePage, limit = 9): CatalogProject[] {
  const tagSet = new Set(page.relatedTags.map((tag) => tag.toLowerCase()));
  const scored = allCatalogProjects
    .map((project) => {
      const title = project.title.toLowerCase();
      const tagScore = project.tags.filter((tag) => tagSet.has(tag.toLowerCase())).length * 3;
      const titleScore = page.relatedTags.filter((tag) => title.includes(tag.toLowerCase())).length;
      const categoryScore =
        page.slug.includes("software") && project.category === "software"
          ? 4
          : page.slug.includes("iot") || page.slug.includes("esp32") || page.slug.includes("arduino")
            ? project.category === "iot"
              ? 2
              : 0
            : 1;

      return { project, score: tagScore + titleScore + categoryScore };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.project.id - b.project.id)
    .slice(0, limit);

  return scored.map((entry) => entry.project);
}

export function getRelatedServiceTopics(page: ServicePage) {
  const slugs = new Set(page.relatedTopicSlugs);
  return getAllTopicHubs().filter((topic) => slugs.has(topic.slug));
}

export function getRelatedServiceComponents(page: ServicePage) {
  const slugs = new Set(page.componentSlugs);
  return getAllComponents().filter((component) => slugs.has(component.slug));
}
