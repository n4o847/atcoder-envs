import { assertEquals } from "https://deno.land/std@0.59.0/testing/asserts.ts";
import { envs } from "../config.ts";

type Env = typeof envs[0];

const idToEnv: { [id: string]: Env } = {};

for (const env of envs) {
  idToEnv[env.id] = env;
}

async function runTest(env: Env, task: string) {
  Deno.test({
    name: `${env.id}: ${env.name}`,
    async fn() {
      const p = Deno.run({
        cmd: [
          `docker`,
          `run`,
          `--rm`,
          `-v`,
          `${Deno.cwd()}:/sandbox:ro`,
          `-w`,
          `/sandbox`,
          `-i`,
          `n4o847/atcoder-envs-${env.id}`,
          `./tests/assets/${task}.${env.ext}`,
        ],
        stdin: "piped",
        stdout: "piped",
      });

      await p.stdin?.write(
        await Deno.readFile(`./tests/assets/${task}/sample-1.in`),
      );
      p.stdin?.close();

      const { code } = await p.status();
      assertEquals(code, 0);
      assertEquals(
        new TextDecoder().decode(await p.output()),
        await Deno.readTextFile(`./tests/assets/${task}/sample-1.out`),
      );
      p.close();
    },
  });
}

const testCases = [
  { id: "4008", task: "abc086_a" },
  { id: "4009", task: "practice_1" },
  { id: "4019", task: "abc086_a" },
  { id: "4042", task: "practice_1" },
  { id: "4049", task: "practice_1" },
  { id: "4066", task: "practice_1" },
];

for (const { id, task } of testCases) {
  runTest(idToEnv[id], task);
}
