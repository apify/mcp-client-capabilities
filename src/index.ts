/**
 * MCP Client Capabilities Index
 * 
 * Simple index of all MCP client capabilities loaded from JSON file.
 */

export * from './types';
import { McpClientCapabilities } from './types';

// Import client capabilities from JSON
import clientsData from './clients.json';

/**
 * Type for the clients object structure
 */
export type ClientsIndex = {
  [clientName: string]: McpClientCapabilities;
};

/**
 * All MCP client capabilities indexed by client name
 */
export const mcpClientCapabilities: ClientsIndex = clientsData as ClientsIndex;

export default mcpClientCapabilities;
