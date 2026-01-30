# Fleet Management System

A modern, full-stack fleet management platform with role-based access control, Excel file management, and comprehensive admin controls. Built with Next.js, MongoDB, and TypeScript.

## 🚀 Features

### **Manager Features**
- ✅ **Excel File Upload** - Upload `.xlsx` and `.xls` files with automatic parsing
- ✅ **Create Excel Files** - Create new spreadsheets from templates (Vehicle Register, Driver Log, Expense Tracker, or Blank)
- ✅ **Excel Editor** - Full-featured in-app Excel editor with:
  - Inline cell editing
  - Add/remove rows and columns
  - Rename headers
  - Auto-save (debounced 2 seconds)
  - Manual save button
- ✅ **File Management** - Duplicate, download, and delete Excel files
- ✅ **Personal Dashboard** - View stats, file list, and quick actions
- ✅ **Self-Signup** - Managers can create their own accounts

### **Admin Features**
- ✅ **User Management** - Create Admin and Manager accounts
- ✅ **User Directory** - View all users with file counts and details
- ✅ **File Oversight** - View all Excel files created by any manager
- ✅ **File Download** - Download any Excel file in the system
- ✅ **Dashboard Analytics** - View total admins, managers, files, and rows
- ✅ **Access Control** - Full system access and monitoring

### **Security & Authentication**
- ✅ JWT-based authentication with httpOnly cookies
- ✅ Role-based route protection (middleware)
- ✅ Secure file ownership validation
- ✅ Password hashing with bcrypt
- ✅ 7-day token expiration

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Theme:** Modern dark slate with cyan/indigo gradients
- **State Management:** React Hooks

### **Backend**
- **API:** Next.js API Routes (serverless-ready)
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken + jose)
- **File Processing:** xlsx library
- **Password Hashing:** bcryptjs

### **Dependencies**
- `next` - React framework
- `react` & `react-dom` - UI library
- `mongoose` - MongoDB ODM
- `xlsx` - Excel file parsing/generation
- `jsonwebtoken` & `jose` - JWT handling
- `bcryptjs` - Password hashing
- `tailwindcss` - CSS framework

## 📋 Prerequisites

- Node.js 18+ and npm
- MongoDB database (local or cloud like MongoDB Atlas)
- Modern web browser

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB Connection
   MONGO_URI=mongodb://localhost:27017/fleet-management
   # Or use MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/fleet-management

   # JWT Secret (use a strong random string)
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

   # Optional: For production deployments
   NODE_ENV=production
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
my-app/
├── app/
│   ├── api/                    # Next.js API Routes
│   │   ├── auth/               # Authentication endpoints
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   ├── logout/
│   │   │   └── me/
│   │   ├── excel/              # Excel management endpoints
│   │   │   ├── upload/
│   │   │   ├── create/
│   │   │   ├── admin/          # Admin-only file list
│   │   │   └── [id]/           # File operations
│   │   │       ├── download/
│   │   │       └── duplicate/
│   │   └── users/              # User management endpoints
│   │       ├── create/
│   │       └── route.ts         # List users
│   ├── admin/                  # Admin pages
│   │   └── dashboard/
│   ├── manager/                # Manager pages
│   │   └── dashboard/
│   ├── excel-edit/             # Excel editor page
│   ├── upload/                 # File upload page
│   ├── create-user/            # Create user page (Admin)
│   ├── user-list/              # User directory (Admin)
│   ├── login/                  # Login page
│   ├── signup/                 # Signup page
│   ├── settings/               # Settings page
│   └── page.tsx                # Home page
├── lib/
│   ├── api.ts                  # API fetch utility
│   ├── auth.ts                 # Authentication utilities
│   ├── config.ts               # Configuration
│   ├── db.ts                   # MongoDB connection
│   └── models/                 # Database models
│       ├── User.ts
│       └── ExcelFile.ts
├── components/
│   └── SignOutButton.tsx
├── hooks/
│   └── useCurrentUser.ts
├── middleware.ts               # Route protection
├── types/
│   └── user.ts
└── server/                     # Legacy Express server (optional)
    ├── routes/
    ├── controllers/
    └── models/
