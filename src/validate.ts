/**
 * Validation script to ensure mcp-clients matches TypeScript types
 */

import { McpClientRecord } from './types';
import clientsData from './mcp_client_capabilities/mcp-clients.json';

/**
 * Validates that a client capability object matches the expected interface
 */
function validateClientCapabilities(clientName: string, record: any): record is McpClientRecord {
  const errors: string[] = [];

  // Check that it's an object
  if (typeof record !== 'object' || record === null) {
    errors.push(`${clientName}: must be an object`);
    return false;
  }

  // Check mandatory clientName field
  if (!record.url) {
    errors.push(`${clientName}: missing required field 'url'`);
  } else if (typeof record.url !== 'string') {
    errors.push(`${clientName}.url: must be a string`);
  } else if (!record.protocolVersion) {
    errors.push(`${clientName}: missing required field 'protocolVersion'`);
  } else if (typeof record.protocolVersion !== 'string') {
    errors.push(`${clientName}.protocolVersion: must be a string`);
  }

  // Check mandatory title field
  if (!record.title) {
    errors.push(`${clientName}: missing required field 'title'`);
  } else if (typeof record.title !== 'string') {
    errors.push(`${clientName}.title: must be a string`);
  }

   // Check optional properties
    const validKeys = ['clientName', 'title', 'url', 'protocolVersion', 'completions', 'experimental', 'logging', 'prompts', 'resources', 'tools', 'tasks', 'elicitation', 'sampling', 'roots'];
  for (const key of Object.keys(record)) {
    if (!validKeys.includes(key)) {
      errors.push(`${clientName}: unknown property '${key}'`);
    }
  }

  // Validate prompts capability
  if (record.prompts !== undefined) {
    if (typeof record.prompts !== 'object' || record.prompts === null) {
      errors.push(`${clientName}.prompts: must be an object`);
    } else {
      for (const key of Object.keys(record.prompts)) {
        if (key === 'listChanged') {
          if (typeof record.prompts[key] !== 'boolean') {
            errors.push(`${clientName}.prompts.listChanged: must be a boolean`);
          }
        } else {
          errors.push(`${clientName}.prompts: unknown property '${key}'`);
        }
      }
    }
  }

  // Validate resources capability
  if (record.resources !== undefined) {
    if (typeof record.resources !== 'object' || record.resources === null) {
      errors.push(`${clientName}.resources: must be an object`);
    } else {
      for (const key of Object.keys(record.resources)) {
        if (key === 'listChanged' || key === 'subscribe') {
          if (typeof record.resources[key] !== 'boolean') {
            errors.push(`${clientName}.resources.${key}: must be a boolean`);
          }
        } else {
          errors.push(`${clientName}.resources: unknown property '${key}'`);
        }
      }
    }
  }

   // Validate tools capability
   if (record.tools !== undefined) {
     if (typeof record.tools !== 'object' || record.tools === null) {
       errors.push(`${clientName}.tools: must be an object`);
     } else {
       for (const key of Object.keys(record.tools)) {
         if (key === 'listChanged') {
           if (typeof record.tools[key] !== 'boolean') {
             errors.push(`${clientName}.tools.listChanged: must be a boolean`);
           }
         } else {
           errors.push(`${clientName}.tools: unknown property '${key}'`);
         }
       }
     }
   }

   // Validate tasks capability
   if (record.tasks !== undefined) {
     if (typeof record.tasks !== 'object' || record.tasks === null) {
       errors.push(`${clientName}.tasks: must be an object`);
     } else {
       // Validate tasks.requests
       if (record.tasks.requests !== undefined) {
         if (typeof record.tasks.requests !== 'object' || record.tasks.requests === null) {
           errors.push(`${clientName}.tasks.requests: must be an object`);
         } else {
           // Validate tasks.requests.tools
           if (record.tasks.requests.tools !== undefined) {
             if (typeof record.tasks.requests.tools !== 'object' || record.tasks.requests.tools === null) {
               errors.push(`${clientName}.tasks.requests.tools: must be an object`);
             } else {
               // Validate tasks.requests.tools.call
               if (record.tasks.requests.tools.call !== undefined) {
                 if (typeof record.tasks.requests.tools.call !== 'object' || record.tasks.requests.tools.call === null) {
                   errors.push(`${clientName}.tasks.requests.tools.call: must be an object`);
                 } else {
                   // Validate that it's empty or has valid properties
                   for (const key of Object.keys(record.tasks.requests.tools.call)) {
                     errors.push(`${clientName}.tasks.requests.tools.call: unknown property '${key}'`);
                   }
                 }
               }
               // Check for unknown properties in tools
               for (const key of Object.keys(record.tasks.requests.tools)) {
                 if (key !== 'call') {
                   errors.push(`${clientName}.tasks.requests.tools: unknown property '${key}'`);
                 }
               }
             }
           }
           // Check for unknown properties in requests
           for (const key of Object.keys(record.tasks.requests)) {
             if (key !== 'tools') {
               errors.push(`${clientName}.tasks.requests: unknown property '${key}'`);
             }
           }
         }
       }
       // Check for unknown properties in tasks
       for (const key of Object.keys(record.tasks)) {
         if (key !== 'requests') {
           errors.push(`${clientName}.tasks: unknown property '${key}'`);
         }
       }
     }
   }

   // Validate completions capability (empty object)
  if (record.completions !== undefined) {
    if (typeof record.completions !== 'object' || record.completions === null) {
      errors.push(`${clientName}.completions: must be an object`);
    }
  }

   // Validate logging capability (empty object)
   if (record.logging !== undefined) {
     if (typeof record.logging !== 'object' || record.logging === null) {
       errors.push(`${clientName}.logging: must be an object`);
     }
   }

   // Validate elicitation capability (empty object)
   if (record.elicitation !== undefined) {
     if (typeof record.elicitation !== 'object' || record.elicitation === null) {
       errors.push(`${clientName}.elicitation: must be an object`);
     }
   }

   // Validate sampling capability (empty object)
   if (record.sampling !== undefined) {
     if (typeof record.sampling !== 'object' || record.sampling === null) {
       errors.push(`${clientName}.sampling: must be an object`);
     }
   }

   // Validate roots capability
   if (record.roots !== undefined) {
     if (typeof record.roots !== 'object' || record.roots === null) {
       errors.push(`${clientName}.roots: must be an object`);
     } else {
       for (const key of Object.keys(record.roots)) {
         if (key === 'listChanged') {
           if (typeof record.roots[key] !== 'boolean') {
             errors.push(`${clientName}.roots.listChanged: must be a boolean`);
           }
         } else {
           errors.push(`${clientName}.roots: unknown property '${key}'`);
         }
       }
     }
   }

   // Validate experimental capability
  if (record.experimental !== undefined) {
    if (typeof record.experimental !== 'object' || record.experimental === null) {
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
