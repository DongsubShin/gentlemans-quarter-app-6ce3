# The Gentleman's Quarter — Product Requirements Document

**Version:** 1.0  
**Date:** October 26, 2023  
**Status:** Draft  

---

## 0. Project Overview

### Product

**Name:** gentlemans-quarter-app  
**Type:** Responsive Web Application (Mobile-first for Clients, Desktop-optimized for Admin)  
**Deadline:** December 31, 2023  
**Status:** Draft  

### Description

The Gentleman's Quarter app is a bespoke shop management and client engagement platform designed to replace the shop's reliance on Booksy. It provides a seamless interface for clients to book premium grooming services, a digital "Waitlist" for walk-in traffic, and a robust CRM for the shop’s three barbers to manage client preferences and loyalty. The app focuses on the high-end Dallas market, emphasizing ease of use and professional aesthetics.

### Goals

1. **Eliminate Third-Party Fees:** Transition away from Booksy to a proprietary system to save on monthly subscription and per-booking costs.
2. **Hybrid Queue Management:** Successfully manage both pre-booked appointments and real-time walk-in clients to maximize chair occupancy.
3. **Client Retention:** Implement a native loyalty program that rewards frequent visits and tracks specific grooming preferences (e.g., clipper guard sizes, preferred products).

### Target Audience

| Audience | Description |
|----------|-------------|
| **Primary** | **Clients:** Men in the Dallas area seeking high-quality haircuts, beard trims, and straight razor shaves. |
| **Secondary** | **Barbers:** The three professional barbers at The Gentleman's Quarter who need to manage their daily schedules and client notes. |

### User Types

| Type | DB Value | Description | Key Actions |
|------|----------|-------------|-------------|
| **Client** | `0` | Standard customer | Book appointments, join walk-in queue, view loyalty points. |
| **Barber** | `1` | Service provider | View personal schedule, manage queue, add client notes. |
| **Admin** | `99` | Shop owner/Manager | Manage shop hours, update pricing, view revenue analytics. |

### User Status

| Status | DB Value | Behavior |
|--------|----------|----------|
| **Active** | `0` | Full access to booking and profile features. |
| **Suspended** | `1` | Restricted from booking (used for repeat no-shows). Show: "Please contact the shop to book." |
| **Withdrawn** | `2` | Account deactivated; data anonymized after 30 days for GDPR/CCPA compliance. |

### MVP Scope

**Included:**
- Real-time appointment booking with specific barbers.
- Digital Walk-in Queue (Waitlist) with SMS notifications.
- Client CRM with service history and "Barber Notes."
- Automated SMS reminders via Twilio.
- Basic Loyalty Program (Points per dollar spent).
- Basic Analytics (Daily revenue, barber performance).

**Excluded (deferred):**
- In-app payment processing (Stripe integration deferred to Phase 2).
- Inventory management for retail products.
- Multi-location support.

---

## 1. Terminology

### Core Concepts

| Term | Definition |
|------|------------|
| **The Gentleman's Quarter** | The physical barbershop brand and the digital platform. |
| **Service** | A specific grooming offering (e.g., "Executive Fade," "Beard Sculpting") with a set price and duration. |
| **Walk-in Queue** | A real-time digital list for clients physically present or nearby who do not have a scheduled appointment. |
| **Loyalty Tier** | A classification (Silver, Gold, Platinum) based on the number of visits or points accrued. |

### User Roles

| Role | Description |
|------|-------------|
| **Guest** | Unauthenticated user who can view services, barber profiles, and shop location. |
| **Client** | Authenticated user who can manage their own bookings and loyalty profile. |
| **Barber** | Staff member who can see their specific calendar and toggle their availability. |
| **Admin** | Full access to shop-wide settings, financial data, and user management. |

### Status Values

| Enum | Values | Description |
|------|--------|-------------|
| **ApptStatus** | `PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`, `NOSHOW` | Tracks the lifecycle of a scheduled booking. |
| **QueueStatus** | `WAITING`, `IN_CHAIR`, `FINISHED`, `LEFT` | Tracks the status of a walk-in client. |

