export function slugify(text: string): string {
  return text
    .toLowerCase()                    // Convert to lowercase
    .trim()                           // Remove leading/trailing whitespace
    .replace(/[\s\W-]+/g, '-')        // Replace spaces and non-word characters with a single dash
    .replace(/^-+|-+$/g, '');         // Remove leading/trailing dashes
}