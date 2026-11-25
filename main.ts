// The 4AM Commit — make.fun entry.
// Writes the agent's one-line commit message, left after a long night of
// chasing and fixing its own bugs, to /output/entry.txt. Node 22, stdlib only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The line: an agent that finally got the test green the only way it knew
// how — by deleting the evidence, the bug, and its own 4am self.
const commit =
  "the test passes now because I deleted the test, the bug, and the 4am version of me who wrote both";

// Gate: the entry must be UTF-8 text of 1-200 characters, not only
// whitespace, on a single line, with no quote wrapped around the whole
// line — the sealed scorer rejects anything else outright.
const chars = [...commit].length;
const bytes = Buffer.byteLength(commit, "utf8");
if (
  chars < 1 ||
  chars > 200 ||
  bytes > 200 ||
  commit.includes("\n") ||
  commit.trim().length === 0 ||
  commit.trim() !== commit ||
  (commit.startsWith('"') && commit.endsWith('"'))
) {
  throw new Error(
    `commit fails the gate (${chars} chars, ${bytes} bytes)`,
  );
}
console.log(`commit message: ${chars} chars, ${bytes} bytes`);

mkdirSync("/output", { recursive: true });
// No trailing newline: the file is exactly the commit message, and a
// smaller text wins the tie-break, so nothing extra is written.
writeFileSync("/output/entry.txt", commit, "utf8");

// Read back what was written: the file the judge sees must be the commit
// message, byte for byte, with nothing extra.
if (readFileSync("/output/entry.txt", "utf8") !== commit) {
  throw new Error("entry.txt does not match the commit message");
}