### Technical Terms

| Term | Definition |
|------|------------|
| **Slug** | A URL-friendly version of a barber's name or service name (e.g., `/barber/john-doe`). |
| **Webhook** | A technical trigger used to receive real-time updates from the SMS provider. |

---

## 2. System Modules

### Module 1 — Booking & Scheduling

This module handles the logic for matching client requests with barber availability.

#### Main Features

1. **Dynamic Calendar** — Shows available time slots based on service duration and barber working hours.
2. **Conflict Prevention** — Ensures no double-booking and accounts for "buffer time" between cuts.
3. **SMS Confirmation** — Sends immediate booking details to the client.

#### Technical Flow

##### Appointment Booking Flow

1. User selects a Service and a Barber.
2. App queries the database for the Barber's `WorkingHours` and existing `Appointments` for that date.
3. Backend calculates available "windows" and returns them to the UI.
4. User selects a time and confirms.
5. On success:
   - Record created in `Appointments` table with status `CONFIRMED`.
   - Twilio API triggered to send SMS confirmation.
6. On failure:
   - Show: "This slot was just taken. Please select another time."

---

### Module 2 — Walk-in Queue (The "Digital Clipboard")

Manages clients who arrive without an appointment.

#### Main Features

1. **Queue Entry** — Clients scan a QR code in-shop to join the list.
2. **Wait Time Estimation** — Algorithm calculates wait time based on current "In-Chair" status and average service length.
3. **"You're Next" Alerts** — Automated SMS when a barber is 5 minutes from finishing their current client.

#### Technical Flow

1. User enters name and phone number via the "Join Queue" page.
2. System checks which barbers are currently "Active" and not in a scheduled appointment.
3. On success: Client added to `Queue` table; UI shows "Position: 3, Est. Wait: 25 mins."
4. On failure: If shop is at capacity, show "Queue currently closed."

---

### Module 3 — Loyalty & CRM

Tracks client data to provide a personalized experience.

#### Main Features

1. **Barber Notes** — Private fields for barbers to record clipper settings (e.g., "0.5 fade, heavy on top").
2. **Point Accumulation** — Automatically adds 1 point for every $1 spent upon marking an appointment `COMPLETED`.

#### Technical Flow

1. Barber marks appointment as `COMPLETED` in the dashboard.
2. Backend updates `User.loyaltyPoints` and creates a `LoyaltyTransaction` record.
3. System checks if points exceed a threshold (e.g., 200 points = $10 off).
4. If threshold met, update `User.availableRewards`.

---

## 3. User Application

### 3.1 Page Architecture

**Stack:** React (Vite), React Router, Tailwind CSS, React Query.

#### Route Groups

| Group | Access |
|-------|--------|
| Public | Guests & Search Engines |
| Auth | Login/Signup only |
| Protected | Authenticated Clients |

#### Page Map

**Public**
| Route | Page |
|-------|------|
| `/` | Home (Hero, Shop Info, CTA) |
| `/services` | Service Menu & Pricing |
| `/barbers` | Barber Profiles & Portfolios |

**Auth**
| Route | Page |
|-------|------|
| `/login` | Login (Phone/Email) |
| `/register` | Create Account |

**Protected**
| Route | Page |
|-------|------|
| `/dashboard` | Client Home (Upcoming appts, Loyalty points) |
| `/book` | Booking Wizard (Step-by-step) |
| `/queue` | Join/View Walk-in Queue |
| `/profile` | Personal Info & Haircut Preferences |

---

### 3.2 Feature List by Page

#### `/` — Home
- High-quality video background of the Dallas shop.
- "Book Now" and "Join Waitlist" primary buttons.
- Shop hours and real-time "Current Wait Time" display.

#### `/book` — Booking Wizard
- **Step 1:** Select Service (Categories: Haircuts, Shaves, Combos).
- **Step 2:** Select Barber (Option for "Any Barber").
- **Step 3:** Date/Time picker (Calendar view).
- **Step 4:** Summary & Confirmation.

