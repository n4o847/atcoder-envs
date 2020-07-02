const envs = [
  {
    id: "4009",
    name: "Awk (GNU Awk 4.1.4)",
  },
  {
    id: "4049",
    name: "Ruby (2.7.1)",
  },
];

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
