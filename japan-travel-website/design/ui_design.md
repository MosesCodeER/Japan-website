# Japan Travel Website UI Design

## Color Palette
- **Primary**: #E63946 (Japanese Red) - For primary buttons, important elements
- **Secondary**: #1D3557 (Deep Blue) - For headers, navigation
- **Accent**: #F1FAEE (Off-White) - For backgrounds
- **Highlight**: #A8DADC (Light Blue) - For secondary elements, highlights
- **Dark**: #457B9D (Medium Blue) - For text, icons

## Typography
- **Headings**: Montserrat, bold
- **Body Text**: Open Sans, regular
- **Accent Text**: Noto Sans JP (for Japanese characters)

## Component Design

### Navigation
- Sticky top navigation bar
- Mobile: Hamburger menu with slide-out drawer
- Desktop: Horizontal menu with dropdowns
- User account icon/avatar in top right
- Search icon that expands to search bar

### Cards
- Activity/Food Cards:
  - Rounded corners (8px)
  - Subtle shadow
  - Image at top (16:9 ratio)
  - Title, brief description, and metadata below
  - Hover effect: slight scale and shadow increase

### Buttons
- Primary: Filled red (#E63946) with white text
- Secondary: Outlined blue (#1D3557) with blue text
- Tertiary: Text-only with underline on hover
- All buttons have subtle hover animations

### Image Galleries
- Grid layout with masonry style
- Lightbox effect on click
- Lazy loading for performance
- Swipe gestures on mobile

### Forms
- Clean, minimal design
- Floating labels
- Inline validation
- Progress indicators for multi-step forms

## Page-Specific Designs

### Home Page
- Full-width hero slider with parallax effect
- Search bar overlaid on hero image
- Category icons with labels in a scrollable horizontal row
- Featured activities in a card grid
- Testimonials in a carousel

### Activities Page
- Filter sidebar (collapsible on mobile)
- Toggle between grid and list view
- Sorting options (popularity, price, etc.)
- Lazy-loading pagination

### User Authentication
- Modal login/signup forms
- Social login options
- Clean, minimal design
- Success/error states

### Flight Booking
- Multi-step form with progress indicator
- Calendar picker with price indicators
- Results in sortable table/card format
- Filters for airlines, stops, price range

## Responsive Breakpoints
- Mobile: 0-640px
- Tablet: 641px-1024px
- Desktop: 1025px+

## Interactive Elements
- Subtle hover animations
- Loading states (skeleton screens)
- Micro-interactions (button clicks, form submissions)
- Toast notifications for user actions
- Smooth page transitions

## Accessibility Considerations
- High contrast between text and background
- Keyboard navigation support
- Screen reader compatibility
- Focus states for interactive elements
- Alternative text for images
