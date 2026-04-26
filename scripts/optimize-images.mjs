// Recompress oversized JPEGs in /public/images to ~1920px wide, q80 mozjpeg.
// Pre-shrinks source files so Next.js's image optimizer cold-cache transcoding
// is fast and the original-on-disk weight is reasonable.
//
// Usage:  node scripts/optimize-images.mjs [--dry] [--threshold=400]
//   --dry              Report what would change, write nothing.
//   --threshold=N      Minimum size in KB to compress (default: 400).

import { readdir, stat, copyFile } from "node:fs/promises";
import { resolve, join, extname, basename } from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const THRESHOLD_KB = Number(
  args.find((a) => a.startsWith("--threshold="))?.split("=")[1] ?? 400
);
const ROOT = resolve(process.cwd(), "public/images");
const MAX_WIDTH = 1920;
const QUALITY = 80;

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else {
      yield fullPath;
    }
  }
}

function isJpeg(file) {
  const ext = extname(file).toLowerCase();
  return ext === ".jpg" || ext === ".jpeg";
}

async function main() {
  const candidates = [];
  for await (const file of walk(ROOT)) {
    if (!isJpeg(file)) continue;
    const stats = await stat(file);
    const sizeKb = stats.size / 1024;
    if (sizeKb >= THRESHOLD_KB) {
      candidates.push({ file, sizeKb });
    }
  }

  candidates.sort((a, b) => b.sizeKb - a.sizeKb);

  if (candidates.length === 0) {
    console.log(`No JPEGs over ${THRESHOLD_KB} KB found.`);
    return;
  }

  console.log(
    `Found ${candidates.length} JPEG(s) over ${THRESHOLD_KB} KB. Mode: ${
      DRY ? "DRY RUN" : "WRITE"
    }`
  );
  console.log("");

  let totalBefore = 0;
  let totalAfter = 0;
  let processed = 0;
  let skipped = 0;

  for (const { file, sizeKb } of candidates) {
    try {
      const buffer = await sharp(file)
        .rotate()
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toBuffer();
      const newKb = buffer.length / 1024;
      const savedKb = sizeKb - newKb;
      const savedPct = (savedKb / sizeKb) * 100;
      totalBefore += sizeKb;
      totalAfter += newKb;

      if (savedPct < 5) {
        console.log(
          `  skip   ${basename(file).padEnd(34)} ${sizeKb
            .toFixed(0)
            .padStart(6)} KB  (would save only ${savedPct.toFixed(1)}%)`
        );
        skipped++;
        continue;
      }

      console.log(
        `  ${DRY ? "[dry] " : "write "}${basename(file).padEnd(34)} ${sizeKb
          .toFixed(0)
          .padStart(6)} KB  →  ${newKb.toFixed(0).padStart(6)} KB  (-${savedPct.toFixed(
          1
        )}%)`
      );

      if (!DRY) {
        await copyFile(file, `${file}.bak`);
        await sharp(buffer).toFile(file);
      }
      processed++;
    } catch (err) {
      console.error(`  error  ${basename(file)}: ${err.message}`);
    }
  }

  const totalSavedKb = totalBefore - totalAfter;
  const totalSavedPct = (totalSavedKb / totalBefore) * 100;
  console.log("");
  console.log(
    `Summary: ${processed} processed, ${skipped} skipped. ${totalSavedKb.toFixed(
      0
    )} KB saved (${totalSavedPct.toFixed(1)}% of total). ${
      DRY ? "(dry run — nothing written)" : ""
    }`
  );
  if (!DRY && processed > 0) {
    console.log(
      "Originals saved as *.bak. Verify the result, then delete with:"
    );
    console.log("  find public/images -name '*.bak' -delete");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
