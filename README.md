# ALX Polly - Modern Polling Application

A modern, responsive polling application built with Next.js 15, TypeScript, and Tailwind CSS. Create polls, vote on them, and see real-time results with a beautiful, intuitive interface.

## 🚀 Features

- **User Authentication**: Sign up and sign in functionality (placeholder)
- **Create Polls**: Build custom polls with multiple options and expiration dates
- **Vote on Polls**: Interactive voting with real-time updates
- **View Results**: Beautiful charts and statistics for poll outcomes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Built with Shadcn UI components and Tailwind CSS

## 🏗️ Project Structure

```
alx-polly/
├── app/
│   ├── auth/                 # Authentication pages
│   │   └── page.tsx         # Login/Signup form
│   ├── polls/               # Poll-related pages
│   │   ├── page.tsx         # Polls listing and voting
│   │   └── create/
│   │       └── page.tsx     # Create new poll form
│   ├── components/          # Reusable components
│   │   ├── ui/             # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   └── textarea.tsx
│   │   └── navigation.tsx  # Main navigation component
│   ├── lib/                # Utility functions
│   │   └── utils.ts        # Common utilities (cn function)
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # Poll, User, and other interfaces
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout with navigation
│   └── page.tsx            # Landing page
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI (Radix UI primitives)
- **Icons**: Lucide React
- **State Management**: React hooks (useState)
- **Routing**: Next.js built-in routing

## 📦 Dependencies

### Core Dependencies
- `next`: 15.5.2
- `react`: 19.1.0
- `react-dom`: 19.1.0

### UI and Styling
- `@radix-ui/react-slot`: For component composition
- `@radix-ui/react-dialog`: Modal dialogs
- `@radix-ui/react-dropdown-menu`: Dropdown menus
- `@radix-ui/react-form`: Form primitives
- `@radix-ui/react-label`: Accessible labels
- `@radix-ui/react-select`: Select components
- `@radix-ui/react-tabs`: Tab components
- `@radix-ui/react-toast`: Toast notifications
- `class-variance-authority`: Component variants
- `clsx`: Conditional class names
- `tailwind-merge`: Tailwind class merging
- `lucide-react`: Beautiful icons

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd alx-polly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint (if configured)

## 🎯 Key Features Explained

### 1. Authentication System
- **Location**: `/app/auth/page.tsx`
- **Features**: Toggle between login and signup forms
- **Components**: Form inputs, validation, and state management
- **Status**: Placeholder implementation (ready for backend integration)

### 2. Polls Listing
- **Location**: `/app/polls/page.tsx`
- **Features**: Display all polls, vote functionality, real-time results
- **Components**: Poll cards, voting buttons, progress bars
- **Data**: Mock data for demonstration (ready for API integration)

### 3. Create Poll
- **Location**: `/app/polls/create/page.tsx`
- **Features**: Dynamic form with add/remove options, validation
- **Components**: Form inputs, option management, date picker
- **Validation**: Client-side form validation with error handling

### 4. Navigation
- **Location**: `/app/components/navigation.tsx`
- **Features**: Responsive navigation with active state indicators
- **Routing**: Next.js Link components for client-side navigation

## 🎨 UI Components

The application uses a custom component library built on top of Shadcn UI:

- **Button**: Multiple variants (default, outline, secondary, ghost, link)
- **Card**: Flexible card layout with header, content, and footer
- **Input**: Styled form inputs with focus states
- **Label**: Accessible form labels
- **Textarea**: Multi-line text input for descriptions

## 🔧 Customization

### Styling
- Modify `app/globals.css` for global styles
- Update Tailwind classes in components for design changes
- Customize component variants in individual component files

### Adding New Features
- Create new routes in the `app` directory
- Add new UI components in `app/components/ui`
- Extend types in `app/types/index.ts`

## 🚧 Future Enhancements

- **Backend Integration**: Connect to a real API for data persistence
- **User Management**: Complete authentication system with user profiles
- **Real-time Updates**: WebSocket integration for live poll updates
- **Advanced Analytics**: Detailed poll statistics and insights
- **Poll Categories**: Organize polls by topics or themes
- **Social Features**: Share polls, follow users, and comment system

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured interface with hover effects
- **Tablet**: Adapted layout for medium screens
- **Mobile**: Touch-friendly interface with stacked layouts

## 🎯 Performance Features

- **Next.js 15**: Latest features and optimizations
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS for rapid development
- **Component Optimization**: Efficient React components with proper memoization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
