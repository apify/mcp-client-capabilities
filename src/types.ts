/**
 * TypeScript interfaces for Model Context Protocol (MCP) client capabilities
 */

/**
 * Represents the capabilities for completions
 */
export interface CompletionsCapability {
  // Empty object as per specification
}

/**
 * Represents experimental capabilities
 */
export interface ExperimentalCapability {
  [key: string]: object;
}

/**
 * Represents the capabilities for logging
 */
export interface LoggingCapability {
  // Empty object as per specification
}

/**
 * Represents the capabilities for prompts
 */
export interface PromptsCapability {
  listChanged?: boolean;
}

/**
 * Represents the capabilities for resources
 */
export interface ResourcesCapability {
  listChanged?: boolean;
  subscribe?: boolean;
}

/**
 * Represents the capabilities for tools
 */
export interface ToolsCapability {
  listChanged?: boolean;
}

/**
 * Represents the complete capability set for an MCP client
 */
export interface MCPClientCapabilities {
  completions?: CompletionsCapability;
  experimental?: ExperimentalCapability;
  logging?: LoggingCapability;
  prompts?: PromptsCapability;
  resources?: ResourcesCapability;
  tools?: ToolsCapability;
}
