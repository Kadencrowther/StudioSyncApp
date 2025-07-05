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
