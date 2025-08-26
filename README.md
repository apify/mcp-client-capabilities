# MCP Client Capabilities

An index of all Model Context Protocol (MCP) server capabilities, providing TypeScript interfaces and a simple object structure for accessing client capabilities.

## Overview

This package provides a simple way to access MCP (Model Context Protocol) client capabilities. Each client has its own file in the `clients/` directory, and all capabilities are exported through a single `clients` object.

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

To add a new client:

1. Create a new file in `src/clients/` (e.g., `my-client.ts`)
2. Export the capabilities object:

```typescript
import { MCPClientCapabilities } from '../types';

const myClientCapabilities: MCPClientCapabilities = {
  prompts: { listChanged: true },
  tools: { listChanged: true }
};

export default myClientCapabilities;
```

3. Import and add it to the `clients` object in `src/index.ts`:

```typescript
import myClient from './clients/my-client';

export const clients = {
  'claude-desktop': claudeDesktop,
  'my-client': myClient,
};
```

## Installation

```bash
npm install mcp-client-capabilities
```

## Development

```bash
# Build the project
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

## API

### Types

- `MCPClientCapabilities` - Complete capability set for an MCP client
- `CompletionsCapability` - Completions capability (empty object)
- `ExperimentalCapability` - Experimental capabilities (key-value pairs)
- `LoggingCapability` - Logging capability (empty object)
- `PromptsCapability` - Prompts capability with optional `listChanged`
- `ResourcesCapability` - Resources capability with optional `listChanged` and `subscribe`
- `ToolsCapability` - Tools capability with optional `listChanged`

### Exports

- `clients` - Object containing all client capabilities indexed by client name
- All TypeScript interfaces from `types.ts`
