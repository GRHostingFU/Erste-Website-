/**
 * Wandelt eine formatierte Telefonnummer in einen gültigen `tel:`-Link.
 *
 * @example toTelHref("+49 (0)30 123 456") // → "tel:+49030123456"
 */
export function toTelHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** Erzeugt einen `mailto:`-Link. */
export function toMailHref(email: string): string {
  return `mailto:${email}`;
}

/**
 * Erzeugt aus beliebigem Text einen URL- und ID-tauglichen Slug.
 * Deutsche Umlaute werden lesbar transliteriert statt ersatzlos entfernt.
 *
 * @example slugify("Pflegegrad & Höherstufung") // → "pflegegrad-hoeherstufung"
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replaceAll("ä", "ae")
    .replaceAll("ö", "oe")
    .replaceAll("ü", "ue")
    .replaceAll("ß", "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Normalisiert einen Pfad auf die Form `/pfad` (ohne abschließenden Slash). */
export function normalizePath(path: string): string {
  const trimmed = path.replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}` : "/";
}
