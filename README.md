# SAHYOG 🤝

### Cooperative Gig Services Platform for Households & Communities

SAHYOG is a community-driven platform that connects households with trusted local service professionals such as electricians, plumbers, cleaners, and other service providers.

The platform is designed around a cooperative model that promotes fair earnings, community participation, and transparent service management.

---

## 🚀 Features

### 👤 Customer
- Browse available services
- View service details and pricing
- Book a service
- Select preferred service providers
- Track bookings
- Submit reviews and ratings

### 🧑‍🔧 Professional
- Professional dashboard
- View incoming service requests
- Accept or manage bookings
- Track completed services
- Track earnings

### 🛠️ Admin
- Manage services
- Manage users and professionals
- Monitor bookings
- View platform statistics
- Manage the overall platform

### 🔐 Trust & Safety
- Professional KYC verification
- User reviews and ratings
- Controlled access to platform features

---

## 💡 Problem

Local household service workers often depend on informal systems for finding customers.

This can result in:

- Limited access to customers
- Unstable income
- Lack of transparency
- Difficulty building trust
- Limited digital presence for local professionals

Customers can also struggle to find reliable service providers.

---

## 💡 Our Solution

SAHYOG provides a single digital platform where:

**Customers → Discover → Book → Track Services**

**Professionals → Receive → Accept → Complete → Earn**

**Admins → Monitor → Manage → Analyze**

The cooperative model is designed to encourage fair participation and community-based growth.

---

## 🏗️ System Architecture

```text
                    SAHYOG PLATFORM
                           │
            ┌──────────────┼──────────────┐
            │              │              │
        CUSTOMER       PROFESSIONAL      ADMIN
            │              │              │
            └──────────────┼──────────────┘
                           │
                     FRONTEND
                 HTML / CSS / JS
                           │
                           ▼
                    NODE.JS + EXPRESS
                           │
                           ▼
                       SUPABASE
                    ┌──────┴──────┐
                    │             │
                DATABASE      AUTH / DATA
