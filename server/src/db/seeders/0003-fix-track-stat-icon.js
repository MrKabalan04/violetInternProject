import { TrackStat } from "../../models/index.js";

export async function up() {
  await TrackStat.update(
    { icon: "bi-person-fill-gear" },
    { where: { icon: "bi-hard-hat-fill" } }
  );
}

export async function down() {
  await TrackStat.update(
    { icon: "bi-hard-hat-fill" },
    {
      where: {
        value: "200+",
        label: "Skilled Workers",
        icon: "bi-person-fill-gear",
      },
    }
  );
}
