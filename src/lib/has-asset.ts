import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Looks for `<baseRelativePath>.<ext>` (in order) under `public/` and returns
 * the first match as a public URL path, or null if none exist yet. Lets
 * sections render a real next/image once an asset is dropped in, and a
 * placeholder until then, with no code changes required either way.
 */
export function findPublicAsset(
  baseRelativePath: string,
  extensions: string[],
): string | null {
  for (const ext of extensions) {
    const relativePath = `${baseRelativePath}.${ext}`;
    if (existsSync(path.join(process.cwd(), "public", relativePath))) {
      return `/${relativePath}`;
    }
  }
  return null;
}
