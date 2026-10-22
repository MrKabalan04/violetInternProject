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
import {
  listSchemas,
  singletonSchemas,
} from "../validation/schemas.js";
import { buildContent } from "../services/content.service.js";

const singletonResources = {
  site: { model: SiteSetting },
  home: { model: HomeContent },
  about: { model: AboutContent },
  "services-content": { model: ServicesContent },
  "track-record": { model: TrackRecordContent },
  "projects-content": { model: ProjectsContent },
  contact: { model: ContactContent },
};

const listResources = {
  "home-stats": {
    model: HomeStat,
    order: [["sortOrder", "ASC"], ["id", "ASC"]],
  },
  "about-features": {
    model: AboutFeature,
    order: [["sortOrder", "ASC"], ["id", "ASC"]],
  },
  services: {
    model: Service,
    order: [["sortOrder", "ASC"], ["id", "ASC"]],
  },
  "track-stats": {
    model: TrackStat,
    order: [["sortOrder", "ASC"], ["id", "ASC"]],
  },
  projects: {
    model: Project,
    order: [["sortOrder", "ASC"], ["id", "ASC"]],
  },
  "contact-details": {
    model: ContactDetail,
    order: [["sortOrder", "ASC"], ["id", "ASC"]],
  },
  "social-links": {
    model: SocialLink,
    order: [["sortOrder", "ASC"], ["id", "ASC"]],
  },
  "nav-links": {
    model: NavLink,
    order: [["sortOrder", "ASC"], ["id", "ASC"]],
  },
};

function validationError(res, error) {
  return res.status(400).json({
    message: "Validation failed",
    errors: error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    })),
  });
}

export async function getAdminContent(req, res, next) {
  try {
    const content = await buildContent({ includeInactive: true });
    res.set("Cache-Control", "no-store");
    res.json(content);
  } catch (error) {
    next(error);
  }
}

export async function updateSingleton(req, res, next) {
  try {
    const { key } = req.params;
    const resource = singletonResources[key];
    const schema = singletonSchemas[key];

    if (!resource || !schema) {
      return res.status(404).json({ message: "Content section not found" });
    }

    const parsed = schema.partial().safeParse(req.body);

    if (!parsed.success) {
      return validationError(res, parsed.error);
    }

    const row = await resource.model.findByPk(1);

    if (!row) {
      return res.status(404).json({ message: "Content section not found" });
    }

    await row.update(parsed.data);
    res.json(row);
  } catch (error) {
    next(error);
  }
}

export async function listResource(req, res, next) {
  try {
    const resource = listResources[req.params.resource];

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    const rows = await resource.model.findAll({ order: resource.order });
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

export async function createResource(req, res, next) {
  try {
    const { resource: resourceKey } = req.params;
    const resource = listResources[resourceKey];
    const schema = listSchemas[resourceKey];

    if (!resource || !schema) {
      return res.status(404).json({ message: "Resource not found" });
    }

    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      return validationError(res, parsed.error);
    }

    const row = await resource.model.create(parsed.data);
    res.status(201).json(row);
  } catch (error) {
    next(error);
  }
}

export async function updateResource(req, res, next) {
  try {
    const { resource: resourceKey, id } = req.params;
    const resource = listResources[resourceKey];
    const schema = listSchemas[resourceKey];

    if (!resource || !schema) {
      return res.status(404).json({ message: "Resource not found" });
    }

    const parsed = schema.partial().safeParse(req.body);

    if (!parsed.success) {
      return validationError(res, parsed.error);
    }

    const row = await resource.model.findByPk(id);

    if (!row) {
      return res.status(404).json({ message: "Item not found" });
    }

    await row.update(parsed.data);
    res.json(row);
  } catch (error) {
    next(error);
  }
}

export async function deleteResource(req, res, next) {
  try {
    const { resource: resourceKey, id } = req.params;
    const resource = listResources[resourceKey];

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    const row = await resource.model.findByPk(id);

    if (!row) {
      return res.status(404).json({ message: "Item not found" });
    }

    await row.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "No image was uploaded" });
  }

  res.status(201).json({ url: `/uploads/${req.file.filename}` });
}
