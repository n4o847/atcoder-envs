import { envs } from "../config.ts";

for await (const env of envs) {
  console.log(`Pushing ${env.id}: ${env.name}`);
  const p = Deno.run({
    cmd: [
      `docker`,
      `push`,
      `n4o847/atcoder-envs-${env.id}:latest`,
    ],
  });
  await p.status();
}
