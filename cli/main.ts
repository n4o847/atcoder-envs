import { parse } from "https://deno.land/std@0.59.0/flags/mod.ts";
import {
  join,
  basename,
  extname,
} from "https://deno.land/std@0.59.0/path/mod.ts";
import { EOL, format } from "https://deno.land/std@0.59.0/fs/eol.ts";
import { envs } from "../config.ts";

const TEMP_DIR_PREFIX = "atcoder-envs-";

function detectId(path: string): string | null {
  const ext = extname(path);
  for (const env of envs) {
    if (ext === `.${env.ext}`) return env.id;
  }
  return null;
}

interface RunOptions {
  id?: string;
}

async function run(
  path: string,
  options?: RunOptions,
): Promise<Deno.ProcessStatus> {
  const id = options?.id ?? detectId(path);
  if (id === undefined || id === null) {
    throw new Error(`Could not detect language ID.`);
  }
  if (!envs.some((env) => id === env.id)) {
    throw new Error(`Language ID ${id} does not exist.`);
  }
  const content = await Deno.readTextFile(path);
  const tempDir = await Deno.makeTempDir({ prefix: TEMP_DIR_PREFIX });
  const tempFile = basename(path);
  await Deno.writeTextFile(join(tempDir, tempFile), format(content, EOL.LF));
  const p = Deno.run({
    cmd: [
      `docker`,
      `run`,
      `--rm`,
      `-v`,
      `${tempDir}:/sandbox:ro`,
      `-w`,
      `/sandbox`,
      `-i`,
      `n4o847/atcoder-envs-${id}`,
      `${tempFile}`,
    ],
  });
  const status = await p.status();
  await Deno.remove(tempDir, { recursive: true });
  return status;
}

async function main(args: string[]) {
  const parsedArgs = parse(args, { string: ["_", "id"] });
  const command = parsedArgs._[0];
  switch (command) {
    case "run": {
      const path = parsedArgs._[1];
      const id = parsedArgs.id;
      if (typeof path === "string") {
        await run(path, { id });
      } else {
        throw new Error(`Path is not specified.`);
      }
      break;
    }
    case undefined: {
      throw new Error(`Command is not specified.`);
    }
    default: {
      throw new Error(`Command ${command} does not exist.`);
    }
  }
}

if (import.meta.main) {
  main(Deno.args).catch((reason) => {
    console.error(reason);
    Deno.exit(1);
  });
}
