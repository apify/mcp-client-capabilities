/**
 * MCP Client Capabilities Index
 * 
 * Simple index of all MCP client capabilities imported from individual client files.
 */

export * from './types';

// Import all client capabilities
import claudeDesktopCapabilities from './clients/claude-desktop';

/**
 * All MCP client capabilities indexed by client name
 */
export const clients = {
  'claude-desktop': claudeDesktopCapabilities
};

export default clients;
