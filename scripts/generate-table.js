const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../src/mcp_client_capabilities/mcp-clients.json');
const readmePath = path.join(__dirname, '../README.md');

const clients = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Generate table content (header + rows)
const tableHeader = `| Display name | Client name | [Resources](#resources) | [Prompts](#prompts) | [Tools](#tools) | [Discovery](#discovery) | [Sampling](#sampling) | [Roots](#roots) | [Elicitation](#elicitation) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |`;
const tableRows = Object.entries(clients)
  .sort(([, a], [, b]) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
  .map(([clientName, clientData]) => {
    const displayName = `[${clientData.title}](${clientData.url})`;
    const resources = clientData.resources ? '✅' : '❌';
    const prompts = clientData.prompts ? '✅' : '❌';
    const tools = clientData.tools ? '✅' : '❌';
    const discovery = clientData.tools?.listChanged ? '✅' : '❌';
    const sampling = clientData.sampling ? '✅' : '❌';
    const roots = clientData.roots ? '✅' : '❌';
    const elicitation = clientData.elicitation ? '✅' : '❌';

    return `| ${displayName} | ${clientName} | ${resources} | ${prompts} | ${tools} | ${discovery} | ${sampling} | ${roots} | ${elicitation} |`;
  }).join('\n');

const fullTable = `${tableHeader}\n${tableRows}`;

// Read README and replace between markers
let readme = fs.readFileSync(readmePath, 'utf8');
const tablePattern = /<!-- MCP_CLIENTS_TABLE_START -->[\s\S]*?<!-- MCP_CLIENTS_TABLE_END -->/;
const replacement = `<!-- MCP_CLIENTS_TABLE_START -->\n${fullTable}\n<!-- MCP_CLIENTS_TABLE_END -->`;
readme = readme.replace(tablePattern, replacement);

fs.writeFileSync(readmePath, readme);
console.log('README table updated successfully');