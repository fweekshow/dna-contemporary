# DNA Contemporary - Art Marketplace

A modern art marketplace built as a Base miniapp, allowing artists to upload and sell their work with Base Pay integration.

## 🎨 Features

- **Art Upload**: Artists can upload images and set details
- **Browse Artwork**: Discover and purchase unique pieces
- **Base Pay Integration**: Direct purchases with cryptocurrency
- **Base Miniapp**: Native integration with Base App
- **Real-time Updates**: Live marketplace updates
- **Responsive Design**: Works on all devices

## 🚀 Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Blockchain**: Base network integration
- **Miniapp**: MiniKit for Base App integration
- **Payments**: Base Pay (coming soon)

## 📱 Miniapp Features

- **Primary Button**: "BROWSE ART" in Base App
- **Frame Sharing**: Save and share artwork frames
- **Notifications**: Alert users about new art
- **Profile Integration**: Connect with Base Account
- **Close Functionality**: Exit miniapp

## 🛠️ Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Base App (for testing miniapp features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd art-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Push to GitHub
   - Import project in Vercel dashboard
   - Set environment variables

2. **Custom Domain**
   - Add `dnacontemporary.com` in Vercel
   - Update Base miniapp manifest

3. **Environment Variables**
   ```
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_production_key
   ```

## 📋 Project Structure

```
art-store/
├── public/
│   ├── .well-known/farcaster.json  # Base miniapp manifest
│   ├── LifeAfterDeath.png          # Featured artwork
│   └── placeholder.svg             # Placeholder images
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with providers
│   │   ├── page.tsx                # Main marketplace page
│   │   └── providers.tsx           # MiniKit provider setup
│   ├── components/
│   │   ├── ui/                     # shadcn/ui components
│   │   └── ...                     # Custom components
│   ├── data/
│   │   └── mock-data.ts            # Sample data
│   ├── lib/
│   │   └── utils.ts                # Utility functions
│   └── types/
│       └── index.ts                # TypeScript definitions
└── storage-setup.md                # Production storage guide
```

## 🎯 Current Status

### ✅ Implemented
- [x] Base miniapp integration
- [x] Art upload functionality
- [x] Browse artwork interface
- [x] MiniKit hooks and providers
- [x] Responsive design
- [x] Local storage persistence

### 🚧 In Progress
- [ ] Base Pay integration
- [ ] Cloudinary image storage
- [ ] Supabase database
- [ ] User authentication

### 📋 Planned
- [ ] Store connector (Shopify/WooCommerce)
- [ ] Real-time notifications
- [ ] Advanced search/filtering
- [ ] Artist profiles

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Adding New Components

```bash
# Add shadcn/ui component
npx shadcn@latest add [component-name]

# Example
npx shadcn@latest add dialog
```

## 🌐 Base Miniapp

This project is designed as a Base miniapp, providing a native experience within the Base App ecosystem.

### Manifest Configuration

The miniapp manifest is located at `public/.well-known/farcaster.json` and includes:

- App metadata and branding
- Screenshot URLs
- Category and tags
- Webhook endpoints

### MiniKit Integration

Uses MiniKit hooks for Base App integration:

- `usePrimaryButton` - Main action button
- `useAddFrame` - Frame sharing
- `useNotification` - Push notifications
- `useViewProfile` - User profiles
- `useClose` - App exit

## 📞 Support

For questions or issues:

1. Check the [Base miniapp documentation](https://docs.base.org/base-app/introduction/getting-started)
2. Review [MiniKit documentation](https://docs.base.org/onchainkit/wallet/wallet)
3. Open an issue in this repository

## 📄 License

This project is licensed under the MIT License.

---

**DNA Contemporary** - Art marketplace powered by Base 🎨