```

## 🔌 API Routes

### **Authentication Routes**

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| POST | `/api/auth/signup` | Create new Manager account | Public |
| POST | `/api/auth/login` | Login and get JWT token | Public |
| POST | `/api/auth/logout` | Clear authentication cookie | Authenticated |
| GET | `/api/auth/me` | Get current user profile | Authenticated |

### **Excel Management Routes**

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| GET | `/api/excel` | List manager's Excel files | Manager |
| POST | `/api/excel/upload` | Upload and parse Excel file | Manager |
| POST | `/api/excel/create` | Create Excel from template | Manager |
| GET | `/api/excel/[id]` | Get Excel file data | Manager/Admin |
| PUT | `/api/excel/[id]` | Update Excel file | Manager/Admin |
| DELETE | `/api/excel/[id]` | Delete Excel file | Manager |
| POST | `/api/excel/[id]/duplicate` | Duplicate Excel file | Manager |
| GET | `/api/excel/[id]/download` | Download as .xlsx | Manager/Admin |
| GET | `/api/excel/admin` | List all Excel files with owners | Admin |

### **User Management Routes**

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| GET | `/api/users` | List all users | Admin |
| POST | `/api/users/create` | Create Admin or Manager | Admin |

## 🎨 Frontend Routes

### **Public Routes**
- `/` - Home page with features and CTA
- `/login` - Login page
- `/signup` - Manager signup page

### **Manager Routes** (Protected)
- `/manager/dashboard` - Manager dashboard with file list
- `/upload` - Excel file upload page
- `/excel-edit?id=[fileId]` - Excel editor page

### **Admin Routes** (Protected)
- `/admin/dashboard` - Admin dashboard with analytics and file oversight
- `/create-user` - Create new user accounts
- `/user-list` - User directory with file counts
- `/settings` - Platform settings (placeholder)

## 🗄️ Database Models

### **User Model**
```typescript
{
  _id: ObjectId
  name: string
  email: string (unique, lowercase)
  password: string (hashed)
  role: "ADMIN" | "MANAGER"
  createdAt: Date
  updatedAt: Date
}
```

### **ExcelFile Model**
```typescript
{
  _id: ObjectId
  ownerId: ObjectId (ref: User)
  name: string
  headers: string[]
  rows: Record<string, any>[]
  createdAt: Date
  updatedAt: Date
}
```

## 🔐 Security Features

1. **Authentication**
   - JWT tokens stored in httpOnly cookies
   - 7-day token expiration
   - Secure password hashing with bcrypt (10 salt rounds)

2. **Authorization**
   - Role-based access control (RBAC)
   - Route-level protection via middleware
   - API-level role validation
   - File ownership validation for managers

3. **Data Protection**
   - Passwords never stored in plain text
   - User IDs validated as MongoDB ObjectIds
   - File access restricted by ownership (managers) or role (admins)

4. **Input Validation**
   - Email format validation
   - Password minimum length (6 characters)
   - File type validation (.xlsx, .xls only)
   - Excel file structure validation

## 👥 Role-Based Access Control

### **Manager Role**
- ✅ Self-signup capability
- ✅ Upload Excel files
- ✅ Create Excel files from templates
- ✅ Edit own Excel files
- ✅ Download own Excel files
- ✅ Duplicate own Excel files
- ✅ Delete own Excel files
- ❌ Cannot view other managers' files
- ❌ Cannot create users
- ❌ Cannot access admin routes

### **Admin Role**
- ✅ Create Admin and Manager accounts
- ✅ View all users
- ✅ View all Excel files (with owner info)
- ✅ Download any Excel file
- ✅ Edit any Excel file
- ✅ View user statistics
- ✅ Access admin dashboard
- ❌ Cannot self-signup (must be created by another admin)
- ❌ Cannot delete files (only managers can delete their own)

## 📊 Excel File Management

### **Supported File Formats**
- `.xlsx` (Excel 2007+)
- `.xls` (Excel 97-2003)

### **Templates Available**
1. **Vehicle Register** - Vehicle ID, Make, Model, Year, Registration, Status, Last Service
2. **Driver Log** - Driver ID, Name, License Number, Phone, Email, Status
3. **Expense Tracker** - Date, Category, Description, Amount, Vehicle ID, Payment Method
4. **Blank** - Empty spreadsheet with 3 default columns

### **Excel Editor Features**
- **Inline Editing** - Click any cell to edit
- **Add Rows** - Add new data rows
- **Remove Rows** - Delete unwanted rows
- **Add Columns** - Add new data columns
- **Remove Columns** - Delete columns (minimum 1 required)
- **Rename Headers** - Edit column names
- **Auto-Save** - Automatically saves changes after 2 seconds of inactivity
- **Manual Save** - Save button for immediate save
- **Real-time Updates** - Changes reflected immediately in UI

## 🎨 UI/UX Design

### **Color Scheme**
- **Background:** Dark slate (slate-950)
- **Primary Accent:** Cyan (cyan-400/500)
- **Secondary Accent:** Indigo (indigo-400/500)
- **Text:** Light slate (slate-50/100/200)
- **Borders:** Dark slate (slate-800)

### **Design Principles**
- Modern, professional appearance
- Consistent gradient accents
- Responsive design (mobile-first)
- Clear visual hierarchy
- Intuitive navigation
- Accessible color contrasts

## 🚀 Deployment

### **Vercel Deployment** (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `MONGO_URI`
     - `JWT_SECRET`
     - `NODE_ENV=production`

3. **Deploy**
   - Vercel will automatically detect Next.js
   - Build and deploy automatically

### **Environment Variables for Production**
```env
MONGO_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
```

### **Build Commands**
```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (localhost:3000) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run server` | Start legacy Express server (optional) |

## 🔍 Key Features Explained

### **File Upload Process**
1. User selects `.xlsx` or `.xls` file
2. File is read into memory as buffer
3. xlsx library parses the file
4. First sheet is extracted
5. Headers are extracted from first row
6. Data rows are converted to JSON objects
7. File metadata and data saved to MongoDB
8. User redirected to editor

### **File Download Process**
1. File data retrieved from MongoDB
2. Headers and rows converted to 2D array
3. xlsx library creates workbook
4. Buffer generated
5. Browser downloads file with proper MIME type

### **Auto-Save Mechanism**
- Debounced save function (2-second delay)
- Saves automatically after user stops typing
- Manual save button for immediate save
- Success/error feedback to user

## 🐛 Troubleshooting

### **Common Issues**

1. **MongoDB Connection Error**
   - Verify `MONGO_URI` is correct
   - Check MongoDB is running (if local)
   - Verify network access (if cloud)

2. **JWT Errors**
   - Ensure `JWT_SECRET` is set
   - Clear browser cookies and re-login
   - Check token expiration (7 days)

3. **Excel Upload Fails**
   - Verify file is `.xlsx` or `.xls`
   - Check file is not corrupted
   - Ensure file has at least one row

4. **Permission Denied**
   - Verify user role in database
   - Check middleware configuration
   - Ensure cookies are enabled

## 📚 Additional Notes

- **File Storage:** Excel files are stored as JSON in MongoDB (not as binary files)
- **File Size:** No explicit limit, but large files may impact performance
- **Concurrent Editing:** Not supported (single-user editing)
- **File History:** Not implemented (no version control)
- **Export Formats:** Only `.xlsx` export supported

## 🎯 Future Enhancements

Potential features to consider:
- [ ] File versioning/history
- [ ] Real-time collaboration
- [ ] Advanced Excel formatting
- [ ] File sharing between users
- [ ] Email notifications
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] Activity logs/audit trail
- [ ] File search and filtering
- [ ] Bulk operations
- [ ] CSV import/export
- [ ] Data validation rules
- [ ] Charts and visualizations

## 👨‍💻 Development

### **Code Style**
- TypeScript for type safety
- ESLint for code quality
- Consistent naming conventions
- Component-based architecture

### **File Naming**
- Pages: `page.tsx`
- API Routes: `route.ts`
- Components: PascalCase (e.g., `SignOutButton.tsx`)
- Utilities: camelCase (e.g., `useCurrentUser.ts`)

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

Built with modern web technologies and best practices for security, performance, and user experience.

---

**Version:** 1.0.0  
**Last Updated:** 2025  
**Maintained by:** Development Team
