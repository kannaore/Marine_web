# Draft: WSL Environment Setup for Marine_web

## Requirements (confirmed)
- **Node.js**: Keep v24.13.0 (current), no downgrade
- **Package Manager**: npm (keep existing package-lock.json)
- **Existing Work**: Reset boulder.json (delete and start fresh)
- **Additional Tools**: Git user configuration (name, email)

## Technical Decisions
- Node v24 is very new but user prefers to keep it
- npm ensures compatibility with existing package-lock.json
- Clearing boulder.json removes Windows path references

## Research Findings
- **Project**: Next.js 16 + React 19 + Tailwind v4 + GSAP/Three.js
- **node_modules**: Already installed (Jan 16 10:13)
- **Windows Residue**: boulder.json contains Windows paths (C:\Users\Administrator\...)
- **Git Config**: Global user.name and user.email are NOT set

## Open Questions
- [x] Git user name for commits? → **kannaore**
- [x] Git email for commits? → **maybejjj78@g.kit.ac.kr**
- [x] Verify dev server works after setup? → **YES, include verification**

## Scope Boundaries
- INCLUDE: Git config, boulder.json cleanup, environment verification
- INCLUDE: .nvmrc or .node-version file creation (optional)
- EXCLUDE: Changing package manager
- EXCLUDE: Modifying project code or dependencies
- EXCLUDE: Continuing services-page-improvement work (reset only)
