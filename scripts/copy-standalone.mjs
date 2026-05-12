import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const standaloneDir = join(root, ".next", "standalone");

if (!existsSync(standaloneDir)) {
  process.exit(0);
}

mkdirSync(join(standaloneDir, ".next"), { recursive: true });

const copies = [
  [join(root, ".next", "static"), join(standaloneDir, ".next", "static")],
  [join(root, "public"), join(standaloneDir, "public")],
];

for (const [from, to] of copies) {
  if (existsSync(from)) {
    cpSync(from, to, { recursive: true, force: true });
  }
}
