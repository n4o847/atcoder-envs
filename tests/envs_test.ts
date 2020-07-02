import { assertEquals } from "https://deno.land/std@0.59.0/testing/asserts.ts";

const targets = [
  {
    id: "4009",
    name: "Awk (GNU Awk 4.1.4)",
    ext: "awk",
  },
  {
    id: "4049",
    name: "Ruby (2.7.1)",
    ext: "rb",
  },
];

for (const target of targets) {
  Deno.test({
    name: `${target.id}: ${target.name}`,
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
          `n4o847/atcoder-envs-${target.id}`,
          `./tests/assets/practice_1.${target.ext}`,
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
        await p.output(),
        await Deno.readFile("./tests/assets/practice_1/sample-1.out"),
      );
      p.close();
    },
  });
}
