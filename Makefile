install-dev:
	uv sync --dev

build:
	uv build

unit-tests:
	uv run python src/mcp_client_capabilities/validate.py