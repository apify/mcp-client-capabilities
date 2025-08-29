install-dev:
	uv sync --dev

build:
	uv build

unit-tests:
	@echo "Unit tests moved to npm run test"