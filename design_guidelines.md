# Dubai Logistics & Freight Website - Design Guidelines

## Design Approach
**Reference-Based:** Inspired by DHL Global and Maersk's corporate logistics websites - professional, trustworthy, comprehensive service presentation with clear navigation hierarchy.

## Color Palette
- **Primary:** #C8102E (Dubai red) - CTAs, headers, key highlights
- **Secondary:** #FFD700 (gold) - accents, icons, premium service indicators
- **Accent:** #1B365D (navy blue) - navigation, footer, secondary elements
- **Background:** #FFFFFF (white) - main content areas
- **Text:** #2C3E50 (dark slate) - body text, headings
- **Neutral:** #F8F9FA (light grey) - section backgrounds, cards

## Typography
- **Primary Font:** Montserrat (headings, navigation)
- **Secondary Font:** Open Sans (body text, descriptions)
- **Tertiary Font:** Roboto (buttons, labels)

**Hierarchy:**
- H1: 48px bold (hero headlines)
- H2: 36px bold (section titles)
- H3: 28px semibold (subsections)
- H4: 24px semibold (card titles)
- Body: 16px regular (content)
- Small: 14px (captions, meta info)

## Layout System
**Spacing:** Use Tailwind units of 4, 8, 12, and 20 (matching 20px base spacing)
- Section padding: py-20
- Card padding: p-8
- Element gaps: gap-8, gap-12
- Container max-width: max-w-7xl

## Component Library

### Navigation
- **Main Header:** Logo left, horizontal navigation center, search + language selector right
- **Breadcrumb:** On all pages below header (Home > Services > Air Freight)
- **Footer:** Multi-column (Services, Company, Resources, Contact) with quick links

### Hero Sections
- Full-width hero with Dubai skyline imagery
- Overlaid headline + subheading + dual CTAs
- Background images with gradient overlay (navy blue to transparent)
- Buttons with blurred backgrounds when on images
- Height: 70vh on homepage, 50vh on category pages

### Service Cards
- Grid layout: 3 columns desktop, 2 tablet, 1 mobile
- Card structure: Icon (gold) + Title + Description + "Learn More" link
- White background with subtle shadow on hover
- Consistent aspect ratios

### Forms
- Contact/Inquiry forms with clear labels
- Input fields with navy blue focus states
- Red CTA buttons
- Multi-step forms for complex service inquiries

### Search Functionality
- Global search bar in header
- Search results page with filtering by service category
- Autocomplete suggestions

## Page Templates

### Homepage
- Large hero with Dubai skyline
- Service categories overview (6 main cards)
- Why Choose Us section
- Recent case studies/testimonials
- CTA section

### Service Category Pages
- Medium hero with relevant imagery
- Service overview grid
- Process/timeline visualization
- Related services sidebar

### Service Detail Pages
- Breadcrumb navigation
- Service specifications table
- Benefits list
- Pricing request form
- FAQ accordion

### Contact/Inquiry Pages
- Split layout: form + contact information/map
- Office locations
- Response time indicator

## Images
**Hero Images:** Professional logistics photography featuring:
- Homepage: Dubai skyline with cargo ships/planes
- Air Freight: Aircraft loading cargo
- Sea Freight: Container ships at Jebel Ali Port
- Warehousing: Modern storage facilities
- Customs: Professional clearance operations

**Supporting Images:** Service-specific imagery throughout category and detail pages showing Dubai infrastructure, professional operations, and modern logistics technology.

## Key Interactions
- Smooth scrolling between sections
- Card hover elevations (subtle shadow increase)
- Navigation dropdown menus for service categories
- No distracting animations - keep professional and efficient
- Fast page transitions for 100-page navigation

## Accessibility
- WCAG 2.1 AA compliance
- Sufficient color contrast (especially white text on red/navy)
- Keyboard navigation support
- Alt text for all images