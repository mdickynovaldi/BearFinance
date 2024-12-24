# 💰 BearFinance - Smart Personal Finance Manager

<div align="center">
  <img src="public/Bear.png" alt="BearFinance Logo" width="200"/>
  <p><em>Take control of your finances with intelligence and security</em></p>
</div>

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green)](https://supabase.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🌟 Overview

BearFinance is a modern, secure, and intelligent personal finance management application designed to help you take control of your financial life. With advanced features like smart budgeting, detailed analytics, and secure transaction management, BearFinance makes it easy to track, plan, and optimize your finances.

## ✨ Key Features

### 🎯 Smart Budget Planning

- Create and manage custom budget categories tailored to your needs
- Set flexible monthly/weekly spending limits
- Receive intelligent real-time alerts when approaching budget limits
- Automated budget adjustments based on spending patterns

### 📊 Advanced Analytics

- Interactive and responsive dashboards
- Comprehensive expense tracking by category
- Detailed income vs. spending trend analysis
- Customizable date range reporting
- Visual data representation with intuitive charts

### 💳 Transaction Management

- Intelligent auto-categorization of expenses
- Quick receipt capture with OCR technology
- Flexible recurring transaction setup
- Unified multiple account management
- Transaction search and filtering

### 📱 Cross-Platform Experience

- Fully responsive web interface
- Progressive Web App (PWA) capabilities
  - Offline functionality
  - Home screen installation
- Seamless dark/light theme switching
- Mobile-first design approach

### 🔐 Enterprise-Grade Security

- End-to-end encryption for sensitive data
- Two-factor authentication (2FA)
- Secure OAuth2 integration for social logins
- Regular security audits and updates
- GDPR compliance

## 🛠️ Technology Stack

### Frontend Architecture

- **Framework:** Next.js 14 with App Router
  - Server-side rendering
  - API routes
  - Middleware support
- **Language:** TypeScript
- **Styling:**
  - Tailwind CSS for utility-first styling
  - Shadcn UI for consistent components
- **State Management:**
  - Zustand for global state
  - React Query for server state
- **Form Handling:**
  - React Hook Form
  - Zod for schema validation
- **Data Visualization:**
  - Recharts for interactive charts
  - Chart.js for complex visualizations

### Backend Infrastructure

- **Database:** Supabase
  - PostgreSQL for data storage
  - Real-time subscriptions
  - Row level security
- **Authentication:**
  - NextAuth.js
  - Multiple providers support
- **Storage:**
  - Supabase Storage for files
  - Image optimization
- **API Layer:**
  - REST endpoints
  - tRPC for type-safe APIs

### DevOps & Tooling

- **Hosting:** Vercel
  - Edge functions
  - Global CDN
- **CI/CD:**
  - GitHub Actions
  - Automated testing
  - Deployment automation
- **Monitoring:**
  - Sentry for error tracking
  - Performance monitoring
- **Analytics:**
  - Vercel Analytics
  - User behavior tracking

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- Supabase account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/bearfinance.git
cd bearfinance
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Fill in your environment variables in `.env.local`

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- Documentation: [docs.bearfinance.com](https://docs.bearfinance.com)
- Email: support@bearfinance.com
- Discord: [BearFinance Community](https://discord.gg/bearfinance)

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
