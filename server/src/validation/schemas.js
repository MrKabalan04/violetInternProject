import { z } from "zod";

const requiredString = (max = 255) =>
  z.string().trim().min(1, "This field is required").max(max);

const optionalText = (max = 5000) => z.string().trim().max(max);

const imagePath = requiredString(255);

const sortOrder = z.coerce.number().int().min(0).max(10000);

const optionalHref = z.preprocess(
  (value) => (value === "" || value === undefined ? null : value),
  z.string().trim().max(190).nullable().optional()
);

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(190),
  password: z.string().min(1, "Password is required").max(200),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required").max(200),
  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters")
    .max(72),
});

export const siteSettingSchema = z.object({
  brandName: requiredString(100),
  brandMark: requiredString(10),
  phone: requiredString(50),
  phoneHref: requiredString(50),
  email: z.string().trim().email("Enter a valid email").max(190),
  address: requiredString(190),
  workingHours: requiredString(190),
  footerDescription: optionalText(2000),
  copyrightText: requiredString(190),
});

export const homeContentSchema = z.object({
  eyebrow: requiredString(190),
  eyebrowIcon: requiredString(50),
  titleLine1: requiredString(190),
  titleLine2: requiredString(190),
  description: optionalText(2000),
  backgroundImage: imagePath,
  primaryButtonLabel: requiredString(100),
  primaryButtonHref: requiredString(190),
  secondaryButtonLabel: requiredString(100),
  secondaryButtonHref: requiredString(190),
});

export const homeStatSchema = z.object({
  value: requiredString(50),
  label: requiredString(100),
  sortOrder,
});

export const aboutContentSchema = z.object({
  eyebrow: requiredString(190),
  eyebrowIcon: requiredString(50),
  heading: requiredString(255),
  description: optionalText(3000),
  badgeValue: requiredString(50),
  badgeLabel: requiredString(100),
  imagePrimary: imagePath,
  imageSecondary: imagePath,
  primaryButtonLabel: requiredString(100),
  primaryButtonHref: requiredString(190),
  secondaryButtonLabel: requiredString(100),
  secondaryButtonHref: requiredString(190),
});

export const aboutFeatureSchema = z.object({
  icon: requiredString(50),
  title: requiredString(120),
  description: optionalText(1000),
  sortOrder,
});

export const servicesContentSchema = z.object({
  title: requiredString(190),
  subtitle: requiredString(255),
  mediaImage: imagePath,
  mediaHeading: requiredString(255),
  mediaLinkLabel: requiredString(100),
  mediaLinkHref: requiredString(190),
});

export const serviceSchema = z.object({
  icon: requiredString(50),
  title: requiredString(120),
  description: optionalText(1000),
  sortOrder,
});

export const trackRecordContentSchema = z.object({
  eyebrow: requiredString(190),
  title: requiredString(255),
  description: optionalText(3000),
  linkLabel: requiredString(100),
  linkHref: requiredString(190),
});

export const trackStatSchema = z.object({
  icon: requiredString(50),
  value: requiredString(50),
  label: requiredString(100),
  sortOrder,
});

export const projectsContentSchema = z.object({
  title: requiredString(190),
  subtitle: requiredString(255),
});

export const projectSchema = z.object({
  category: requiredString(50),
  title: requiredString(190),
  image: imagePath,
  description: optionalText(1000),
  longDescription: optionalText(5000),
  location: requiredString(190),
  year: requiredString(10),
  scope: requiredString(120),
  sortOrder,
});

export const contactContentSchema = z.object({
  eyebrow: requiredString(190),
  eyebrowIcon: requiredString(50),
  heading: requiredString(255),
  lead: optionalText(2000),
  cardTitle: requiredString(190),
  cardDescription: optionalText(2000),
});

export const contactDetailSchema = z.object({
  icon: requiredString(50),
  label: requiredString(100),
  value: requiredString(190),
  href: optionalHref,
  sortOrder,
});

export const socialLinkSchema = z.object({
  platform: requiredString(50),
  icon: requiredString(50),
  url: requiredString(255),
  sortOrder,
});

export const navLinkSchema = z.object({
  label: requiredString(100),
  href: requiredString(190),
  groupName: z.enum(["main", "pages"]),
  showInFooter: z.boolean(),
  isActive: z.boolean(),
  sortOrder,
});

export const singletonSchemas = {
  site: siteSettingSchema,
  home: homeContentSchema,
  about: aboutContentSchema,
  "services-content": servicesContentSchema,
  "track-record": trackRecordContentSchema,
  "projects-content": projectsContentSchema,
  contact: contactContentSchema,
};

export const listSchemas = {
  "home-stats": homeStatSchema,
  "about-features": aboutFeatureSchema,
  services: serviceSchema,
  "track-stats": trackStatSchema,
  projects: projectSchema,
  "contact-details": contactDetailSchema,
  "social-links": socialLinkSchema,
  "nav-links": navLinkSchema,
};
