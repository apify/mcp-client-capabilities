# MCP Client Capabilities

![NPM Version](https://img.shields.io/npm/v/mcp-client-capabilities)
![PyPI - Version](https://img.shields.io/pypi/v/mcp-client-capabilities)

This package strives to be the most up-to-date database of
all [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) clients and their capabilities,
to enable MCP servers understand what features an MCP client supports and how to respond to it
in order to provide the best user and agent experience. 
Unfortunately, the MCP protocol capability negotiation during the initial handshake
is not sufficient for that—see [Background](#background) bellow for details. 

In other words, this package is the programmatic version of
the [community MCP clients](https://modelcontextprotocol.io/clients#feature-support-matrix) table.


## How it works

This package provides a JSON file called `mcp-clients.json` that lists all known MCP clients, their metadata and capabilities.
It's a single JSON file to make it easy for multiple programming languages to access the data while enabling TypeScript type safety
for the NPM package.

The JSON file contains an object where keys are client names and values an object with information about the MCP client:

```typescript
{
  // Client name corresponds to `params.clientInfo.name` from the MCP client's `initialize` request, e.g. "ExampleClient"
  "<client-name>": {

    // Display name of the MCP client, e.g. "Example Client"
    title: string,
    
    // URL to the homepage of the client
    url: string,
    
    // Corresponds to `params.protocolVersion` from the MCP client's `initialize` request, e.g. "2024-11-05"
    protocolVersion: string,

    // Present if the client supports accessing server resources,
    // whether it can handle their dynamic changes, and whether it can subscribe to resource updates
    resources?: { listChanged?: boolean, subscribe?: boolean },

    // Present if the client supports accessing server prompts,
    // and whether it can handle their dynamic changes
    prompts?: { listChanged?: boolean },

    // Present if the client supports accessing server tools,
    // and whether it can handle their dynamic changes.        
    tools?: { listChanged?: boolean },

    // Present if the client supports elicitation from the server.    
    elicitation?: object,
    
    // Present if the client supports sampling from an LLM.
    sampling?: object,

    // Present if the client supports listing its roots,
    // and whether it can notify the server about their dynamic changes        
    roots?: { listChanged?: boolean },

    // Present if the client can handle server's argument autocompletion suggestions.         
    completions?: object,
    
    // Present if the client supports reading log messages from the server.        
    logging?: object,
  },
  "<client-name-2>": { ... },
  ...
}
```

Note that the client object is inspired by MCP's [`ClientCapabilites`](https://modelcontextprotocol.io/specification/2025-06-18/schema#clientcapabilities)
and [`ServerCapabilites`](https://modelcontextprotocol.io/specification/2025-06-18/schema#servercapabilities) objects,
and the respective field types are compatible. Additional fields might be added in the future.

**IMPORTANT**: MCP servers must always prioritize the information received from the MCP client's `initalize` request
via the `params.capabilities` field (of type
[`ClientCapabilites`](https://modelcontextprotocol.io/specification/2025-06-18/schema#clientcapabilities))
to the capabilities information provided by this package, as it will always be more accurate!

### Client versioning

For each unique client name, the JSON file contains just one record representing the information about the 
latest known publicly-available release.
This is under the assumption that most users will upgrade to the latest version of MCP clients,
especially if something doesn't work right.

The `protocolVersion` only serves as a crude check: **If the version received from the MCP client
doesn't match the version provided in the JSON file,
the MCP server should ignore any information provided by the JSON file, as it's clearly out of date.**

At this time, the package completely ignores the `clientInfo.version` field, because
the information about client versions and capabilities is very sparse, and
most clients don't use versions anyway. This might change in the future.

### Clients supported

<!-- MCP_CLIENTS_TABLE_START -->
| Display name | [Resources](#resources) | [Prompts](#prompts) | [Tools](#tools) | [Discovery](#discovery) | [Sampling](#sampling) | [Roots](#roots) | [Elicitation](#elicitation) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [Alpic](https://alpic.ai) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| [Amazon Q Developer CLI](https://github.com/aws/amazon-q-developer-cli) | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| [AmpCode](https://ampcode.com) | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| [Apify MCP Client](https://apify.com/jiri.spilka/tester-mcp-client) | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| [Arcade](https://arcade.dev) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| [Claude Code](https://claude.com/product/claude-code) | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| [Claude.ai](https://claude.ai) | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| [Cline](https://cline.bot/) | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| [Continue CLI Client](https://www.continue.dev/) | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| [Crush](https://github.com/charmbracelet/crush) | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ |
| [Cursor](https://cursor.com) | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| [Dust](https://dust.tt) | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| [Factory CLI](https://github.com/factory-ai/factory-cli) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| [Gemini CLI](https://geminicli.com/) | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| [GitGuardian](https://www.gitguardian.com) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| [GitHub Copilot CLI](https://github.com/features/copilot/cli) | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| [GitHub Copilot for Xcode](https://github.com/github/CopilotForXcode) | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| [Google Antigravity](https://antigravity.google) | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ |
| [Goose](https://block.github.io/goose) | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| [ChatGPT](https://chatgpt.com) | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| [Cherry Studio](https://www.cherry-ai.com) | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| [Jan AI](https://jan.ai) | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| [JetBrains AI Assistant](https://plugins.jetbrains.com/plugin/22282-jetbrains-ai-assistant) | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| [JetBrains AI Assistant with GitHub Copilot](https://plugins.jetbrains.com/plugin/22282-jetbrains-ai-assistant) | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| [Kilo Code](https://github.com/Kilo-Org/kilocode) | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| [LibreChat](https://www.librechat.ai) | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| [LobeHub](https://lobehub.com) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| [Make MCP Client](https://www.make.com) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| [Mistral AI: Le Chat](https://chat.mistral.ai) | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| [N8N MCP Client](https://n8n.io) | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| [OpenAI Codex](https://openai.com/codex) | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ |
| [Opencode](https://opencode.ai) | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| [Postman](https://postman.com/downloads) | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| [Raycast](https://www.raycast.com) | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| [Roo Code](https://roocode.com) | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| [Visual Studio Code](https://code.visualstudio.com) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Windsurf Editor](https://codeium.com/windsurf) | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| [Zed Editor](https://zed.dev) | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
<!-- MCP_CLIENTS_TABLE_END -->

### Column explanations

- <a name="resources"></a>**Resources**: Whether the client supports accessing server resources. Resources allow clients to browse and interact with files, databases, or other data provided by the MCP server.
- <a name="prompts"></a>**Prompts**: Whether the client supports accessing server prompts. Prompts are reusable prompt templates that can be invoked by clients to get structured responses from the server.
- <a name="tools"></a>**Tools**: Whether the client supports accessing server tools. Tools are functions that clients can invoke to perform actions on the server side.
- <a name="discovery"></a>**Discovery**: Whether the client supports dynamic tool discovery via `notifications/tools/list_changed` notifications. This allows tools to be added/removed while the connection is active.
- <a name="sampling"></a>**Sampling**: Whether the client supports sampling from an LLM. This allows the server to request the client to generate text using its language model.
- <a name="roots"></a>**Roots**: Whether the client supports managing root directories. Roots define the workspace or directories that the client wants the server to have access to.
- <a name="elicitation"></a>**Elicitation**: Whether the client supports elicitation from the server. This allows the server to request additional information or clarification from the client during interactions.

## Usage

### Node.js

Install the [NPM package](https://www.npmjs.com/package/mcp-client-capabilities) by running:

```bash
npm install mcp-client-capabilities
```

#### TypeScript example

```typescript
import { mcpClients } from 'mcp-client-capabilities';

const claudeClient = mcpClients['claude-ai'];
console.log('Claude AI metadata and capabilities:', claudeClient);
console.log('Display name:', claudeClient.title);

// List all available clients
console.log('Available clients:', Object.keys(mcpClients));
```

#### JavaScript example

```javascript
const { mcpClients } = require('mcp-client-capabilities');

const claudeClient = mcpClients['claude-ai'];
console.log('Claude AI metadata and capabilities:', claudeClient);
console.log('Display name:', claudeClient.title);

// List all available clients
console.log('Available clients:', Object.keys(mcpClients));
```

### Python

Install the [PyPI package](https://pypi.org/project/mcp-client-capabilities/) by running:

```bash
pip install mcp-client-capabilities
```

#### Python example

```python
from mcp_client_capabilities import mcp_clients

claude_client = mcp_clients['claude-ai']
print('Claude AI metadata and capabilities:', claude_client)
print('Display name:', claude_client['title'])

# List all available clients
print('Available clients:', mcp_clients.keys())
```

### Other languages

You can fetch the raw `mcp-clients.json` file from the following URL:

https://raw.githubusercontent.com/apify/mcp-client-capabilities/refs/heads/master/src/mcp_client_capabilities/mcp-clients.json


## Background

When the MCP client [connects](https://modelcontextprotocol.io/specification/2025-06-18/basic/lifecycle) to an MCP server,
it must send it an `initialize` request such as:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-11-05",
    "capabilities": {
      "roots": { "listChanged": true },
      "sampling": {},
      "elicitation": {}
    },
    "clientInfo": {
      "name": "ExampleClient",
      "title": "Example Client Display Name",
      "version": "1.0.0"
    }
  }
}
```

The MCP server must then respond with a message like:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "protocolVersion": "2024-11-05",
    "capabilities": {
      "logging": {},
      "prompts": { "listChanged": true },
      "resources": { "subscribe": true, "listChanged": true },
      "tools": { "listChanged": true }
    },
    "serverInfo": {
      "name": "ExampleServer",
      "title": "Example Server Display Name",
      "version": "1.0.0"
    },
    "instructions": "Optional instructions for the client"
  }
}
```

Unfortunately, this [capability negotiation](https://modelcontextprotocol.io/specification/2025-06-18/architecture#capability-negotiation)
is not sufficient for MCP servers to fully understand what features a client supports.
For example, the server will not know if the client supports dynamic tool discovery via the `notifications/tools/list_changed` notification,
or whether it applies the initial server `instructions` to the model context. But this information is crucial for servers to
understand what interface they can provide to clients, e.g. whether they should provide alternative tools for dynamic discovery and calling,
or stuff the instructions into the tool descriptions instead.

This limitation of MCP leads to the "lowest common denominator" approach, where servers adopt only basic MCP
features they can be certain most clients support. Ultimately this leads to the stagnation of the MCP protocol,
where neither servers nor clients have motivation to adopt latest protocol features.

While there are MCP standard proposals such as [SEP-1381](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1381)
to address this problem on the protocol level, these will take time to be approved and widely adopted by MCP clients.
Therefore, we're releasing this package with a hope to accelerate the development of the MCP ecosystem.


## Contributors

We highly appreciate community contributions to make the list of MCP clients and their capabilities
complete and up to date. To add a new client or updated an existing one, simply edit the `src/mcp-clients.json` file
and submit a pull request:

- The pull request should contain some evidence to back up the existence of the MCP client capabilities, e.g. screenshot
  from usage, link to its source code, or official docs.
- Ideally, add or update just one MCP client per pull request, to make this more manageable.
- Keep the clients in alphabetical order by their name.

Thanks to [Alpic](https://alpic.ai) for contributing the list of clients from their logs.

### Development

The build process includes validation to ensure the JSON matches the TypeScript interfaces.

```bash
# Validate the JSON file structure
npm run test

# Build the project (includes validation)
npm run build

# Run example
npm run example
```

### Retrieving client information

To easily retrieve the client name and version from an MCP initialize request for adding or updating client capabilities, you can use a simple setup with netcat and ngrok:

1. Spawn a netcat listener: `nc -lvp 3001`
2. Expose it to the internet via ngrok: `ngrok http 3001`
3. Run the MCP client and connect to your ngrok URL

In the netcat terminal, you will see the `initialize` request containing the client's information, such as:

```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "method": "initialize",
  "params": {
    "protocolVersion": "2025-06-18",
    "capabilities": {
      "sampling": {},
      "elicitation": {},
      "roots": { "listChanged": true }
    },
    "clientInfo": {
      "name": "mcp-inspector",
      "version": "0.16.5"
    }
  }
}
```

### API

#### Types

- `McpClientRecord` - Complete capability set for an MCP client with mandatory `title` and `url` fields
- `ClientsIndex` - Type for the clients object structure

#### Exports

- `mcpClients` - Object containing all client capabilities indexed by client name
- All TypeScript interfaces from `types.ts`

### Future work

- Add all clients from https://modelcontextprotocol.io/clients#feature-support-matrix with accurate details
- Add SDK for Python
- Create a public testing MCP server to probe the client capabilities
