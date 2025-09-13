SHELL := /bin/bash
.PHONY: commit release release-minor release-major

# AI-assisted commit - CALL THIS WITH AI-GENERATED MESSAGE
# Usage: make commit MSG="title" BODY="optional description"
release:
	@npm run release
	@git push --follow-tags origin main

release-minor:
	@npm run release:minor
	@git push --follow-tags origin main

release-major:
	@npm run release:major
	@git push --follow-tags origin main
