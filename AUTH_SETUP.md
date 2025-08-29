# Authentication Setup Guide for ALX Polly

This guide will help you set up user authentication for your Next.js polling app using Supabase.

## Prerequisites

- A Supabase account and project
- Node.js and npm installed
- Basic knowledge of Next.js and React

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Click "New Project"
3. Choose your organization and enter project details
4. Wait for the project to be created (this may take a few minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project-id.supabase.co`)
   - **Anon/public key** (starts with `eyJ...`)
   - **Service role key** (starts with `eyJ...`)

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add the following environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**Important:** Replace the placeholder values with your actual Supabase credentials.

## Step 4: Configure Supabase Authentication

1. In your Supabase dashboard, go to **Authentication** → **Settings**
2. Configure the following settings:

### Site URL
Set your site URL (for development, use `http://localhost:3000`)

### Redirect URLs
Add these redirect URLs:
- `http://localhost:3000/auth/callback`
- `http://localhost:3000/auth/reset-password`

### Email Templates
Customize your email templates for:
- Email confirmation
- Password reset
- Magic link (if using)

## Step 5: Enable Email Authentication

1. In **Authentication** → **Providers**
2. Ensure **Email** is enabled
3. Configure email settings as needed

## Step 6: Test the Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/auth`
3. Try creating a new account
4. Check your email for confirmation
5. Try signing in

## Features Included

### Authentication Context
- User state management
- Sign in/up functionality
- Password reset
- Sign out
- Session persistence

### Protected Routes
- `/polls/create` - Requires authentication
- Automatic redirects for unauthenticated users
- Loading states and error handling

### Navigation Updates
- Dynamic navigation based on auth state
- User email display
- Sign out button

### Middleware Protection
- Route-level authentication
- Automatic redirects
- Session validation

## File Structure

```
├── contexts/
│   └── AuthContext.tsx          # Authentication context
├── components/
│   ├── ProtectedRoute.tsx       # Route protection component
│   └── navigation.tsx           # Updated navigation
├── app/
│   ├── auth/
│   │   └── page.tsx            # Authentication page
│   ├── polls/
│   │   └── create/
│   │       └── page.tsx        # Protected create poll page
│   └── layout.tsx              # Root layout with AuthProvider
├── lib/
│   └── supabase.ts             # Supabase client configuration
└── middleware.ts                # Authentication middleware
```

## Customization

### Adding More Protected Routes
1. Update the `protectedRoutes` array in `middleware.ts`
2. Wrap the component with `<ProtectedRoute>` component

### Custom User Fields
1. Create a `profiles` table in Supabase
2. Update the AuthContext to include profile data
3. Modify the sign-up process to include additional fields

### Social Authentication
1. Enable providers in Supabase dashboard
2. Update the AuthContext with social auth methods
3. Add social login buttons to the auth page

## Troubleshooting

### Common Issues

1. **Environment variables not loading**
   - Ensure `.env.local` is in the project root
   - Restart your development server
   - Check for typos in variable names

2. **Authentication not working**
   - Verify Supabase credentials
   - Check browser console for errors
   - Ensure email confirmation is enabled

3. **Redirect loops**
   - Check middleware configuration
   - Verify protected route definitions
   - Clear browser cookies and local storage

### Debug Mode

Enable debug logging by adding this to your Supabase client:

```typescript
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    debug: true
  }
})
```

## Security Considerations

1. **Never expose service role key** in client-side code
2. **Use Row Level Security (RLS)** in Supabase for data protection
3. **Validate user permissions** before allowing actions
4. **Implement proper error handling** to avoid information leakage

## Next Steps

1. Set up database tables for polls and votes
2. Implement user profiles and preferences
3. Add role-based access control
4. Set up email notifications
5. Add social authentication providers

## Support

If you encounter issues:
1. Check the [Supabase documentation](https://supabase.com/docs)
2. Review the [Next.js documentation](https://nextjs.org/docs)
3. Check the browser console for error messages
4. Verify your environment variables are correctly set
