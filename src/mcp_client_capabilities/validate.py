#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Validation script to ensure mcp-clients.json matches the expected structure.
"""

import json
import sys
from typing import Any, Dict, List

def validate_client_capabilities(client_name: str, record: Any) -> bool:
    """
    Validates that a client capability object matches the expected interface.

    Args:
        client_name: The name of the client being validated.
        record: The client capabilities dictionary to validate.

    Returns:
        True if the record is valid, False otherwise.
    """
    errors: List[str] = []

    # Check that it's an object (dict in Python)
    if not isinstance(record, dict):
        errors.append(f"{client_name}: must be an object")
    else:
        # Check mandatory string fields
        for field in ['url', 'protocolVersion', 'title']:
            if field not in record:
                errors.append(f"{client_name}: missing required field '{field}'")
            elif not isinstance(record.get(field), str):
                errors.append(f"{client_name}.{field}: must be a string")

        # Check for unknown top-level properties
        valid_keys = {
            'clientName', 'title', 'url', 'protocolVersion', 'completions', 
            'experimental', 'logging', 'prompts', 'resources', 'tools'
        }
        for key in record.keys():
            if key not in valid_keys:
                errors.append(f"{client_name}: unknown property '{key}'")

        # Validate 'prompts' capability
        if 'prompts' in record:
            prompts = record['prompts']
            if not isinstance(prompts, dict):
                errors.append(f"{client_name}.prompts: must be an object")
            else:
                for key, value in prompts.items():
                    if key == 'listChanged':
                        if not isinstance(value, bool):
                            errors.append(f"{client_name}.prompts.listChanged: must be a boolean")
                    else:
                        errors.append(f"{client_name}.prompts: unknown property '{key}'")

        # Validate 'resources' capability
        if 'resources' in record:
            resources = record['resources']
            if not isinstance(resources, dict):
                errors.append(f"{client_name}.resources: must be an object")
            else:
                for key, value in resources.items():
                    if key in ('listChanged', 'subscribe'):
                        if not isinstance(value, bool):
                            errors.append(f"{client_name}.resources.{key}: must be a boolean")
                    else:
                        errors.append(f"{client_name}.resources: unknown property '{key}'")

        # Validate 'tools' capability
        if 'tools' in record:
            tools = record['tools']
            if not isinstance(tools, dict):
                errors.append(f"{client_name}.tools: must be an object")
            else:
                for key, value in tools.items():
                    if key == 'listChanged':
                        if not isinstance(value, bool):
                            errors.append(f"{client_name}.tools.listChanged: must be a boolean")
                    else:
                        errors.append(f"{client_name}.tools: unknown property '{key}'")
        
        # Validate capabilities that should be objects (can be empty)
        for cap in ['completions', 'logging', 'experimental']:
            if cap in record and not isinstance(record[cap], dict):
                errors.append(f"{client_name}.{cap}: must be an object")

    if errors:
        print('Validation errors:', file=sys.stderr)
        for error in errors:
            print(f"  - {error}", file=sys.stderr)
        return False

    return True

def validate_clients_json() -> bool:
    """
    Main validation function. Loads and validates the mcp-clients.json file.

    Returns:
        True if the entire file is valid, False otherwise.
    """
    print('Validating mcp-clients...')
    file_path = './src/mcp_client_capabilities/mcp-clients.json'
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            clients_data = json.load(f)
    except FileNotFoundError:
        print(f"❌ Error: Data file not found at '{file_path}'", file=sys.stderr)
        return False
    except json.JSONDecodeError as e:
        print(f"❌ Error: Invalid JSON in '{file_path}': {e}", file=sys.stderr)
        return False

    is_globally_valid = True
    for client_name, capabilities in clients_data.items():
        if not validate_client_capabilities(client_name, capabilities):
            is_globally_valid = False
    
    if is_globally_valid:
        client_names = list(clients_data.keys())
        print('✅ mcp-clients is valid!')
        print(f"Found {len(client_names)} client(s): {', '.join(client_names)}")
    else:
        print('❌ mcp-clients has validation errors')
        
    return is_globally_valid

def main():
    """
    Script entry point. Runs the validation and exits with an appropriate status code.
    """
    is_valid = validate_clients_json()
    sys.exit(0 if is_valid else 1)

# Run validation if this script is executed directly
if __name__ == "__main__":
    main()