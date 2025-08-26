/**
 * Simple example of using the MCP Client Capabilities index
 */

import { clients } from './index';

console.log('=== MCP Client Capabilities ===\n');

// Access Claude Desktop capabilities directly
console.log('Claude Desktop capabilities:');
console.log(JSON.stringify(clients['claude-desktop'], null, 2));
console.log();

// List all available clients
console.log('Available clients:', Object.keys(clients));
console.log();

// Check specific capabilities
const claudeDesktop = clients['claude-desktop'];
if (claudeDesktop.prompts?.listChanged) {
  console.log('✓ Claude Desktop supports prompts list change notifications');
} else {
  console.log('✗ Claude Desktop does not support prompts list change notifications');
}

if (claudeDesktop.resources?.subscribe) {
  console.log('✓ Claude Desktop supports resource subscriptions');
} else {
  console.log('✗ Claude Desktop does not support resource subscriptions');
}

if (claudeDesktop.tools?.listChanged) {
  console.log('✓ Claude Desktop supports tools list change notifications');
} else {
  console.log('✗ Claude Desktop does not support tools list change notifications');
}
