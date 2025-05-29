# minilink

A fast, secure, and minimalistic URL shortener built with modern web technologies. Transform long URLs into short, shareable links in seconds.

## ✨ Features

- **⚡ Lightning Fast** - Optimized for speed with 100/100 Lighthouse scores
- **🛡️ Secure** - Rate limiting, URL validation, and security headers
- **📱 Responsive** - Works perfectly on desktop and mobile
- **📊 Analytics** - Built-in click tracking and Vercel Analytics
- **🎨 Modern UI** - Clean, minimalistic design with shadcn/ui
- **🔄 Real-time** - Instant URL shortening without page reloads
- **📋 Copy to Clipboard** - One-click copying of shortened URLs

## 🚀 Live Demo

Visit [minilink.vercel.app](https://minilink.vercel.app) to try it out!

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/mehdiasadli/minilink.git
   cd minilink
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env
   ```

   Update `.env` with your values:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/minilink"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```

4. **Set up the database**

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy!

3. **Set up database**
   - Use [Vercel Postgres](https://vercel.com/storage/postgres)
   - Or connect your existing PostgreSQL database
   - Run migrations: `npx prisma migrate deploy`

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
NEXT_PUBLIC_BASE_URL="https://yourdomain.com"
```

## 📚 API Reference

### Shorten URL

**POST** `/api/shorten`

**Request Body:**

```json
{
  "url": "https://example.com/very/long/url"
}
```

**Response:**

```json
{
  "shortUrl": "https://minilink.com/abc123",
  "shortCode": "abc123",
  "originalUrl": "https://example.com/very/long/url"
}
```

### Access Short URL

**GET** `/{shortCode}`

Redirects to the original URL and increments click count.

## 🏗️ Project Structure

```
minilink/
├── app/                    # Next.js App Router
│   ├── [shortCode]/       # Dynamic route for redirects
│   ├── api/shorten/       # API route for URL shortening
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── sitemap.ts         # Dynamic sitemap
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── copy-button.tsx   # Copy to clipboard component
│   └── create-short-url-form.tsx # Create short URL form component
├── lib/                  # Utility functions
│   ├── db.ts            # Database connection
│   ├── rate-limit.ts    # Rate limiting logic
│   ├── schemas.ts       # Zod schemas for validation
│   └── utils.ts         # General utilities
├── prisma/              # Database schema and migrations
│   └── schema.prisma
└── public/              # Static assets
```

## 🔧 Configuration

### Database Schema

```sql
CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  short_code VARCHAR(10) UNIQUE NOT NULL,
  original_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  click_count INTEGER DEFAULT 0,
  expires_at TIMESTAMP NULL,
);
```

### Rate Limiting

- **20 requests per minute** per IP address
- Configurable in `lib/rate-limit.ts`
- Helps prevent abuse and spam

### Security Features

- ✅ Input validation and sanitization
- ✅ Rate limiting per IP
- ✅ Security headers (XSS, CSRF protection)
- ✅ URL validation (blocks malicious URLs)
- ✅ Private IP blocking
- ✅ Duplicate shortener prevention

## 📊 Analytics

Built-in analytics track:

- Page views and unique visitors
- URL shortening events
- Click-through rates
- Geographic distribution
- Device and browser usage

Access analytics in your Vercel dashboard.

## 🎨 Customization

### Themes

The app uses Tailwind CSS with shadcn/ui. Customize colors in:

- `app/globals.css`
- `components.json`

### Short Code Generation

Modify the algorithm in `lib/utils.ts`:

```typescript
export function generateShortCode(length: number = 6): string {
  // Custom logic here
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Vercel](https://vercel.com/) for seamless deployment
- [Prisma](https://www.prisma.io/) for the excellent database toolkit
- [Next.js](https://nextjs.org/) for the amazing React framework

## 📞 Support

If you have any questions or need help:

- 📧 Email: asadlimehdi25@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/mehdiasadli/minilink/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/mehdiasadli/minilink/discussions)

---

**Made with ❤️ by [Mehdi Asadli](https://github.com/mehdiasadli)**

⭐ **Star this repo if you found it helpful!**
