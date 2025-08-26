/**
 * MCP Client Capabilities Index
 * 
 * Simple index of all MCP client capabilities loaded from JSON file.
 */

export * from './types';
import { MCPClientCapabilities } from './types';

// Import client capabilities from JSON
import clientsData from './clients.json';

/**
 * Type for the clients object structure
 */
export type ClientsIndex = {
  [clientName: string]: MCPClientCapabilities;
};

/**
 * All MCP client capabilities indexed by client name
 */
export const clients: ClientsIndex = clientsData as ClientsIndex;

export default clients;
