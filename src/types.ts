/**
 * TypeScript interfaces for Model Context Protocol (MCP) client capabilities
 */

/**
 * Represents the complete capability set for an MCP client
 */
export interface McpClientCapabilities {
  /**
   * The display name of the client for user interfaces
   */
  displayName: string;
  /**
   * Actual client name specified in the `clientInfo` of the initialize MCP request
   */
  clientName: string;
  completions?: {};
  experimental?: { [key: string]: object };
  logging?: {};
  prompts?: { listChanged?: boolean };
  resources?: { listChanged?: boolean; subscribe?: boolean };
  tools?: { listChanged?: boolean };
}
