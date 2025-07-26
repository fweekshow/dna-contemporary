# Base Miniapp Development Context

## Base Ecosystem Overview

Base is Coinbase's Layer 2 blockchain built on Ethereum, designed for the next billion users in crypto. It provides a secure, low-cost, and developer-friendly environment for building decentralized applications.

## Key Base Products

### Base App
- Mobile app that serves as the primary interface for Base users
- Supports miniapps - lightweight web applications that run natively within Base App
- Provides wallet functionality, notifications, and social features

### MiniKit
- SDK for building Base miniapps
- Provides hooks and components for Base App integration
- Handles wallet connections, notifications, frame sharing, and more

### Base Pay
- Payment processing solution for Base
- Enables direct purchases with cryptocurrency
- Handles both art and shipping costs

### Base Account
- User profile system connected to on-chain names (BaseNames)
- Provides identity and reputation on Base
- Integrates with social features

## Miniapp Development

### What is a Miniapp?
A miniapp is a lightweight web application designed to run natively within clients like Base App. It leverages MiniKit to provide a seamless user experience with wallet integration, frames, notifications, and primary buttons.

### Miniapp Manifest
Located at `public/.well-known/farcaster.json`, the manifest defines:
- App metadata (name, description, icon)
- Screenshots and hero images
- Category and tags
- Webhook endpoints
- Account association for BaseNames

### MiniKit Hooks

#### useMiniKit()
- Core hook that provides frame ready state and context
- Must be called before other MiniKit hooks

#### usePrimaryButton(config, callback)
- Sets the primary action button in Base App
- Config includes text and optional icon
- Callback executes when button is pressed

#### useAddFrame()
- Allows users to save the current frame to their profile
- Returns frame URL and token for sharing

#### useNotification()
- Sends push notifications to users
- Requires user permission

#### useViewProfile()
- Opens the user's profile in Base App
- Integrates with Base Account

#### useClose()
- Closes the miniapp and returns to Base App

## Development Best Practices

### 1. Provider Setup
```typescript
import { MiniKitProvider } from '@coinbase/onchainkit/minikit'
import { base } from 'viem/chains'

<MiniKitProvider
  apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
  chain={base}
  config={{
    appearance: {
      mode: 'auto',
      theme: 'snake',
      name: 'Your App Name',
      logo: '/logo.svg',
    },
  }}
>
  {children}
</MiniKitProvider>
```

### 2. Hook Usage
```typescript
const { setFrameReady, isFrameReady } = useMiniKit()

useEffect(() => {
  if (!isFrameReady) {
    setFrameReady()
  }
}, [setFrameReady, isFrameReady])

usePrimaryButton(
  { text: 'PRIMARY ACTION' },
  () => {
    // Handle primary action
  }
)
```

### 3. Error Handling
- Always wrap async operations in try-catch
- Handle cases where hooks may not be available
- Provide fallbacks for development vs production

### 4. Environment Variables
```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
```

## Common Patterns

### File Upload
```typescript
const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string
      // Handle uploaded image
    }
    reader.readAsDataURL(file)
  }
}
```

### State Management
```typescript
const [uploadedArtworks, setUploadedArtworks] = useState<Artwork[]>([])

// Persist to localStorage
useEffect(() => {
  if (uploadedArtworks.length > 0) {
    localStorage.setItem('artworks', JSON.stringify(uploadedArtworks))
  }
}, [uploadedArtworks])
```

### Base Pay Integration
```typescript
const handlePurchase = async (artwork: Artwork) => {
  try {
    // Base Pay integration would go here
    console.log('Processing purchase for:', artwork.title)
  } catch (error) {
    console.error('Purchase failed:', error)
  }
}
```

## Deployment Considerations

### Vercel Deployment
1. Connect GitHub repository
2. Set environment variables
3. Deploy with automatic builds
4. Configure custom domain

### Production Checklist
- [ ] Environment variables set
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Miniapp manifest updated with live domain
- [ ] Base Pay API keys configured
- [ ] Error monitoring set up

### Performance Optimization
- Optimize images for web
- Use proper caching headers
- Minimize bundle size
- Implement lazy loading

## Troubleshooting

### Common Issues
1. **Build Errors**: Check MiniKit import paths
2. **Runtime Errors**: Verify environment variables
3. **Frame Issues**: Ensure proper provider setup
4. **Notification Failures**: Check user permissions

### Debug Tips
- Use browser console for client-side debugging
- Check Vercel logs for build issues
- Test in Base App for miniapp-specific features
- Use React DevTools for state inspection

## Resources
- [Base Documentation](https://docs.base.org)
- [MiniKit Documentation](https://docs.base.org/onchainkit)
- [Base App Guide](https://docs.base.org/base-app)
- [Base Pay Documentation](https://docs.base.org/base-pay)
- [Base Account Documentation](https://docs.base.org/base-account) 