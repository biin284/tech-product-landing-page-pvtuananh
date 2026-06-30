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

/**
 * Looks for `<baseRelativePath>-1.<ext>`, `-2`, ... up to `maxCount` and
 * returns whichever exist, in order. Used by the gallery section so adding
 * gallery-1.png, gallery-2.png, etc. to public/ is all it takes to populate
 * the variant switcher — no code changes.
 */
export function findPublicAssetSequence(
  baseRelativePath: string,
  extensions: string[],
  maxCount: number,
): string[] {
  const found: string[] = [];
  for (let index = 1; index <= maxCount; index += 1) {
    const asset = findPublicAsset(`${baseRelativePath}-${index}`, extensions);
    if (asset) found.push(asset);
  }
  return found;
}
