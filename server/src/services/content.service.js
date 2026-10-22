import {
  SiteSetting,
  SocialLink,
  NavLink,
  HomeContent,
  HomeStat,
  AboutContent,
  AboutFeature,
  ServicesContent,
  Service,
  TrackRecordContent,
  TrackStat,
  ProjectsContent,
  Project,
  ContactContent,
  ContactDetail,
} from "../models/index.js";

function toJson(row) {
  return row ? row.toJSON() : null;
}

function toJsonList(rows) {
  return rows.map((row) => row.toJSON());
}

export async function buildContent({ includeInactive = false } = {}) {
  const navWhere = includeInactive ? {} : { isActive: true };
  const ordered = [["sortOrder", "ASC"], ["id", "ASC"]];

  const [
    site,
    socialLinks,
    navLinks,
    homeContent,
    homeStats,
    aboutContent,
    aboutFeatures,
    servicesContent,
    services,
    trackRecordContent,
    trackStats,
    projectsContent,
    projects,
    contactContent,
    contactDetails,
  ] = await Promise.all([
    SiteSetting.findByPk(1),
    SocialLink.findAll({ order: ordered }),
    NavLink.findAll({ where: navWhere, order: ordered }),
    HomeContent.findByPk(1),
    HomeStat.findAll({ order: ordered }),
    AboutContent.findByPk(1),
    AboutFeature.findAll({ order: ordered }),
    ServicesContent.findByPk(1),
    Service.findAll({ order: ordered }),
    TrackRecordContent.findByPk(1),
    TrackStat.findAll({ order: ordered }),
    ProjectsContent.findByPk(1),
    Project.findAll({ order: ordered }),
    ContactContent.findByPk(1),
    ContactDetail.findAll({ order: ordered }),
  ]);

  const projectItems = toJsonList(projects);
  const categories = [...new Set(projectItems.map((project) => project.category))];

  return {
    site: toJson(site),
    socialLinks: toJsonList(socialLinks),
    navLinks: {
      main: toJsonList(navLinks.filter((link) => link.groupName === "main")),
      pages: toJsonList(navLinks.filter((link) => link.groupName === "pages")),
    },
    home: {
      content: toJson(homeContent),
      stats: toJsonList(homeStats),
    },
    about: {
      content: toJson(aboutContent),
      features: toJsonList(aboutFeatures),
    },
    services: {
      content: toJson(servicesContent),
      items: toJsonList(services),
    },
    trackRecord: {
      content: toJson(trackRecordContent),
      stats: toJsonList(trackStats),
    },
    projects: {
      content: toJson(projectsContent),
      items: projectItems,
      categories,
    },
    contact: {
      content: toJson(contactContent),
      details: toJsonList(contactDetails),
    },
  };
}
