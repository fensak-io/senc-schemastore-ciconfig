// Copyright (c) Fensak, LLC.
// SPDX-License-Identifier: MPL-2.0
//
// This contains a build script for generating a validation function based on a given jsonschema, using
// json-schema-to-typescript.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { compile } from "json-schema-to-typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function writeSchema(name, url, fname, patchSchema) {
  const resp = await fetch(url);
  let schema = await resp.json();

  // Update the id and title, since it is used to generate the base type.
  schema["$id"] = name;
  schema["title"] = name;
  schema = patchSchema(schema);

  const types = await compile(schema, name, {
    strictIndexSignatures: true,
  });
  fs.writeFileSync(path.join(__dirname, fname), types);
}

function patchCircleCISchema(sch) {
  // Set a title on the `logical` definition to workaround
  // https://github.com/bcherny/json-schema-to-typescript/issues/482
  sch.definitions.logical.title = "logical";
  return sch;
}

await writeSchema(
  "GitHubActionsWorkflowConfig",
  "https://json.schemastore.org/github-workflow.json",
  "github.d.ts",
  (sch) => sch,
);
await writeSchema(
  "CircleCIConfig",
  "https://json.schemastore.org/circleciconfig.json",
  "circleci.d.ts",
  patchCircleCISchema,
);
