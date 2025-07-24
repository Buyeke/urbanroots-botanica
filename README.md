# Urban Roots Botanica

A modern React-based agricultural intelligence platform built for smart farming solutions.

## Project Overview

Urban Roots Botanica is a comprehensive farming intelligence dashboard that provides farmers with AI-powered insights, crop management tools, and data-driven decision support systems.

**Live Project**: https://lovable.dev/projects/ee06e01a-adc0-4213-9d55-865a1de0013e

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router
- **State Management**: React Context/Hooks
- **Authentication**: Custom auth implementation

## Development Environment Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Git

We recommend using [nvm](https://github.com/nvm-sh/nvm) for Node.js version management.

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Buyeke/urbanroots-botanica.git
   cd urbanroots-botanica
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Local development: `http://localhost:5173`
   - The development server includes hot-reloading for immediate feedback

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## Development Workflows

### Option 1: Lovable Platform
- Visit the [Lovable Project](https://lovable.dev/projects/ee06e01a-adc0-4213-9d55-865a1de0013e)
- Make changes through the Lovable interface
- Changes are automatically committed to the repository

### Option 2: Local IDE Development
- Clone the repository and work with your preferred IDE
- Push changes to sync with Lovable platform
- Standard Git workflow applies

### Option 3: GitHub Web Interface
- Navigate to files in the GitHub repository
- Use the edit button (pencil icon) for quick changes
- Commit changes directly through the web interface

### Option 4: GitHub Codespaces
- Click "Code" → "Codespaces" → "New codespace"
- Full development environment in the browser
- Commit and push changes when complete

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ...
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── ...
```

## Key Features

- **Authentication System**: Secure user login/signup with demo access
- **Dashboard Interface**: Comprehensive farming intelligence dashboard
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript Support**: Full type safety throughout the application
- **Component Library**: Built with shadcn/ui for consistent design

## Authentication Flow

The application includes:
- User registration and login
- Demo account access for testing
- Protected routes requiring authentication
- Proper loading states and error handling

## Deployment

### Lovable Platform Deployment
1. Open the Lovable project interface
2. Navigate to Share → Publish
3. Follow the deployment prompts

### Custom Domain Setup
1. Go to Project → Settings → Domains
2. Click "Connect Domain"
3. Follow the domain configuration steps

For detailed domain setup instructions, refer to the [Lovable documentation](https://docs.lovable.dev).

## Contributing

### Code Standards
- Follow TypeScript best practices
- Use ESLint configuration provided
- Maintain consistent code formatting
- Write descriptive commit messages

### Pull Request Process
1. Create a feature branch from `main`
2. Make your changes with appropriate tests
3. Ensure all linting passes
4. Submit a pull request with detailed description

## Environment Variables

Create a `.env.local` file for local development:

```env
# Add your environment variables here
VITE_API_URL=your_api_url
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## Troubleshooting

### Common Issues

**Build Failures**
- Ensure Node.js version compatibility
- Clear `node_modules` and reinstall dependencies
- Check for TypeScript errors

**Development Server Issues**
- Verify port 5173 is available
- Check for firewall restrictions
- Restart the development server

**Authentication Problems**
- Verify environment variables are set
- Check network connectivity
- Review browser console for errors

## Support and Documentation

- **Lovable Platform**: [https://docs.lovable.dev](https://docs.lovable.dev)
- **React Documentation**: [https://react.dev](https://react.dev)
- **Tailwind CSS**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **shadcn/ui**: [https://ui.shadcn.com](https://ui.shadcn.com)

## License

This project is proprietary software. All rights reserved.

---

For technical questions or support, please contact the development team.
