# Salman Mehar - Shopify Custom Theme Test

This is a custom Shopify theme based on Dawn, created as part of a technical assessment. The theme includes custom sections for a landing page with product grid and popup functionality.

## 🚀 Features

### Custom Banner Section
- Fully customizable banner with editable text fields
- Animated buttons with hover effects
- Responsive design for mobile and desktop
- Gradient background with shimmer animation
- Smooth fade-in animations for content

### Custom Product Grid Section
- Display up to 6 products in a responsive grid
- Product selection via Shopify customizer
- Interactive product cards with hover effects
- Quick view popup functionality
- Mobile-responsive design

### Product Popup Modal
- Product details with image, title, price, and description
- Dynamic variant selection (color, size, etc.)
- Functional "Add to Cart" button
- Automatic addition of "Soft Winter Jacket" when Black + Medium variants are selected
- Accessibility features (focus trap, ARIA labels, keyboard navigation)
- Mobile-optimized layout

## 📁 Project Structure

```
├── assets/
│   ├── custom-sections.css     # Custom styles for sections
│   ├── custom-sections.js      # JavaScript functionality
│   └── [other Dawn assets]
├── sections/
│   ├── custom-banner.liquid    # Custom banner section
│   ├── custom-product-grid.liquid # Custom product grid section
│   └── [other Dawn sections]
├── templates/
│   ├── page.custom-landing.json # Custom landing page template
│   └── [other Dawn templates]
├── layout/
│   ├── theme.liquid            # Updated with custom assets
│   └── [other Dawn layouts]
└── [other Dawn directories]
```

## 🛠️ Installation & Setup

### Prerequisites
- Shopify store with Dawn theme installed
- GitHub account
- Shopify CLI (optional but recommended)

### Setup Instructions

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Custom Shopify theme"
   git branch -M master
   git remote add origin [your-repo-url]
   git push -u origin master
   ```

2. **Connect to Shopify Store**
   - Go to your Shopify admin
   - Navigate to Online Store > Themes
   - Click "Add theme" > "Connect from GitHub"
   - Select your repository and master branch
   - Publish as live theme

3. **Create Custom Landing Page**
   - Go to Online Store > Pages
   - Create a new page
   - Set template to "page.custom-landing"
   - Save and publish

4. **Configure Sections**
   - Go to Online Store > Themes > Customize
   - Navigate to your custom landing page
   - Configure the Custom Banner section with your content
   - Add products to the Custom Product Grid section

## 🎨 Customization

### Banner Section Settings
- **Heading**: Main title text
- **Subheading**: Secondary title text
- **Description**: Descriptive paragraph
- **Primary Button Text & Link**: Main call-to-action
- **Secondary Button Text & Link**: Secondary action

### Product Grid Settings
- **Products**: Select up to 6 products from your store
- Products will display with image, title, and price
- Click the magnifying glass icon to open product popup

## 🔧 Technical Features

### JavaScript Functionality
- **Vanilla JavaScript** (no jQuery dependency)
- **ES6+ Features**: Classes, async/await, arrow functions
- **Accessibility**: ARIA labels, focus management, keyboard navigation
- **Performance**: Lazy loading, efficient DOM manipulation
- **Error Handling**: Graceful fallbacks and user feedback

### CSS Features
- **Modern CSS**: Flexbox, Grid, Custom Properties
- **Animations**: Smooth transitions and keyframe animations
- **Responsive Design**: Mobile-first approach
- **Dark Mode Support**: Automatic detection and styling
- **Print Styles**: Optimized for printing
- **Accessibility**: High contrast mode support, reduced motion

### Shopify Integration
- **Liquid Templates**: Proper use of Shopify's templating language
- **Schema Settings**: Customizable via theme editor
- **Cart API**: Seamless cart integration
- **Product Variants**: Dynamic variant handling
- **Localization**: Multi-language support ready

## 🛒 Special Features

### Automatic Product Addition
When a customer selects a product with:
- **Color**: Black
- **Size**: Medium

The "Soft Winter Jacket" will automatically be added to the cart along with the selected product.

*Note: You'll need to update the `softWinterJacketVariantId` in the JavaScript file with the actual variant ID.*

## 📱 Mobile Responsiveness

- **Banner**: Stacked layout on mobile with full-width buttons
- **Product Grid**: Single column on small screens, 2-3 columns on tablets
- **Popup**: Full-screen modal on mobile with optimized spacing
- **Touch-Friendly**: Large tap targets and smooth scrolling

## 🔍 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🚀 Performance Optimizations

- **Lazy Loading**: Images load only when needed
- **Efficient Animations**: GPU-accelerated transforms
- **Minimal Dependencies**: No external libraries
- **Optimized Assets**: Compressed CSS and JavaScript
- **Caching**: Proper cache headers for static assets

## 🧪 Testing

### Manual Testing Checklist
- [ ] Banner displays correctly on desktop and mobile
- [ ] Product grid shows selected products
- [ ] Popup opens when clicking product overlay
- [ ] Variant selection updates price
- [ ] Add to cart functionality works
- [ ] Bonus product added for Black + Medium variants
- [ ] Mobile responsiveness
- [ ] Accessibility features (keyboard navigation, screen readers)

## 🐛 Troubleshooting

### Common Issues

1. **Products not showing in grid**
   - Ensure products are published and available
   - Check product selection in theme customizer

2. **Popup not opening**
   - Check browser console for JavaScript errors
   - Ensure custom-sections.js is loading properly

3. **Add to cart not working**
   - Verify product variants are available
   - Check Shopify cart API responses in network tab

4. **Bonus product not adding**
   - Update `softWinterJacketVariantId` with correct variant ID
   - Ensure the bonus product exists and is available

## 📞 Support

For questions or issues related to this theme:

- **Developer**: Salman Mehar
- **Email**: salmanpri78@gmail.com
- **GitHub**: miansalman3807

## 📄 License

This theme is created for assessment purposes. Please respect Shopify's theme development guidelines and licensing terms.

---

**Built with ❤️ using Shopify Dawn theme as base**
