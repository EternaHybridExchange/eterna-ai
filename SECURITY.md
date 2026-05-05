# Security

Eterna AI touches real trading workflows. Treat security issues as sensitive.

## Reporting Vulnerabilities

Do not open public GitHub issues for vulnerabilities.

Report security concerns privately to:

**security@eterna.exchange**

If that address is unavailable, contact:

**contact@eterna.exchange**

Include:

- affected package or service
- reproduction steps
- expected impact
- logs or screenshots if useful
- whether funds, credentials, OAuth tokens, MCP access, or withdrawals are involved

## Scope

Security-sensitive areas include:

- OAuth and session handling
- MCP tool execution
- sandbox escape or code execution boundaries
- trading order execution
- withdrawal submission
- credential storage
- agent prompt injection paths
- package publishing workflows

## Agent And Trading Safety

Agent instructions must require explicit user confirmation before:

- placing an order
- closing a position
- cancelling orders
- submitting a withdrawal

Prompt-level safety is not the same as platform-enforced safety. Public docs should not claim platform-enforced leverage caps, position limits, or withdrawal controls unless implementation evidence exists.
