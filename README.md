# Smart Internship Verification Portal

**Final Advanced Working Prototype**  
CVM University • Faculty of Engineering & Technology  
Practical 1 — Product Ideation

---

## How to Run

### Easiest way
1. Open the folder `smart-internship-portal`
2. Double-click **index.html**
3. It works offline in any modern browser (Chrome, Edge, Firefox, Safari)

### Optional local server
```bash
cd smart-internship-portal
python3 -m http.server 8080
```
Then open → http://localhost:8080

---

## Features (Advanced Level)

| Feature | Description |
|---------|-------------|
| Smart Verification Engine | Matches companies, detects scam patterns, free-email domains, urgency language, payment requests |
| Risk Score (0–100) | Clear visual bar + confidence percentage |
| Role Modes | Student / Placement Officer (different advice) |
| Autocomplete | Type company name and get suggestions from database |
| Dark / Light Mode | Fully supported |
| Verification History | Saved in browser localStorage |
| Company Database Table | Demo of trusted + flagged companies |
| FAQ Section | Common questions answered |
| Printable Report | One-click print / save |
| Fully Responsive | Works on mobile, tablet, desktop |

---

## Quick Test Cases

| Input Company | Expected Result |
|---------------|-----------------|
| TCS / Infosys / Google / Microsoft | **Genuine** |
| QuickIntern Solutions | **High Risk** |
| SkillBoost Academy | **High Risk** (certificate mill) |
| Any unknown company + text “pay registration fee via UPI” | **Suspicious / High Risk** |
| Company using @gmail.com | Higher risk score |

---

## Project Structure

```
smart-internship-portal/
├── index.html          ← Main application (open this)
├── js/
│   └── app.js          ← Verification engine + all interactions
└── README.md
```

---

## Important Note

This is a **frontend-only advanced demo**.  
In a real production system you would add:
- Backend + real company registry / MCA data
- User authentication
- Admin panel for placement cells
- Community reporting system

---

Built as a complete working demonstration of the Product Ideation concept.
