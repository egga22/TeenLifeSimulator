# Teen Life Simulator

This repository begins the JavaScript implementation of the Teen Life Simulator described in `spec.md`. The code focuses on system-level logic for grades, time blocks, relationships, rumors, chores, sports, fashion, and an orchestrating `TeenLifeSimulator` facade.

## Getting started
1. Install Node.js 20+.
2. Run the test suite:

```bash
npm test
```

## Key modules
- `src/systems/gradeSystem.js` — grade, curfew, and allowance rules based on monthly study hours.
- `src/systems/timeSystem.js` — 15-minute block timekeeper aligned to the school day and commute windows.
- `src/systems/relationshipSystem.js` — friendship/best-friend/partner decay and rumor impacts.
- `src/systems/rumorSystem.js` — popularity and relationship penalties for rumor severities.
- `src/systems/choresSystem.js` — chore generation aligned to tiered durations and pay.
- `src/systems/sportsSystem.js` — stat-based team placement and captain eligibility.
- `src/systems/fashionSystem.js` — linear popularity decay for outfits over four weeks.
- `src/TeenLifeSimulator.js` — combines the systems into a single interface for gameplay scripting.

Refer to `spec.md` for the detailed design targets for future development.
