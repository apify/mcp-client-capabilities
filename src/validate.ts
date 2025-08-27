/**
 * Validation script to ensure mcp-clients matches TypeScript types
 */

import { McpClientRecord } from './types';
import clientsData from './mcp-clients.json';

/**
 * Validates that a client capability object matches the expected interface
 */
function validateClientCapabilities(clientName: string, capabilities: any): capabilities is McpClientRecord {
  const errors: string[] = [];

  // Check that it's an object
  if (typeof capabilities !== 'object' || capabilities === null) {
    errors.push(`${clientName}: must be an object`);
    return false;
  }

  // Check mandatory clientName field
  if (!capabilities.clientName) {
    errors.push(`${clientName}: missing required field 'clientName'`);
  } else if (typeof capabilities.clientName !== 'string') {
    errors.push(`${clientName}.clientName: must be a string`);
  } else if (typeof capabilities.url !== 'string') {
    errors.push(`${clientName}.url: must be a string`);
  } else if (typeof capabilities.protocolVersion !== 'string') {
    errors.push(`${clientName}.protocolVersion: must be a string`);
  }

  // Check mandatory displayName field
  if (!capabilities.displayName) {
    errors.push(`${clientName}: missing required field 'displayName'`);
  } else if (typeof capabilities.displayName !== 'string') {
    errors.push(`${clientName}.displayName: must be a string`);
  }

  // Check optional properties
  const validKeys = ['clientName', 'displayName', 'url', 'protocolVersion', 'completions', 'experimental', 'logging', 'prompts', 'resources', 'tools'];
  for (const key of Object.keys(capabilities)) {
    if (!validKeys.includes(key)) {
      errors.push(`${clientName}: unknown property '${key}'`);
    }
  }

  // Validate prompts capability
  if (capabilities.prompts !== undefined) {
    if (typeof capabilities.prompts !== 'object' || capabilities.prompts === null) {
      errors.push(`${clientName}.prompts: must be an object`);
    } else {
      for (const key of Object.keys(capabilities.prompts)) {
        if (key === 'listChanged') {
          if (typeof capabilities.prompts[key] !== 'boolean') {
            errors.push(`${clientName}.prompts.listChanged: must be a boolean`);
          }
        } else {
          errors.push(`${clientName}.prompts: unknown property '${key}'`);
        }
      }
    }
  }

  // Validate resources capability
  if (capabilities.resources !== undefined) {
    if (typeof capabilities.resources !== 'object' || capabilities.resources === null) {
      errors.push(`${clientName}.resources: must be an object`);
    } else {
      for (const key of Object.keys(capabilities.resources)) {
        if (key === 'listChanged' || key === 'subscribe') {
          if (typeof capabilities.resources[key] !== 'boolean') {
            errors.push(`${clientName}.resources.${key}: must be a boolean`);
          }
        } else {
          errors.push(`${clientName}.resources: unknown property '${key}'`);
        }
      }
    }
  }

  // Validate tools capability
  if (capabilities.tools !== undefined) {
    if (typeof capabilities.tools !== 'object' || capabilities.tools === null) {
      errors.push(`${clientName}.tools: must be an object`);
    } else {
      for (const key of Object.keys(capabilities.tools)) {
        if (key === 'listChanged') {
          if (typeof capabilities.tools[key] !== 'boolean') {
            errors.push(`${clientName}.tools.listChanged: must be a boolean`);
          }
        } else {
          errors.push(`${clientName}.tools: unknown property '${key}'`);
        }
      }
    }
  }

  // Validate completions capability (empty object)
  if (capabilities.completions !== undefined) {
    if (typeof capabilities.completions !== 'object' || capabilities.completions === null) {
      errors.push(`${clientName}.completions: must be an object`);
    }
  }

  // Validate logging capability (empty object)
  if (capabilities.logging !== undefined) {
    if (typeof capabilities.logging !== 'object' || capabilities.logging === null) {
      errors.push(`${clientName}.logging: must be an object`);
    }
  }

  // Validate experimental capability
  if (capabilities.experimental !== undefined) {
    if (typeof capabilities.experimental !== 'object' || capabilities.experimental === null) {
      errors.push(`${clientName}.experimental: must be an object`);
    }
  }

  if (errors.length > 0) {
    console.error('Validation errors:');
    errors.forEach(error => console.error(`  - ${error}`));
    return false;
  }

  return true;
}

/**
 * Main validation function
 */
function validateClientsJson(): boolean {
  console.log('Validating mcp-clients...');

  let isValid = true;

  for (const [clientName, capabilities] of Object.entries(clientsData)) {
    if (!validateClientCapabilities(clientName, capabilities)) {
      isValid = false;
    }
  }

  if (isValid) {
    console.log('✅ mcp-clients is valid!');
    console.log(`Found ${Object.keys(clientsData).length} client(s): ${Object.keys(clientsData).join(', ')}`);
  } else {
    console.log('❌ mcp-clients has validation errors');
  }

  return isValid;
}

// Run validation if this script is executed directly
if (require.main === module) {
  const isValid = validateClientsJson();
  process.exit(isValid ? 0 : 1);
}

export { validateClientsJson };
