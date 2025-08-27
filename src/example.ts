/**
 * Simple example of using the MCP Client Capabilities index
 */

import { mcpClients } from './index';

console.log('=== MCP Client Capabilities ===\n');

// Access Claude Desktop capabilities directly
console.log('Claude Desktop capabilities:');
console.log(JSON.stringify(mcpClients['claude-desktop'], null, 2));
console.log();

// List all available clients
console.log('Available clients:', Object.keys(mcpClients));
console.log();

// Check specific capabilities
const claudeDesktop = mcpClients['claude-desktop'];
if (claudeDesktop) {
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
} else {
  console.log('❌ Claude Desktop client not found');
}
