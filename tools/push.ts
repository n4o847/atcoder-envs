// deno run --allow-all tools/push.ts

import { VERSION, envs } from "../config.ts";

for await (const env of envs) {
  console.log(`Pushing ${env.id}: ${env.name}`);
  for await (const tag of [VERSION, "latest"]) {
    const p = Deno.run({
      cmd: [
        `docker`,
        `push`,
        `n4o847/atcoder-envs-${env.id}:${tag}`,
      ],
    });
    await p.status();
  }
}
