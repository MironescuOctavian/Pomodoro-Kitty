import { t } from "@rimelight/i18n";
import { coatCatalog } from "./coats";

// Keep literal namespaces for i18n extraction; resolve only the requested catalog.
const catalogs = {
  food: () => t.raw("food"),
  coat: () => t.raw("coat"),
  accessory: () => t.raw("accessory"),
  medal: () => t.raw("medal"),
};
export function label(group: keyof typeof catalogs, key: string | number) {
  if (group === "coat") return coatCatalog[Number(key)]?.name ?? "";
  return (catalogs[group]() as Record<string, string> | undefined)?.[key] ?? "";
}
