import { allCatalogProjects, CatalogProject } from "@/data/projects";
import { ComponentGuide, components } from "@/data/components";
import { TopicHub, topicHubs } from "@/data/topics";
import { getAllPosts } from "@/lib/blog";

export function getAllTopicHubs() {
  return topicHubs;
}

export function getTopicHubBySlug(slug: string) {
  return topicHubs.find((topic) => topic.slug === slug);
}

export function getTopicCatalogProjects(topic: TopicHub, limit = 24) {
  return allCatalogProjects
    .map((project) => ({ project, score: scoreText(topic, project.title, project.tags) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.project.id - b.project.id)
    .slice(0, limit)
    .map((item) => item.project);
}

export function getTopicComponents(topic: TopicHub, limit = 10) {
  return components
    .map((component) => ({
      component,
      score: scoreText(topic, component.name, [
        component.shortName,
        component.categoryLabel,
        ...component.interfaces,
        ...component.compatibleWith,
        ...component.suitableFor,
      ]),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.component.name.localeCompare(b.component.name))
    .slice(0, limit)
    .map((item) => item.component);
}

export function getTopicPosts(topic: TopicHub, limit = 8) {
  return getAllPosts()
    .map((post) => ({
      post,
      score: scoreText(topic, `${post.title} ${post.excerpt} ${post.slug}`, [post.category]),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

export function getRelatedTopicHubsForProject(project: CatalogProject, limit = 4) {
  return topicHubs
    .map((topic) => ({ topic, score: scoreText(topic, project.title, project.tags) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.topic);
}

export function getRelatedTopicHubsForComponent(component: ComponentGuide, limit = 4) {
  const fields = [
    component.shortName,
    component.categoryLabel,
    ...component.interfaces,
    ...component.compatibleWith,
    ...component.suitableFor,
    ...component.projectIdeas,
  ];

  return topicHubs
    .map((topic) => ({ topic, score: scoreText(topic, component.name, fields) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.topic);
}

function scoreText(topic: TopicHub, title: string, fields: string[]) {
  const haystack = `${title} ${fields.join(" ")}`.toLowerCase();
  let score = 0;

  for (const tag of topic.tags) {
    if (haystack.includes(tag.toLowerCase())) score += 4;
  }

  for (const term of topic.searchTerms) {
    if (haystack.includes(term.toLowerCase())) score += 3;
  }

  for (const keyword of topic.keywords) {
    if (haystack.includes(keyword.toLowerCase())) score += 2;
  }

  return score;
}
