"""
TypeScript interfaces for Model Context Protocol (MCP) client capabilities
"""

from typing import Any, Optional, TypedDict


class Resources(TypedDict, total=False):
    list_changed: Optional[bool]
    subscribe: Optional[bool]


class Prompts(TypedDict, total=False):
    list_changed: Optional[bool]


class Tools(TypedDict, total=False):
    list_changed: Optional[bool]


class Roots(TypedDict, total=False):
    list_changed: Optional[bool]


class Completions(TypedDict, total=False):
    pass


class Logging(TypedDict, total=False):
    pass


class Experimental(TypedDict, total=False):
    pass


class Elicitation(TypedDict, total=False):
    pass


class Sampling(TypedDict, total=False):
    pass


class McpClientRecord(TypedDict):
    title: str
    url: str
    protocol_version: str
    resources: Optional[Resources]
    prompts: Optional[Prompts]
    tools: Optional[Tools]
    elicitation: Optional[Elicitation]
    sampling: Optional[Sampling]
    roots: Optional[Roots]
    completions: Optional[Completions]
    logging: Optional[Logging]
    experimental: Optional[Experimental]


ClientsIndex = dict[str, McpClientRecord]