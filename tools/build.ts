import { envs } from "../config.ts";

for await (const env of envs) {
  console.log(`Building ${env.id}: ${env.name}`);
  const p = Deno.run({
    cmd: [
      `docker`,
      `build`,
      `-t`,
      `n4o847/atcoder-envs-${env.id}:latest`,
      `./envs/${env.id}`,
    ],
  });
  await p.status();
}
