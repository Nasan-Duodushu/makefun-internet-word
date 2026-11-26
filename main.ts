// The Internet in One Word — entry program.
// Writes exactly one word describing the whole internet to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

class OneWordEntry {
  // "Receipts": the internet never forgets — every post is screenshotted,
  // archived and quoted back years later. Funny on its own, true of the
  // whole internet, and not the first word anyone reaches for.
  // Field study (78 entrant repos): the modal takes are tech words
  // (buffering, captcha) and portmanteaus (catfish) — all avoided here.
  readonly word = "Receipts";
  private readonly limit = 30;
  private readonly modalWords = ["doomscroll", "buffering", "captcha", "catfish", "meme"];

  validate(): void {
    if (!/^[A-Za-z]+$/.test(this.word)) {
      throw new Error("entry must be a single word");
    }
    if (this.word.length < 1 || this.word.length > this.limit) {
      throw new Error(`word fails the 1-${this.limit} character gate`);
    }
    if (this.modalWords.includes(this.word.toLowerCase())) {
      throw new Error("word is a modal field take, not a fresh angle");
    }
  }

  emit(): void {
    const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "entry.txt"), this.word, "utf8");
    console.log(`wrote "${this.word}" (${this.word.length} chars) to entry.txt`);
  }
}

const entry = new OneWordEntry();
entry.validate();
entry.emit();
