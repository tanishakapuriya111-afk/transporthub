# Contact Form & Admin Panel Documentation

## Overview

This application now includes a complete contact form system with database storage and an admin panel to manage contact submissions.

## Features

### Contact Form (`/contact`)

- **Form Fields**: Name, Email, Company (optional), Subject, Message
- **Real-time Validation**: Required fields validation
- **Loading States**: Shows "Sending..." when submitting
- **Success/Error Messages**: Clear feedback to users
- **Database Storage**: All submissions are stored in the database (Firebase removed - ready for MongoDB integration)

### Admin Panel (`/admin`)

- **View All Submissions**: See all contact form submissions
- **Filter Messages**: Filter by status (All, New, Read, Replied)
- **Statistics**: View total messages, unread count, and replied count
- **Mark as Read**: Mark messages as read
- **Reply via Email**: Direct email links to respond to customers
- **Real-time Updates**: Refresh data and see live updates

## Database Structure

### Database Collection: `contacts` (ready for MongoDB)

Each contact submission is stored with the following fields:

```javascript
{
  name: string,
  email: string,
  company: string (optional),
  subject: string,
  message: string,
  createdAt: timestamp,
  status: 'new' | 'read' | 'replied',
  read: boolean
}
```

## How to Use

### For Users

1. Navigate to `/contact`
2. Fill out the contact form
3. Submit the form
4. Receive confirmation message

### For Admins

1. Sign in to your account
2. Click on your profile dropdown in the navbar
3. Select "Admin Panel"
4. View and manage all contact submissions
5. Use filters to organize messages
6. Mark messages as read
7. Reply to customers via email

## Technical Implementation

### Files Created/Modified

- `src/services/contactService.js` - Database operations
- `src/components/pages/ContactPage.js` - Updated with form submission
- `src/components/pages/AdminPage.js` - New admin interface
- `src/App.js` - Added admin route
- `src/components/layout/Navbar.js` - Added admin link
- `src/styles/styles.css` - Added styling for admin panel

### Key Functions

- `submitContactForm()` - Saves form data to database
- `getAllContacts()` - Retrieves all contact submissions
- `markContactAsRead()` - Updates message status

## Security

- Admin panel is protected with authentication
- Only authenticated users can access `/admin`
- Form data is validated before submission

## Future Enhancements

- Email notifications for new submissions
- Bulk actions (mark multiple as read)
- Export functionality
- Advanced search and filtering
- Reply templates
- Message threading
