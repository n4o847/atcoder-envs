// deno run --allow-all tools/build.ts

import { VERSION, envs } from "../config.ts";

for await (const env of envs) {
  console.log(`Building ${env.id}: ${env.name}`);
  for await (const tag of [VERSION, "latest"]) {
    const p = Deno.run({
      cmd: [
        `docker`,
        `build`,
        `-t`,
        `n4o847/atcoder-envs-${env.id}:${tag}`,
        `./envs/${env.id}`,
      ],
    });
    await p.status();
  }
}
