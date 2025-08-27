/**
 * TypeScript interfaces for Model Context Protocol (MCP) client capabilities
 */

/**
 * Represents the complete capability set for an MCP client
 */
export interface McpClientRecord {
  title: string;
  url: string,
  protocolVersion: string,

  resources?: { listChanged?: boolean; subscribe?: boolean };
  prompts?: { listChanged?: boolean };
  tools?: { listChanged?: boolean };
  elicitation?: {};
  sampling?: {},
  roots?: { listChanged?: boolean },
  completions?: {};
  logging?: {};
}
