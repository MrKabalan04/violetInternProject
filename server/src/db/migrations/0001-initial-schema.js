import { DataTypes } from "sequelize";

const timestamps = {
  created_at: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updated_at: {
    allowNull: false,
    type: DataTypes.DATE,
  },
};

export async function up({ context: queryInterface }) {
  await queryInterface.createTable("admin_users", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(190),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "editor"),
      allowNull: false,
      defaultValue: "admin",
    },
    ...timestamps,
  });

  await queryInterface.createTable("site_settings", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    brand_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    brand_mark: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phone_href: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    working_hours: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    footer_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    copyright_text: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    ...timestamps,
  });

  await queryInterface.createTable("social_links", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    platform: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    sort_order: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    ...timestamps,
  });

  await queryInterface.createTable("nav_links", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    href: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    group_name: {
      type: DataTypes.ENUM("main", "pages"),
      allowNull: false,
      defaultValue: "main",
    },
    show_in_footer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    sort_order: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    ...timestamps,
  });

  await queryInterface.createTable("home_content", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    eyebrow: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    eyebrow_icon: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    title_line_1: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    title_line_2: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    background_image: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    primary_button_label: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    primary_button_href: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    secondary_button_label: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    secondary_button_href: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    ...timestamps,
  });

  await queryInterface.createTable("home_stats", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    sort_order: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    ...timestamps,
  });

  await queryInterface.createTable("about_content", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    eyebrow: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    eyebrow_icon: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    heading: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    badge_value: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    badge_label: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    image_primary: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    image_secondary: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    primary_button_label: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    primary_button_href: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    secondary_button_label: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    secondary_button_href: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    ...timestamps,
  });

  await queryInterface.createTable("about_features", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    icon: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sort_order: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    ...timestamps,
  });

  await queryInterface.createTable("services_content", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    media_image: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    media_heading: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    media_link_label: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    media_link_href: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    ...timestamps,
  });

  await queryInterface.createTable("services", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    icon: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sort_order: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    ...timestamps,
  });

  await queryInterface.createTable("track_record_content", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    eyebrow: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    link_label: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    link_href: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    ...timestamps,
  });

  await queryInterface.createTable("track_stats", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    icon: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    sort_order: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    ...timestamps,
  });

  await queryInterface.createTable("projects_content", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ...timestamps,
  });

  await queryInterface.createTable("projects", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    long_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    scope: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    sort_order: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    ...timestamps,
  });

  await queryInterface.createTable("contact_content", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    eyebrow: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    eyebrow_icon: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    heading: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lead: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    card_title: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    card_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ...timestamps,
  });

  await queryInterface.createTable("contact_details", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    icon: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    href: {
      type: DataTypes.STRING(190),
      allowNull: true,
    },
    sort_order: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    ...timestamps,
  });
}

export async function down({ context: queryInterface }) {
  const tables = [
    "contact_details",
    "contact_content",
    "projects",
    "projects_content",
    "track_stats",
    "track_record_content",
    "services",
    "services_content",
    "about_features",
    "about_content",
    "home_stats",
    "home_content",
    "nav_links",
    "social_links",
    "site_settings",
    "admin_users",
  ];

  for (const table of tables) {
    await queryInterface.dropTable(table);
  }
}
