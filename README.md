# StudyTracker - Student Planner & Academic Tracker

A comprehensive web application designed to help students organize their academic life, track progress, and achieve their educational goals. This is a premium template available on the Wiecodes marketplace.

## 🎯 Overview

StudyTracker is a modern, responsive web application built with Next.js 14 that provides students with powerful tools to manage their academic journey. From semester planning to GPA tracking, this template offers everything needed for academic success.

## ✨ Features

### 📚 Semester Planner
- Set academic goals and milestones
- Track progress with visual indicators
- Priority-based task management
- Deadline tracking and reminders
- Progress visualization with charts

### 📅 Class Scheduler
- Weekly class schedule organization
- Time management tools
- Visual calendar interface
- Customizable schedule layouts
- Drag-and-drop functionality

### ✅ Assignment Tracker
- Track assignments and deadlines
- Progress monitoring
- Priority categorization
- Completion status tracking
- Reminder system

### 🧮 GPA Calculator
- Calculate and track GPA
- Grade point monitoring
- Academic performance insights
- Historical GPA tracking
- Semester-wise breakdown

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: Dark/Light mode support
- **State Management**: React hooks with localStorage persistence
- **TypeScript**: Full type safety

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18.0.0 or higher)
- **npm** or **pnpm** package manager
- **Git** for version control

### Installation

1. **Clone the template**
   ```bash
   git clone <repository-url>
   cd StudyTracker-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

1. **Build the application**
   ```bash
   npm run build
   # or
   pnpm build
   ```

2. **Start the production server**
   ```bash
   npm start
   # or
   pnpm start
   ```

## 📁 Project Structure

```
StudyTracker-main/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with footer
│   ├── page.tsx           # Main application page
│   └── globals.css        # Global styles
├── components/             # React components
│   ├── ui/                # Reusable UI components (shadcn/ui)
│   ├── Footer.tsx         # Application footer
│   ├── login-modal.tsx    # Authentication modal
│   ├── semester-planner.tsx    # Semester planning component
│   ├── class-scheduler.tsx     # Class scheduling component
│   ├── assignment-tracker.tsx  # Assignment tracking component
│   └── gpa-calculator.tsx     # GPA calculation component
├── lib/                    # Utility functions
├── public/                 # Static assets
│   ├── favicon.ico        # Browser favicon
│   └── favicon.png        # Apple touch icon
├── styles/                 # Additional styles
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Customization

### Color Scheme
The template uses a teal color scheme that can be customized in `tailwind.config.ts`:
```typescript
colors: {
  teal: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    // ... other shades
    600: "#008080", // Primary color
  }
}
```

### Theme Customization
- Dark/Light mode support
- Customizable component styles
- Responsive design system
- Animation configurations

### Component Customization
All components are modular and can be easily customized:
- Update component props
- Modify styling classes
- Add new features
- Integrate with external APIs

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_APP_NAME=StudyTracker
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Tailwind Configuration
The template includes a comprehensive Tailwind configuration with:
- Custom color palette
- Typography scales
- Animation utilities
- Responsive breakpoints

### TypeScript Configuration
Full TypeScript support with:
- Strict type checking
- Path aliases
- Component type definitions
- API type safety

## 📱 Responsive Design

The template is fully responsive and optimized for:
- **Mobile devices** (320px+)
- **Tablets** (768px+)
- **Desktop** (1024px+)
- **Large screens** (1440px+)

## 🎯 Key Features

### 🎨 Modern Design
- Clean, intuitive interface
- Responsive design for all devices
- Dark and light theme support
- Smooth animations and transitions
- Accessibility compliant

### 🔐 User Authentication
- Local authentication system
- Guest mode support
- Persistent user sessions
- Secure data storage
- User profile management

### 📊 Data Management
- Local storage persistence
- Real-time updates
- Data export/import
- Backup and restore
- Privacy-focused

### 🚀 Performance
- Optimized bundle size
- Lazy loading components
- Image optimization
- Caching strategies
- SEO optimized

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This template is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- **Developer**: Keshavv
- **Template Platform**: [Wiecodes](https://wiecodes.com)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 📞 Support

For support, questions, or feature requests:
- **Template Marketplace**: [Wiecodes](https://wiecodes.com)
- **Documentation**: Check the inline code comments
- **Issues**: Open an issue in the repository

## 🔄 Updates

This template is regularly updated with:
- Security patches
- Performance improvements
- New features
- Bug fixes
- Compatibility updates

## 📈 Roadmap

Future updates may include:
- Cloud synchronization
- Advanced analytics
- Mobile app version
- API integrations
- Advanced reporting

---

**Built with ❤️ by Keshav for the Wiecodes marketplace**

*Empowering students worldwide with better academic organization tools*
