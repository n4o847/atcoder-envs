import { assertEquals } from "https://deno.land/std@0.59.0/testing/asserts.ts";
import { envs } from "../config.ts";

for (const env of envs) {
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
          `./tests/assets/practice_1.${env.ext}`,
        ],
        stdin: "piped",
        stdout: "piped",
      });

      await p.stdin?.write(
        await Deno.readFile("./tests/assets/practice_1/sample-1.in"),
      );
      p.stdin?.close();

      const { code } = await p.status();
      assertEquals(code, 0);
      assertEquals(
        new TextDecoder().decode(await p.output()),
        await Deno.readTextFile("./tests/assets/practice_1/sample-1.out"),
      );
      p.close();
    },
  });
}
