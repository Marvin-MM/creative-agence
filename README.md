# 🎨 Lumina Creative - Premium Design Agency Website & CMS

A stunning, production-ready website and content management system built with Next.js for creative design agencies. Features immersive animations, modern UI/UX, and a powerful admin dashboard.

![Lumina Creative](https://via.placeholder.com/1200x600/667eea/ffffff?text=Lumina+Creative)

## ✨ Features

### 🌟 Public Website
- **Immersive Hero Section** with GSAP animations and parallax effects
- **Masonry Portfolio Gallery** with hover effects and modal views
- **Dynamic Blog System** with tags, categories, and social sharing
- **Contact Forms** with validation and email notifications
- **Newsletter Subscription** with confirmation emails
- **Mobile-First Design** with bottom navigation
- **Dark/Light Mode** toggle
- **SEO Optimized** with Next.js App Router

### 🔐 Admin CMS Dashboard
- **Secure Authentication** with NextAuth.js
- **Project Management** (CRUD operations)
- **Blog Management** with rich text editing
- **Contact Message Viewer** with auto-expiry
- **Newsletter Subscriber Management**
- **Analytics Dashboard** with charts and insights
- **Image/Video Upload** via Cloudinary
- **Real-time Notifications**

### 🎭 Visual Excellence
- **Glassmorphism** design elements
- **Smooth Animations** with Framer Motion & GSAP
- **Responsive Design** across all devices
- **Custom Components** with shadcn/ui
- **Gradient Backgrounds** and modern aesthetics
- **Micro-interactions** on every element

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Animations:** GSAP, anime.js, Framer Motion
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** NextAuth.js
- **File Uploads:** Cloudinary
- **Email:** Nodemailer
- **Forms:** React Hook Form + Yup validation
- **State Management:** Zustand + TanStack Query
- **Charts:** Recharts
- **Notifications:** react-hot-toast

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database
- Cloudinary account (for images)
- SMTP email service

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/lumina-creative.git
cd lumina-creative
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```
Fill in your environment variables in `.env.local`

4. **Set up the database**
```bash
# Push the schema to your database
npm run db:push

# Seed the database with sample data
npm run db:seed
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to `http://localhost:3000`

## 📁 Project Structure

```
creative-agency-cms/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/admin/      # Admin dashboard (protected)
│   │   ├── api/               # API routes
│   │   ├── about/             # About page
│   │   ├── blog/              # Blog pages
│   │   ├── contact/           # Contact page
│   │   ├── work/              # Portfolio pages
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── admin/             # Admin dashboard components
│   │   ├── layout/            # Layout components
│   │   ├── sections/          # Page sections
│   │   └── animations/        # Animation components
│   ├── lib/                   # Utility functions
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── db.ts              # Database client
│   │   ├── email.ts           # Email service
│   │   └── validations.ts     # Form schemas
│   └── styles/                # Global styles
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding
├── public/                    # Static assets
└── components.json            # shadcn/ui config
```

## 🎨 Customization

### Brand Colors
Update the brand colors in `tailwind.config.js`:

```js
colors: {
  brand: {
    50: '#f0f9ff',
    // ... your brand colors
    900: '#0c4a6e',
  }
}
```

### Company Information
Update company details in `src/lib/db.ts` seed data or through the admin panel.

### Animations
Customize animations in:
- `src/components/animations/`
- `src/components/sections/hero-section.tsx`
- Global styles in `src/app/globals.css`

## 🔧 Configuration

### Database Schema
The Prisma schema includes:
- **Users** (admin authentication)
- **Projects** (portfolio items)
- **Blog Posts** (articles/insights)
- **Contact Messages** (form submissions)
- **Newsletter** (email subscriptions)
- **Analytics** (page views, stats)
- **FAQs** and **Team Members**

### Email Templates
Customize email templates in `src/lib/email.ts`:
- Contact form notifications
- Newsletter confirmations
- Welcome emails

### SEO Configuration
Update SEO settings in:
- `src/app/layout.tsx` (global metadata)
- Individual page metadata exports
- Open Graph images in `public/images/`

## 🛡 Security Features

- **CSRF Protection** via NextAuth.js
- **Input Validation** with Yup schemas
- **SQL Injection Prevention** via Prisma
- **XSS Protection** with proper escaping
- **Rate Limiting** (implement as needed)
- **Auto-expire Messages** (30-day cleanup)

## 📊 Analytics & Monitoring

The admin dashboard includes:
- **Page View Tracking**
- **Contact Form Analytics**
- **Newsletter Growth Metrics**
- **Project Performance Stats**
- **User Engagement Data**

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy automatically

### Other Platforms
- **Netlify:** Use `next export` for static sites
- **Railway:** Database + app hosting
- **AWS/GCP:** Container deployment

### Database Setup
For production, consider:
- **Vercel Postgres**
- **PlanetScale**
- **Railway PostgreSQL**
- **AWS RDS**

## 🔒 Admin Access

Default admin credentials (change immediately):
- **Email:** admin@lumina-creative.com
- **Password:** password123

Access the admin panel at `/admin`

## 📝 Content Management

### Adding Projects
1. Go to `/admin/projects`
2. Click "New Project"
3. Fill in details and upload images
4. Set as featured (optional)
5. Publish

### Writing Blog Posts
1. Go to `/admin/blog`
2. Click "New Post"
3. Write content with Markdown support
4. Add tags and cover image
5. Publish or save as draft

### Managing Messages
- View all contact form submissions
- Messages auto-delete after 30 days
- Export newsletter subscribers

## 🎯 Performance Optimization

- **Image Optimization** via Next.js Image
- **Code Splitting** with dynamic imports
- **Lazy Loading** for animations
- **CDN Integration** with Cloudinary
- **Caching** strategies implemented
- **Bundle Analysis** available

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- **Documentation:** This README
- **Issues:** GitHub Issues
- **Email:** support@lumina-creative.com

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for hosting and deployment
- **shadcn** for the beautiful UI components
- **Framer Motion** for smooth animations
- **Tailwind CSS** for utility-first styling

---

**Built with ❤️ by the Lumina Creative Team**

*Transform your creative agency with this production-ready website and CMS.*