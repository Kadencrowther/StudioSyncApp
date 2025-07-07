# Studio Sync App

A modern React TypeScript application with authentication and a clean, modular architecture.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Kadencrowther/StudioSyncApp.git
cd StudioSyncApp
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Git Commands Quick Reference

### First Time Setup
```bash
git init
git add .
git commit -m "Your commit message"
git branch -M main
git remote add origin https://github.com/Kadencrowther/StudioSyncApp.git
git push -u origin main
```

### Regular Git Workflow
```bash
# Check status of your files
git status

# Add changes to staging
git add .  # Add all changes
# or
git add <specific-file>  # Add specific file

# Commit your changes
git commit -m "Describe your changes here"

# Push to GitHub
git push origin main
```

### Branching
```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Switch between branches
git checkout main

# Push a new branch to GitHub
git push -u origin feature/your-feature-name
```

## Project Structure

```
src/
  ├── components/     # React components
  ├── store/         # State management
  ├── lib/           # Utilities and configurations
  └── ...
```

## Features

- React with TypeScript
- Firebase Authentication
- Modern UI with Tailwind CSS
- Clean and modular architecture
- Form handling
- Protected routes
- User profile management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Deployment

The application is set up with multiple Firebase hosting environments for different deployment stages.

### Deployment URLs

Each environment has its own unique URL:

- **Production**: https://studiosync-af73d.web.app
- **Dev1**: https://dev1-studiosync-af73d.web.app
- **Dev2**: https://dev2-studiosync-af73d.web.app

### Deployment Process

1. **Build the Project First**
   ```bash
   # Always build before deploying
   npm run build
   ```
   Make sure the build completes without errors. Fix any TypeScript/build errors before proceeding.

2. **Choose Your Deployment Target**

   For Production:
   ```bash
   firebase deploy --only hosting:production
   ```

   For Dev1 Environment:
   ```bash
   firebase deploy --only hosting:dev1
   ```

   For Dev2 Environment:
   ```bash
   firebase deploy --only hosting:dev2
   ```

### Deployment Strategy

- Use `dev1` and `dev2` for testing new features
- Only deploy to `production` after thorough testing in dev environments
- Always build (`npm run build`) before any deployment
- Check the deployment URL after deployment to verify changes

### Troubleshooting Deployments

If you encounter target errors, you may need to clear and reapply the hosting targets:

```bash
# For dev1
firebase target:clear hosting dev1
firebase target:apply hosting dev1 dev1-studiosync-af73d

# For dev2
firebase target:clear hosting dev2
firebase target:apply hosting dev2 dev2-studiosync-af73d
```

### First-Time Setup

If you need to set up deployment for a new environment:

1. Create the hosting sites:
   ```bash
   firebase hosting:sites:create dev1-studiosync-af73d
   firebase hosting:sites:create dev2-studiosync-af73d
   ```

2. Apply the hosting targets:
   ```bash
   firebase target:apply hosting production studiosync-af73d.web.app
   firebase target:apply hosting dev1 dev1-studiosync-af73d
   firebase target:apply hosting dev2 dev2-studiosync-af73d
   ```

### Deployment Best Practices

1. Always deploy to dev environments first
2. Test thoroughly in dev before deploying to production
3. Check for build errors before deploying
4. Verify deployment by visiting the URL after deployment
5. Use meaningful commit messages before deployment
6. Run all tests before deploying
7. Check for any build warnings or errors