#### `/dashboard` — Client Dashboard
- Display "Next Appointment" card with "Add to Calendar" link.
- Loyalty Progress Bar (e.g., "150/200 points until your next reward").
- "Quick Book" button based on previous service history.

#### `/profile` — Profile & Preferences
- Edit contact info.
- "My Cut" section: Client can view notes shared by their barber (e.g., "Low Taper").
- Upload "Inspiration Photos" for the barber to see before the appointment.

---

## 4. Admin Dashboard

### 4.1 Page Architecture

**Access:** Barber or Admin role only.

| Route | Page |
|-------|------|
| `/admin` | Shop Overview (Today's Schedule) |
| `/admin/queue` | Live Queue Management |
| `/admin/clients` | CRM / Client Directory |
| `/admin/services` | Service & Price Management |
| `/admin/analytics` | Revenue & Performance Reports |

---

### 4.2 Feature List by Page

#### `/admin` — Shop Overview
- Multi-column "Day View" (one column per barber).
- Drag-and-drop to reschedule appointments.
- "Check-in" button for arriving clients.

#### `/admin/queue` — Live Queue Management
- List of walk-ins with "Time Waiting" counter.
- Manual "Add to Queue" for phone-in walk-ins.
- "Assign to Barber" functionality.

#### `/admin/clients` — CRM
- Searchable database by name or phone.
- Detailed profile view: Total spend, visit frequency, and "Barber-only" technical notes.
- Flag "No-Show" status to warn other barbers.

#### `/admin/analytics` — Analytics
- Total Revenue (Daily/Weekly/Monthly).
- Barber Utilization Rate (Time in chair vs. idle time).
- Popular Services breakdown (Pie chart).

---

## 5. Tech Stack

### Architecture

The system follows a classic decoupled architecture with a RESTful API and a responsive frontend.

```
gentlemans-quarter-app/
├── backend/    ← NestJS API (Node.js)
├── frontend/   ← React (Vite) Client App
└── shared/     ← TypeScript interfaces and Enums
```

### Technologies

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Backend | NestJS | 10.x | Scalable API Architecture |
| Language | TypeScript | 5.x | Type safety across stack |
| ORM | TypeORM | 0.3.x | Database mapping |
| Database | PostgreSQL | 15 | Relational data storage |
| Frontend | React | 18.x | UI Library |
| Routing | React Router | 6.x | Navigation |
| State | TanStack Query | 5.x | Server state management |
| CSS | Tailwind CSS | 3.x | Styling |
| Build | Vite | 4.x | Fast development/bundling |

### Third-Party Integrations

| Service | Purpose |
|---------|---------|
| **Twilio** | SMS notifications for reminders and queue alerts. |
| **Cloudinary** | Hosting barber portfolio images and client inspiration photos. |
| **Google Maps API** | Location services and "Directions to Shop." |

### Key Decisions

| Decision | Rationale |
|----------|-----------|
| **NestJS** | Provides a structured, modular backend that is easy for multiple developers to maintain. |
| **PostgreSQL** | Essential for complex relationships between Barbers, Appointments, and Loyalty Transactions. |
| **SMS over Email** | Barbershop clients respond significantly better to SMS for time-sensitive appointments. |

---

## 6. Open Questions

| # | Question | Context / Impact | Owner | Status |
|:-:|----------|-----------------|-------|--------|
| 1 | Should we require a deposit for bookings? | Impact on no-show rates vs. booking friction. Requires Stripe integration. | Client | ⏳ Open |
| 2 | Do barbers have different working hours? | Need to know if Barber A works weekends while Barber B does not. | Client | ⏳ Open |
| 3 | Data migration from Booksy? | Can we export the current client list and notes from Booksy to seed the new DB? | Tech Lead | ⏳ Open |
| 4 | Specific Loyalty rewards? | Is it a flat discount ($10 off) or a free service (Free Beard Trim)? | Client | ⏳ Open |