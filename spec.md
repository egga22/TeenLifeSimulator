
# Teen Life Simulator — Full Game Design Document (Final Master Version)

## 1. GAME OVERVIEW
Teen Life Simulator is a deep, menu-based life simulation game set across four years of American high school. The game focuses heavily on popularity, relationships, fashion, time management, school events, and major social moments, with detailed systems for popularity, relationships, rumors, fashion, sports, events, clubs, money, chores, grades, skipping school, punishments, texting, and more.

## 2. PLAYER STATS
- **Popularity (0–100)**
- **Athleticism (0–10)**
- **Happiness (0–100)**
- **Money**
- **Friendship Scores**
- **Romantic Relationship Level**
- **Monthly Study Hours**

## 3. TIME SYSTEM
- Game uses 15-minute blocks.
- School: 8:00 AM–3:00 PM.
- Bike commute: 7:30–8:00 AM and 3:00–3:30 PM.
- Curfews depend on grade:
  - A-range: 11 PM (weekdays), 12 AM (weekends)
  - B-range: 10 PM (weekdays), 11 PM (weekends)
  - C-range: 9 PM (weekdays), 10 PM (weekends)
  - F: 8 PM (weekdays), 9 PM (weekends)

## 4. GRADES SYSTEM
Grades are based solely on monthly study hours:
- 50+: A+
- 45–50: A
- 40–45: A–
- 35–40: B+
- 30–35: B
- 25–30: B–
- 20–25: C+
- 15–20: C
- 10–15: C–
- <10: F

## 5. SEMESTER REPORT CARD UI
Displays:
- Semester Grade
- Monthly Grade Cards
- Study Hour Graph
- Teacher Comment

## 6. PHONE GRADES APP
Shows only:
- Big Letter Grade
- Study Hours

## 7. FRIENDSHIP SYSTEM
Decay:
- Friends: –1 every 5 days
- Best Friends: –1 every 10 days
- Partners: –1 every 3 days

Loyalty is moderate: rumors, neglect, and bad behavior reduce loyalty slightly; hangouts and gifts restore it.

## 8. ROMANCE SYSTEM
Moderate breakup model:
- Breakups from neglect, rumors, or flirting.
- Relationships can be repaired.

## 9. TEXTING SYSTEM 
- Friends: 3–5 texts/week
- Partner: 5–7 texts/week
- Event notifications: 1–2/week
- Rumor notifications: max 2 texts per rumor

## 10. DAILY ANNOUNCEMENTS
School Feed app:
- Displays daily events, meetings, major notices.
- No popups for normal events.

## 11. RUMOR SYSTEM
Mixed origin (player + NPC).
Rumors affect popularity, friendships, romance, and clique reactions.
Severity:
- Everyday: ±5–10
- Medium: ±10–15
- Rare heavy-lite: ±15–18

## 12. CLIQUE WEIGHTING
Popularity influence:
- Popular kids: 70%
- Athletes: 20%
- All other cliques combined: 10%

## 13. FASHION SYSTEM
- Clothing ONLY affects popularity.
- Smooth linear decay over 4 weeks.

## 14. ALLOWANCE SYSTEM
- A-range: $15/week
- B-range: $10/week
- C-range: $5/week
- F: $0/week

## 15. CHORES SYSTEM
Tier-based:
- Tier 1: 15–30 min, $1–3
- Tier 2: 30–45 min, $4–6
- Tier 3: 60–90 min, $7–10
Forced chores always Tier 1 with lowest pay.

## 16. SKIPPING SCHOOL
Reward:
- Full free day.

Consequences:
- Random: Saturday detention OR parent punishment (no allowance + forced chores).

Popularity:
- +3 with rebels only.

## 17. PARENT PUNISHMENTS
Triggers:
- Skipping school
- Multiple detentions
- Failing a grade

Punishments:
- 1 week no allowance
- Forced chores
- Always fixed durations

## 18. CLUB SYSTEM
Weekly club meetings offering:
- Friendship boosts
- Small popularity boosts
- Leadership opportunities

## 19. SPORTS SYSTEM
Tryouts (pure stat-based):
- 0–3: No team
- 4–5: JV
- 6+: Varsity

Captain requires:
- High athleticism
- High popularity

Monthly Big Game:
- Week 3 Friday

## 20. HOMECOMING SYSTEM
85% popularity + 15% event-based bonuses.

## 21. PROM SYSTEM
- Hybrid asking system
- Outfits affect entire month
- Heavy drama scenes
- Post-prom small scene

## 22. NPC BEHAVIOR (B.5)
NPC actions:
- 2–4 invites/week
- Rumors every 1–2 weeks
- Occasional drama
- Controlled pacing

## 23. END-OF-YEAR SCORE
Pure positive scoring from:
- Popularity
- Money Saved
- Grades
- Friends
- Best Friends
- Romance
- Happiness
- Achievements

## 24. YEAR-END HIGHLIGHT REEL
Shows:
- Biggest popularity spike
- Best friend highlight
- Romance moment
- Funniest drama
- Sports/club achievement
- Money summary
- Happiness arc
- Final score
- Replay hook

## 25. GRADUATION
Short summary:
- Final stats
- Final score
- One-line summary
- Fade to black
- Play again
