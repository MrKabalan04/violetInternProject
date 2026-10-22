import { buildContent } from "../services/content.service.js";

export async function getContent(req, res, next) {
  try {
    const content = await buildContent();
    res.set("Cache-Control", "no-store");
    res.json(content);
  } catch (error) {
    next(error);
  }
}
