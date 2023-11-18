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

const resp = await fetch("https://json.schemastore.org/github-workflow.json");
const schema = await resp.json();

// Update the id, since it is used to generate the base type.
schema["$id"] = "GitHubActionsWorkflowConfig";

const types = await compile(schema, "GitHubActionsWorkflowConfig", {
  strictIndexSignatures: true,
});
fs.writeFileSync(path.join(__dirname, "index.d.ts"), types);
