# Release

Package publishing is handled from the `eterna-ai` monorepo.

The release workflow is intentionally manual while the repository migration settles.

## Published Packages

| Package | Workspace | Current version |
| --- | --- | --- |
| `@eterna-hybrid-exchange/cli` | `packages/cli` | `0.3.0` |
| `@eterna-hybrid-exchange/openclaw-plugin` | `packages/openclaw-plugin` | `0.3.0` |
| `@eterna-hybrid-exchange/eterna-trading-skill` | `packages/openclaw-plugin/packages/skill` | `0.3.0` |

All three package versions must stay aligned.

```bash
npm run version:check
```

## Release Workflow

Manual workflow:

```text
.github/workflows/release.yml
```

The workflow runs:

```bash
npm ci
npm run verify
```

Then publishes each package with npm provenance:

```bash
npm publish --provenance --access public --tag "$NPM_TAG" -w @eterna-hybrid-exchange/cli
npm publish --provenance --access public --tag "$NPM_TAG" -w @eterna-hybrid-exchange/openclaw-plugin
npm publish --provenance --access public --tag "$NPM_TAG" -w @eterna-hybrid-exchange/eterna-trading-skill
```

The workflow requires `confirm_publish` to be exactly:

```text
publish
```

## npm Trusted Publisher Setup

Configure npm trusted publishing for each package:

| npm package | GitHub repository | Workflow |
| --- | --- | --- |
| `@eterna-hybrid-exchange/cli` | `EternaHybridExchange/eterna-ai` | `release.yml` |
| `@eterna-hybrid-exchange/openclaw-plugin` | `EternaHybridExchange/eterna-ai` | `release.yml` |
| `@eterna-hybrid-exchange/eterna-trading-skill` | `EternaHybridExchange/eterna-ai` | `release.yml` |

The workflow uses:

```yaml
permissions:
  contents: read
  id-token: write
```

No `NPM_TOKEN` should be required once trusted publishing is configured.

## Manual Release Checklist

Before running the release workflow:

1. Confirm package versions are aligned.
2. Confirm `CHANGELOG.md` files are updated if needed.
3. Run `npm run verify` locally.
4. Confirm CI is green on the release branch.
5. Confirm npm trusted publisher settings point to `EternaHybridExchange/eterna-ai` and `release.yml`.
6. Trigger the workflow manually.
7. Select the npm dist-tag: `latest`, `next`, or `beta`.
8. Enter `publish` in `confirm_publish`.

## Version Updates

For now, update package versions manually in:

```text
packages/cli/package.json
packages/openclaw-plugin/package.json
packages/openclaw-plugin/packages/skill/package.json
```

Then run:

```bash
npm install
npm run version:check
npm run verify
```

## Future Automation

Tag-based release or release-please automation can be added after manual publishing is proven from the monorepo.
