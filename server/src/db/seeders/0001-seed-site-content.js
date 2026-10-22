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
} from "../../models/index.js";

export async function up() {
  await SiteSetting.bulkCreate([
    {
      id: 1,
      brandName: "Kabalan",
      brandMark: "K",
      phone: "+961 3 562 190",
      phoneHref: "tel:+9613562190",
      email: "hello@kabalan.com",
      address: "Beirut, Lebanon",
      workingHours: "Mon – Sat, 8:00 – 18:00",
      footerDescription:
        "Residential, commercial, and infrastructure projects delivered with precision from first sketch to final handover.",
      copyrightText: "© 2026 Kabalan. All rights reserved.",
    },
  ]);

  await SocialLink.bulkCreate([
    { platform: "Facebook", icon: "bi-facebook", url: "#home", sortOrder: 1 },
    { platform: "Instagram", icon: "bi-instagram", url: "#home", sortOrder: 2 },
    { platform: "LinkedIn", icon: "bi-linkedin", url: "#home", sortOrder: 3 },
  ]);

  await NavLink.bulkCreate([
    {
      label: "Home",
      href: "#home",
      groupName: "main",
      showInFooter: true,
      sortOrder: 1,
    },
    {
      label: "About",
      href: "#about",
      groupName: "main",
      showInFooter: true,
      sortOrder: 2,
    },
    {
      label: "Services",
      href: "#services",
      groupName: "main",
      showInFooter: true,
      sortOrder: 3,
    },
    {
      label: "Projects",
      href: "#projects",
      groupName: "main",
      showInFooter: true,
      sortOrder: 4,
    },
    {
      label: "Team",
      href: "#team",
      groupName: "main",
      showInFooter: false,
      sortOrder: 5,
    },
    {
      label: "Contact",
      href: "#contact",
      groupName: "main",
      showInFooter: true,
      sortOrder: 6,
    },
    {
      label: "Blog",
      href: "#blog",
      groupName: "pages",
      showInFooter: false,
      sortOrder: 1,
    },
    {
      label: "Pricing",
      href: "#pricing",
      groupName: "pages",
      showInFooter: false,
      sortOrder: 2,
    },
    {
      label: "FAQ",
      href: "#faq",
      groupName: "pages",
      showInFooter: false,
      sortOrder: 3,
    },
    {
      label: "Careers",
      href: "#careers",
      groupName: "pages",
      showInFooter: false,
      sortOrder: 4,
    },
  ]);

  await HomeContent.bulkCreate([
    {
      id: 1,
      eyebrow: "Trusted Construction Partner since 2004",
      eyebrowIcon: "bi-patch-check-fill",
      titleLine1: "Built on precision.",
      titleLine2: "Finished with care.",
      description:
        "From groundwork to handover, we deliver residential and commercial builds with craftsmanship you can see and structure you can trust.",
      backgroundImage: "/uploads/seed/homeImg.avif",
      primaryButtonLabel: "Explore Our Projects",
      primaryButtonHref: "#projects",
      secondaryButtonLabel: "Request a Quote",
      secondaryButtonHref: "#contact",
    },
  ]);

  await HomeStat.bulkCreate([
    { value: "20+", label: "Years Experience", sortOrder: 1 },
    { value: "1000+", label: "Projects Completed", sortOrder: 2 },
    { value: "200+", label: "Team Experts", sortOrder: 3 },
    { value: "50+", label: "Industry Awards", sortOrder: 4 },
  ]);

  await AboutContent.bulkCreate([
    {
      id: 1,
      eyebrow: "About Constructify",
      eyebrowIcon: "bi-buildings-fill",
      heading: "We Build With Precision, Passion & Purpose",
      description:
        "For over two decades we have partnered with homeowners and developers to deliver spaces that balance structural integrity with thoughtful design. Every project is led by a dedicated team, built to schedule, and finished to a standard we are proud to put our name on.",
      badgeValue: "20+",
      badgeLabel: "Years of Experience",
      imagePrimary: "/uploads/seed/aboutFirstImg.avif",
      imageSecondary: "/uploads/seed/aboutSecondImg.avif",
      primaryButtonLabel: "Start Your Project",
      primaryButtonHref: "#contact",
      secondaryButtonLabel: "View Our Work",
      secondaryButtonHref: "#projects",
    },
  ]);

  await AboutFeature.bulkCreate([
    {
      icon: "bi-shield-check",
      title: "Licensed & Insured",
      description:
        "Fully licensed, bonded, and insured for every project we take on.",
      sortOrder: 1,
    },
    {
      icon: "bi-stopwatch",
      title: "On-Time Delivery",
      description:
        "Clear schedules and dependable crews that keep your build on track.",
      sortOrder: 2,
    },
    {
      icon: "bi-people-fill",
      title: "Expert Workforce",
      description:
        "Skilled tradespeople and site managers with decades of hands-on experience.",
      sortOrder: 3,
    },
    {
      icon: "bi-award-fill",
      title: "Award Winning",
      description: "Recognized for quality and craftsmanship across the region.",
      sortOrder: 4,
    },
  ]);

  await ServicesContent.bulkCreate([
    {
      id: 1,
      title: "Our Services",
      subtitle: "Built with precision at every stage.",
      mediaImage: "/uploads/seed/servicesImg.jpeg",
      mediaHeading: "We Deliver Excellence in Every Project",
      mediaLinkLabel: "Get a Free Consultation",
      mediaLinkHref: "#contact",
    },
  ]);

  await Service.bulkCreate([
    {
      icon: "bi-house-door-fill",
      title: "Residential Building",
      description:
        "Custom homes and multi-unit residences built for comfort and longevity.",
      sortOrder: 1,
    },
    {
      icon: "bi-building",
      title: "Commercial Projects",
      description:
        "Offices, retail, and mixed-use spaces delivered on time and on budget.",
      sortOrder: 2,
    },
    {
      icon: "bi-tools",
      title: "Renovation & Remodeling",
      description:
        "Thoughtful upgrades that modernize your space while preserving its character.",
      sortOrder: 3,
    },
    {
      icon: "bi-signpost-2-fill",
      title: "Road & Infrastructure",
      description:
        "Reliable civil works and site infrastructure engineered to last.",
      sortOrder: 4,
    },
    {
      icon: "bi-clipboard-check",
      title: "Project Management",
      description:
        "End-to-end coordination that keeps every trade aligned and on schedule.",
      sortOrder: 5,
    },
    {
      icon: "bi-rulers",
      title: "Architecture & Design",
      description:
        "Concept-to-detail design guided by how you actually live and work.",
      sortOrder: 6,
    },
  ]);

  await TrackRecordContent.bulkCreate([
    {
      id: 1,
      eyebrow: "Our Track Record",
      title: "Numbers That Speak for Our Commitment",
      description:
        "Two decades of disciplined delivery, loyal clients, and a team that treats every site like it matters. The numbers tell the story.",
      linkLabel: "View Our Projects",
      linkHref: "#projects",
    },
  ]);

  await TrackStat.bulkCreate([
    {
      icon: "bi-buildings-fill",
      value: "1000+",
      label: "Projects Delivered",
      sortOrder: 1,
    },
    {
      icon: "bi-people-fill",
      value: "850+",
      label: "Satisfied Clients",
      sortOrder: 2,
    },
    {
      icon: "bi-person-fill-gear",
      value: "200+",
      label: "Skilled Workers",
      sortOrder: 3,
    },
    {
      icon: "bi-trophy-fill",
      value: "50+",
      label: "Industry Awards",
      sortOrder: 4,
    },
  ]);

  await ProjectsContent.bulkCreate([
    {
      id: 1,
      title: "Our Projects",
      subtitle: "Selected work built with precision and care.",
    },
  ]);

  await Project.bulkCreate([
    {
      category: "Residential",
      title: "Cedar Hills Residence",
      image: "/uploads/seed/aboutFirstImg.avif",
      description:
        "A hillside family home shaped around natural light, open living, and quiet outdoor rooms.",
      longDescription:
        "Cedar Hills Residence was designed and built as a calm retreat above the valley. The home pairs a restrained material palette with generous glazing, deep terraces, and a layout that keeps family life connected while giving every room its own sense of privacy.",
      location: "Broummana, Lebanon",
      year: "2024",
      scope: "Design & Build",
      sortOrder: 1,
    },
    {
      category: "Commercial",
      title: "Skyline Office Tower",
      image: "/uploads/seed/homeImg.avif",
      description:
        "A mixed-use commercial tower delivered with a focus on efficiency, daylight, and long-term flexibility.",
      longDescription:
        "Skyline Office Tower brings flexible workspaces, ground-floor retail, and shared amenities into one coordinated development. The project was delivered floor by floor while the surrounding district remained active, with strict attention to safety, sequencing, and finish quality.",
      location: "Beirut, Lebanon",
      year: "2023",
      scope: "Construction Management",
      sortOrder: 2,
    },
    {
      category: "Infrastructure",
      title: "Coastal Highway Upgrade",
      image: "/uploads/seed/aboutSecondImg.avif",
      description:
        "Road widening, drainage, and retaining works that keep a busy coastal route moving safely.",
      longDescription:
        "The Coastal Highway Upgrade combined road widening, improved drainage, and reinforced retaining structures across a heavily used corridor. Careful staging kept traffic flowing throughout construction while the team met a demanding public-works schedule.",
      location: "Jounieh, Lebanon",
      year: "2023",
      scope: "Civil Works",
      sortOrder: 3,
    },
    {
      category: "Residential",
      title: "Olive Grove Villas",
      image: "/uploads/seed/servicesImg.jpeg",
      description:
        "A cluster of contemporary villas arranged around shared gardens and framed views.",
      longDescription:
        "Olive Grove Villas is a low-density residential cluster designed around mature trees and shared outdoor space. Each villa has its own private courtyard, while the overall site uses a simple, durable material language that will age gracefully.",
      location: "Batroun, Lebanon",
      year: "2022",
      scope: "Design & Build",
      sortOrder: 4,
    },
    {
      category: "Commercial",
      title: "Harbor Point Retail",
      image: "/uploads/seed/homeImg.avif",
      description:
        "A waterfront retail destination with open frontage, covered walkways, and a lively public edge.",
      longDescription:
        "Harbor Point Retail transforms a former industrial edge into a walkable retail destination. The project includes new frontage, covered circulation, landscape works, and services upgrades, all delivered in phases to keep tenants trading.",
      location: "Byblos, Lebanon",
      year: "2022",
      scope: "Renovation & Fit-out",
      sortOrder: 5,
    },
    {
      category: "Infrastructure",
      title: "Metro Bridge Rehabilitation",
      image: "/uploads/seed/aboutSecondImg.avif",
      description:
        "Structural rehabilitation and resurfacing that extend the life of a critical city crossing.",
      longDescription:
        "Metro Bridge Rehabilitation involved structural repairs, deck resurfacing, and upgraded safety barriers on a key urban crossing. Night works and phased closures reduced disruption while the team completed the program ahead of schedule.",
      location: "Tripoli, Lebanon",
      year: "2021",
      scope: "Structural Works",
      sortOrder: 6,
    },
  ]);

  await ContactContent.bulkCreate([
    {
      id: 1,
      eyebrow: "Contact Us",
      eyebrowIcon: "bi-chat-square-dots-fill",
      heading: "Let's Build Something Together",
      lead:
        "Tell us about your site, your plans, or the space you have in mind. We will get back to you with clear next steps and an honest estimate.",
      cardTitle: "Request a Consultation",
      cardDescription:
        "Share a few details and we will arrange a time to talk through your project.",
    },
  ]);

  await ContactDetail.bulkCreate([
    {
      icon: "bi-telephone-fill",
      label: "Call Us",
      value: "+961 3 562 190",
      href: "tel:+9613562190",
      sortOrder: 1,
    },
    {
      icon: "bi-envelope-fill",
      label: "Email Us",
      value: "hello@kabalan.com",
      href: "mailto:hello@kabalan.com",
      sortOrder: 2,
    },
    {
      icon: "bi-geo-alt-fill",
      label: "Visit Us",
      value: "Beirut, Lebanon",
      href: null,
      sortOrder: 3,
    },
    {
      icon: "bi-clock-fill",
      label: "Working Hours",
      value: "Mon – Sat, 8:00 – 18:00",
      href: null,
      sortOrder: 4,
    },
  ]);
}

export async function down() {
  await ContactDetail.destroy({ where: {}, truncate: true });
  await ContactContent.destroy({ where: {}, truncate: true });
  await Project.destroy({ where: {}, truncate: true });
  await ProjectsContent.destroy({ where: {}, truncate: true });
  await TrackStat.destroy({ where: {}, truncate: true });
  await TrackRecordContent.destroy({ where: {}, truncate: true });
  await Service.destroy({ where: {}, truncate: true });
  await ServicesContent.destroy({ where: {}, truncate: true });
  await AboutFeature.destroy({ where: {}, truncate: true });
  await AboutContent.destroy({ where: {}, truncate: true });
  await HomeStat.destroy({ where: {}, truncate: true });
  await HomeContent.destroy({ where: {}, truncate: true });
  await NavLink.destroy({ where: {}, truncate: true });
  await SocialLink.destroy({ where: {}, truncate: true });
  await SiteSetting.destroy({ where: {}, truncate: true });
}
