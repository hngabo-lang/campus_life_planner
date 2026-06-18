# Specification & Wireframes
1. Project Overview
Project Name: Campus Life Planner

## Purpose and description:
This is a user friendly system that helps learners to have a better management of their activities including assignments, and campus daily activities with better schedule.
---
## Target Users:
Are the University students
---
2. Specs/features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Search tasks
- Sort tasks
- Store data in localStorage
- Export JSON files
- Support light and dark themes
- Allow weekly study targets
- Built by html, css, js

--- 

3. Data Model
Task Object:
{  "id": 123456,  "title": "Building Responsive UI",  "dueDate": "2026-06-19",  "duration": 10,080,  "tag": "Exam"}
Settings Object:
{  "unit": "minutes",  "weeklyTarget": 300,  "theme": "dark"}
---
4. Accessibility Plan
It will have:

- emantic HTML elements
- header
- nav
- main
- section
- footer
- Skip navigation link
- forms and its labels
- ARIA live region for messages
- also Responsive to all screens
  
  ---
#Wireframe Sketches
##Mobile Design (responsiveness)

+-------------------+
| Title             |    
+-------------------+
| Navigation        |
+-------------------+
| Dashboard         |
| Card              |
| Card              |
| Card              |
+-------------------+
+-------------------+
| Add Task Form     |
+-------------------+
+-------------------+
|Search + Sort +json|
+-------------------+
+-------------------+
| Table             |
+-------------------+
+-------------------+
| Settings          |
+-------------------+
|  Footer           |
+-------------------+

---
##Desktop design(responsiveness)

+--------------------------------------------------+
|                     Title                        |
+------(header)------------------------------------+   
|                    Navigation                    |
+--------------------------------------------------+
|         Dashboard                                |
+--------+--------+---------+---------+------------+
| Card1  |  Card2 |  Card3  | Card4   |    Card5   |
+--------+--------+---------+---------+------------+
+--------------------------------------------------+
|          Add Task Form                           |
+--------------------------------------------------+
+--------------------------------------------------+
| Search + Sort + Export                           |
+--------------------------------------------------+
+--------------------------------------------------+
| Table                                            |
+--------------------------------------------------+
+--------------------------------------------------+
| Settings                                         |
+--------------------------------------------------+
+--------------------------------------------------+
| Footer                                           |
+--------------------------------------------------+

### I hope that users will interact with it well
