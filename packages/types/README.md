# personal-types

A shared TypeScript types package for the Tradlets project, providing common type definitions and interfaces used across different Tradlets applications and services.

## Features

- Common TypeScript type definitions
- Built with [@sinclair/typebox](https://github.com/sinclairzx81/typebox) for runtime type validation
- Type-safe interfaces for Tradlets applications

## Installation

This package is intended to be used as a dependency in other Tradlets projects. Install it using pnpm:

```bash
pnpm add @tradlets/types
```

## Usage

Import types from the package:

```typescript
import { YourType } from 'personal-types'
```

## Development

### Prerequisites

- bun
- pnpm

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Scripts

- `pnpm dev` - Start development mode with watch
- `pnpm dev:tsc` - Watch TypeScript compilation

### Commit Messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/) specification. Commit messages should be formatted as follows:

```
type(scope): subject

body

footer
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

### Changelog

This project maintains a [CHANGELOG.md](CHANGELOG.md) file following the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format. The changelog is automatically updated when:

1. Creating a new version with `pnpm version <major|minor|patch>`
2. The changes will be automatically committed and tagged
3. Tags will be pushed to the repository

### Release Process

This project follows semantic versioning (MAJOR.MINOR.PATCH):

- **Major** (X.0.0): Breaking changes
  - Incompatible API changes
  - Major rewrites
  - Deprecated feature removal

- **Minor** (0.X.0): New features
  - Backwards-compatible functionality
  - New API endpoints
  - New components/modules

- **Patch** (0.0.X): Bug fixes
  - Backwards-compatible bug fixes
  - Performance improvements
  - Minor enhancements

#### Pre-release Checklist
1. Ensure all changes are committed
2. Verify tests pass
3. Check for linting issues
4. Review unreleased changes in CHANGELOG.md
5. Determine version bump type

#### Creating a Release
1. Update version:
   ```bash
   # For automatic version bump
   pnpm version major|minor|patch

   # For specific version
   pnpm version 0.2.0
   ```

2. The following will happen automatically:
   - Version will be updated in package.json
   - CHANGELOG.md will be updated with release date
   - Changes will be committed
   - Git tag will be created
   - Changes and tags will be pushed

#### Post-release
1. Verify package publication
2. Update dependent packages if needed
3. Clear cache if necessary

## Contributing

1. Ensure you have the required dependencies installed
2. Make your changes
3. Submit a pull request

## License

MIT
