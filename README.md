# atcoder-envs

atcoder-envs aims to run all of the languages available on AtCoder.

## Requirements

- Docker
- Deno (optional)

## Install (optional)

```
deno install --allow-read --allow-write --allow-run -n ae https://raw.githubusercontent.com/n4o847/atcoder-envs/master/cli/main.ts
```

You can change the `-n ae` part to install the executable with any name you like.

## Reinstall (optional)

```
deno install --allow-read --allow-write --allow-run -n ae -f https://raw.githubusercontent.com/n4o847/atcoder-envs/master/cli/main.ts
```

## Usage

```
docker run --rm -v `pwd`:/sandbox:ro -w /sandbox -i n4o847/atcoder-envs-4049 main.rb
```

Or if you have installed atcoder-envs

```
ae run main.rb --id 4049
```

You can omit the `--id` option if the extension is clear.

```
ae run main.rb
```

## Available languages

ID|Language
---|---
4009|Awk (GNU Awk 4.1.4)
4049|Ruby (2.7.1)
4066|Sed (4.4)
