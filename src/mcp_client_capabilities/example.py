"""
Simple example of using the MCP Client Capabilities index
"""

import json

from . import mcp_clients

print("=== MCP Client Capabilities ===\n")

# Access Claude Desktop capabilities directly
print("Claude Desktop capabilities:")
print(json.dumps(mcp_clients["claude-desktop"], indent=2))
print()

# List all available clients
print("Available clients:", list(mcp_clients.keys()))
print()

# Check specific capabilities
claude_desktop = mcp_clients.get("claude-desktop")
if claude_desktop:
    if claude_desktop.get("prompts", {}).get("list_changed"):
        print("✓ Claude Desktop supports prompts list change notifications")
    else:
        print("✗ Claude Desktop does not support prompts list change notifications")

    if claude_desktop.get("resources", {}).get("subscribe"):
        print("✓ Claude Desktop supports resource subscriptions")
    else:
        print("✗ Claude Desktop does not support resource subscriptions")

    if claude_desktop.get("tools", {}).get("list_changed"):
        print("✓ Claude Desktop supports tools list change notifications")
    else:
        print("✗ Claude Desktop does not support tools list change notifications")
else:
    print("❌ Claude Desktop client not found")