# MCP Client Capabilities

An index of all Model Context Protocol (MCP) server capabilities, providing TypeScript interfaces and a simple object structure for accessing client capabilities.

## Overview

This package provides a simple way to access MCP (Model Context Protocol) client capabilities. All client capabilities are stored in a single `clients.json` file, making it easy for multiple programming languages to access the data while maintaining TypeScript type safety.

## Structure

The capabilities structure follows this format:

```typescript
{
  '{client name}': {
    completions?: {};
    experimental?: { [key: string]: object };
    logging?: {};
    prompts?: { listChanged?: boolean };
    resources?: { listChanged?: boolean; subscribe?: boolean };
    tools?: { listChanged?: boolean };
  }
}
```

## Adding New Clients

To add a new client, simply edit the `src/clients.json` file:

```json
{
  "claude-desktop": {
    "prompts": {},
    "resources": {},
    "tools": {}
  },
  "my-client": {
    "prompts": { "listChanged": true },
    "tools": { "listChanged": true }
  }
}
```

The build process includes validation to ensure the JSON matches the TypeScript interfaces.

## Installation

```bash
npm install mcp-client-capabilities
```

## Development

```bash
# Validate the JSON structure
npm run validate

# Build the project (includes validation)
npm run build

# Run example
npm run example
```

## Usage

```typescript
import { clients } from 'mcp-client-capabilities';

// Access Claude Desktop capabilities
const claudeDesktopCaps = clients['claude-desktop'];
console.log(claudeDesktopCaps);

// Check if a client supports specific features
if (claudeDesktopCaps.tools?.listChanged) {
  console.log('Claude Desktop supports tools list changes');
}

// List all available clients
console.log('Available clients:', Object.keys(clients));
```

## Multi-Language Support

Since the capabilities are stored in JSON format, other programming languages can easily parse the `src/clients.json` file directly:

### Python Example
```python
import json

with open('src/clients.json', 'r') as f:
    clients = json.load(f)

claude_caps = clients['claude-desktop']
print(f"Claude Desktop capabilities: {claude_caps}")
```

### JavaScript (Node.js) Example
```javascript
const clients = require('./src/clients.json');

const claudeCaps = clients['claude-desktop'];
console.log('Claude Desktop capabilities:', claudeCaps);
```

## API

### Types

- `MCPClientCapabilities` - Complete capability set for an MCP client
- `CompletionsCapability` - Completions capability (empty object)
- `ExperimentalCapability` - Experimental capabilities (key-value pairs)
- `LoggingCapability` - Logging capability (empty object)
- `PromptsCapability` - Prompts capability with optional `listChanged`
- `ResourcesCapability` - Resources capability with optional `listChanged` and `subscribe`
- `ToolsCapability` - Tools capability with optional `listChanged`
- `ClientsIndex` - Type for the clients object structure

### Exports

- `clients` - Object containing all client capabilities indexed by client name
- All TypeScript interfaces from `types.ts`

## Validation

The project includes automatic validation to ensure the JSON structure matches the TypeScript interfaces. Run `npm run validate` to check the JSON file, or `npm run build` which includes validation as part of the build process.
