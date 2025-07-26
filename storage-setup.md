# DNA Contemporary - Production Storage Setup

## 🖼️ **Image Storage Options**

### **Option A: Cloudinary (Recommended for Art)**
- **Free tier**: 25GB storage, 25GB bandwidth/month
- **Perfect for art**: Automatic image optimization, transformations
- **Easy setup**: Simple API, good React integration

```bash
npm install cloudinary
```

### **Option B: AWS S3 + CloudFront**
- **Scalable**: Pay-as-you-go pricing
- **Global CDN**: Fast image delivery worldwide
- **More control**: Full AWS ecosystem

```bash
npm install @aws-sdk/client-s3
```

### **Option C: Vercel Blob Storage**
- **Simple**: Built into Vercel deployment
- **Automatic**: No additional setup needed
- **Limited**: 1GB free, then $0.20/GB

## 🗄️ **Database Options**

### **Option A: Supabase (Recommended)**
- **PostgreSQL**: Full relational database
- **Real-time**: Live updates for marketplace
- **Auth**: Built-in user authentication
- **Free tier**: 500MB database, 2GB bandwidth

### **Option B: PlanetScale**
- **MySQL**: Serverless database
- **Branching**: Database versioning
- **Free tier**: 1GB storage, 1B reads/month

### **Option C: MongoDB Atlas**
- **NoSQL**: Flexible document storage
- **Art data**: Perfect for varied artwork metadata
- **Free tier**: 512MB storage

## 🔧 **Implementation Steps**

### **Step 1: Choose Your Stack**
```
Frontend: Next.js (Vercel)
Images: Cloudinary
Database: Supabase
Payments: Base Pay
```

### **Step 2: Environment Variables**
```env
# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Base Pay
NEXT_PUBLIC_BASE_PAY_API_KEY=your_base_pay_key
```

### **Step 3: Database Schema**
```sql
-- Artworks table
CREATE TABLE artworks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  artist_name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT NOT NULL,
  cloudinary_public_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Users table (for Base Account integration)
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  base_account_id VARCHAR(255) UNIQUE,
  base_name VARCHAR(255),
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders table (for Base Pay integration)
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  artwork_id UUID REFERENCES artworks(id),
  buyer_id UUID REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  shipping_address JSONB,
  status VARCHAR(50) DEFAULT 'pending',
  base_pay_transaction_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🚀 **Deployment Checklist**

### **Vercel Deployment**
1. **Connect repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** with automatic builds

### **Domain Setup**
1. **Custom domain**: `dnacontemporary.com`
2. **SSL certificate**: Automatic with Vercel
3. **Base miniapp manifest**: Update with live domain

### **Base Integration**
1. **Base Pay API**: Set up payment processing
2. **Base Account**: Connect user profiles
3. **MiniKit**: Update with production config

## 💰 **Cost Estimates (Monthly)**

### **Free Tier Stack**
- **Vercel**: $0 (Hobby plan)
- **Cloudinary**: $0 (25GB free)
- **Supabase**: $0 (500MB free)
- **Total**: $0/month

### **Growth Stack (1000+ users)**
- **Vercel**: $20 (Pro plan)
- **Cloudinary**: $89 (Advanced plan)
- **Supabase**: $25 (Pro plan)
- **Total**: ~$134/month

## 🔄 **Migration from Current Setup**

### **Current State**
- Images: Data URLs in memory
- Data: localStorage only
- No persistence

### **Target State**
- Images: Cloudinary URLs
- Data: Supabase database
- Full persistence + real-time updates

## 📋 **Next Steps**

1. **Choose storage provider** (Cloudinary recommended)
2. **Set up database** (Supabase recommended)
3. **Update code** to use APIs instead of localStorage
4. **Test locally** with environment variables
5. **Deploy to Vercel** with production config
6. **Connect Base Pay** for real payments 