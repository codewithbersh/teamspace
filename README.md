# Team Space: Collaborative Project Management

**Live Website**: [https://teamspace-lac.vercel.app/](https://teamspace-lac.vercel.app/)

Team Space is a web-based project management application designed to streamline team collaboration. Members can interact, manage, and oversee project tickets ranging from issues to feature requests and improvements.

## Features

### Authentication:

- Secure user authentication via NextAuth with Google. Ensure you have a Google account for seamless sign-in.

### User Dashboard:

- On initial login, users are prompted to either **JOIN** or **CREATE** a team space.
- For joining an existing team space, users need to input an invitation code, shared by the space's administrator or owner.
- Post-authentication, users navigate to the **Tickets** page or the **Settings** page, depending on their access level.

### Tickets:

- Users can **CREATE**, **UPDATE**, or **DELETE** tickets based on their role access.
- Tickets categorize into: **Issue**, **Feature Request**, or **Improvement**.

### User Roles:

- **Developer**:
  - View all tickets.
  - Access ticket details.
  - Update status on assigned tickets to: `Pending`, `In Progress`, or `For Review`.
  - Comment on assigned tickets and manage their comments.
- **Admin**:
  - All Developer permissions, plus:
  - Universal ticket status management.
  - Manage ticket assignees.
  - Update ticket details.
  - Archive or delete tickets.
  - Access team space settings:
    - Manage members.
    - Oversee archived tickets.
    - Share team space invitation codes.
    - Update the team space name.
- **Owner**:
  - Inherits all Admin permissions, plus:
  - Add or remove admins.
  - Delete the entire team space.

## Technologies Used

### Backend:

- **Framework**: Django with Django Rest Framework for a robust API construction.
- **Deployment**: Backend is hosted on [railway.app](https://railway.app).
- **Authentication**: Integrated Django's built-in authentication along with `dj_rest_auth`, `simplejwt`, and `allauth`.
- **Database**: POSTGRESQL database provisioned through [railway.app](https://railway.app).

### Frontend:

- **Framework**: TypeScript-powered React, developed using the NextJS framework. Built on NextJS version `13.4`.
- **Authentication**: Frontend authentication handled using NextAuth, utilizing both Google Provider and Credentials Provider.
- **Form Management**: React-Hook-Forms integrated with ZOD and TypeScript for efficient form validations.
- **HTTP Client**: Axios for making HTTP requests.
- **State Management**: TanStack Query and ZUSTAND for a seamless state management experience.
- **Data Display**: TanStack Tables headless UI component, ideal for constructing powerful tables & data grids.

### Styling & UI:

- **CSS Framework**: Tailwind CSS.
- **UI Component Library**: ShadCN UI – a set of reusable UI components, built upon RADIX UI and Tailwind CSS.
- **Icons**: Leveraged Lucide-React and Radix UI Icons.
- **Design Tool**: High-fidelity and low-fidelity wireframes and mockups crafted using Figma.
