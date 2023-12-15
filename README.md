<h1 align="center">senc CI Configuration Types</h1>

<p align="center">
  <a href="https://github.com/fensak-io/senc-schemastore-ciconfig/blob/main/LICENSE">
    <img alt="LICENSE" src="https://img.shields.io/github/license/fensak-io/senc-schemastore-ciconfig?style=for-the-badge">
  </a>
  <a href="https://www.npmjs.com/package/@fensak-io/senc-schemastore-ciconfig">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/%40fensak-io%2Fsenc-schemastore-ciconfig?style=for-the-badge">
  </a>
  <a href="https://github.com/fensak-io/senc-schemastore-ciconfig/releases/latest">
    <img alt="latest release" src="https://img.shields.io/github/v/release/fensak-io/senc-schemastore-ciconfig?style=for-the-badge">
  </a>
</p>

`senc-schemastore-ciconfig` contains type definitions for various CI configurations so that you can generate CI
configuration files using [senc](https://github.com/fensak-io/senc).

## Types

The type definitions are auto generated from [jsonschema](https://json-schema.org/) defintions provided by
[SchemaStore](https://www.schemastore.org/json/) using the
[json-schema-to-typescript](https://github.com/bcherny/json-schema-to-typescript) utility.

The base types to use for the workflow configuration files are as follows:

- Circle CI: `CircleCIConfig`
- GitHub Actions: `GitHubActionsWorkflowConfig`


## Example usage

[Check out how `senc` uses this to maintain the CircleCI
configuration](https://github.com/fensak-io/senc/tree/main/_ci).


## Caveat on sub types

There may be situations where you may want to use the sub type in your TypeScript file. Unfortunately, since the types
are auto generated, the sub types may be named oddly (e.g., the json schema for GitHub Actions workflow files contains
repeated names for sub objects, leading to duplicate types with numbers, like `Types1` and `Types2` in
[github.d.ts](/github.d.ts)).

Additionally, the types may not be as rich as you expect due to the dynamic nature of the json config (e.g., use of
`patternAttributes` leads to very loose types).

For the best protection, it is recommended to validate the generated config with the raw json schema from SchemaStore.
