import lessToJs from "less-vars-to-js";
import fs from "fs";

import * as prettier from "prettier";

const LESS_FILE_PATH = "src/assets/styles/_variables.less";

/** Convert string from `kebab-case` to `camelCase` */
function camelize(s) {
  return s.replace(/-./g, x => x[1].toUpperCase());
}

/**
 * The function parses the variables from a less file, converts their names to camel case,
 * and writes the formatted code (with Prettier) to a TypeScript file.
 */
async function parseLessVariables() {
  const lessText = fs.readFileSync(LESS_FILE_PATH, "utf8");

  const parsedVars = lessToJs(lessText, {
    resolveVariables: true,
    stripPrefix: true
  });

  const variables = {};

  for (const [key, value] of Object.entries(parsedVars)) {
    variables[camelize(key)] = value;
  }

  // Format with Prettier
  const formattedCode = await prettier.format(
    `export default ${JSON.stringify(variables)} as const;`,
    { parser: "typescript", trailingComma: "none" }
  );

  fs.writeFileSync("src/variables.ts", formattedCode);
}

try {
  if (process.argv.includes("--watch")) {
    console.log(`Started watching \`${LESS_FILE_PATH}\` file...`);
    fs.watchFile(LESS_FILE_PATH, async () => await parseLessVariables());
  } else {
    await parseLessVariables();
    console.log(`Less variables has been parsed from \`${LESS_FILE_PATH}\``);
  }
} catch (e) {
  console.log(e);
}
