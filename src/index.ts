/**
 * MCP Client Capabilities Index
 *
 * Simple index of all MCP client capabilities loaded from JSON file.
 */

export * from './types';
import { McpClientRecord } from './types';

// Import client capabilities from JSON
import clientsData from './mcp_client_capabilities/mcp-clients.json';

/**
 * Type for the clients object structure
 */
export type ClientsIndex = {
  [clientName: string]: McpClientRecord;
};

/**
 * All MCP client capabilities indexed by client name
 */
export const mcpClients: ClientsIndex = clientsData as ClientsIndex;

export default mcpClients;
