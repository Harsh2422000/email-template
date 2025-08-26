# Email Template Editor with GrapesJS

A powerful drag-and-drop email template editor built with Next.js, GrapesJS, and MJML for creating responsive email templates.

## Features

- 🎨 **Drag & Drop Interface**: Intuitive visual editor with pre-built components
- 📱 **Responsive Design**: MJML-powered responsive email templates
- 🧩 **Pre-built Components**: Text, buttons, images, dividers, and social media blocks
- 💾 **HTML Export**: Export your templates as complete HTML files
- 🎯 **Live Preview**: See changes in real-time as you edit
- 🎨 **Style Manager**: Comprehensive styling options for all components
- 📋 **Template Library**: Load sample templates to get started quickly

## Quick Start

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open the application**:
   - Navigate to `http://localhost:3000`
   - Click "🎨 Open Email Editor" to access the editor

3. **Start creating**:
   - Drag components from the left panel to the canvas
   - Use the right panel to customize styles and manage layers
   - Export your template when finished

## How to Use the Editor

### Left Panel - Components
- **Text Block**: Add customizable text content
- **Button**: Create call-to-action buttons with custom styling
- **Image**: Insert images with responsive handling
- **Divider**: Add horizontal separators
- **Social**: Include social media links and icons

### Main Canvas
- **Drag & Drop**: Simply drag components from the left panel to the canvas
- **Visual Editing**: Click on any element to select and modify it
- **Live Preview**: See your changes immediately as you work

### Right Panel
- **Layers Tab**: View and manage the structure of your email
- **Styles Tab**: Customize colors, fonts, spacing, and more

### Toolbar Actions
- **Load Sample**: Start with a pre-designed template
- **Clear**: Reset the canvas to start fresh
- **Export HTML**: Download your template as a complete HTML file

## Component Details

### Text Component
- Rich text editing
- Font family, size, and weight options
- Color and alignment controls
- Line height and letter spacing

### Button Component
- Background and text color customization
- Border radius and padding controls
- Link URL configuration
- Hover effects

### Image Component
- Responsive image handling
- Alt text for accessibility
- Alignment options
- Width and height controls

### Social Component
- Pre-configured social media icons
- Support for Facebook, Twitter, Instagram, LinkedIn
- Custom link URLs
- Horizontal or vertical layouts

## MJML Integration

This editor uses MJML (Mailjet Markup Language) to ensure your email templates are:
- **Responsive**: Automatically adapt to different screen sizes
- **Compatible**: Work across all major email clients
- **Professional**: Follow email best practices

## Export Options

When you click "Export HTML", you'll get:
- Complete HTML document with embedded CSS
- MJML-generated responsive code
- Ready-to-use email template
- Compatible with most email service providers

## Technical Implementation

### Technologies Used
- **Next.js**: React framework for the application
- **GrapesJS**: Drag & drop web builder framework
- **MJML**: Responsive email framework
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework

### File Structure
```
src/
├── components/
│   └── EmailEditor.tsx       # Main editor component
├── app/
│   ├── editor/
│   │   └── page.tsx         # Editor page
│   ├── page.tsx             # Home page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles with GrapesJS CSS
```

### Key Features Implementation

1. **Dynamic Imports**: GrapesJS is loaded dynamically to avoid SSR issues
2. **Custom Blocks**: Pre-configured MJML components for common email elements
3. **Style Management**: Comprehensive styling options for all components
4. **Layer Management**: Visual tree view of email structure
5. **Export Functionality**: Complete HTML generation with embedded styles

## Customization

### Adding Custom Components
To add new components, modify the `EmailEditor.tsx` file:

```typescript
editorInstance.BlockManager.add('custom-block', {
  label: 'Custom Block',
  content: '<mj-text>Your custom content</mj-text>',
  category: 'Custom',
  attributes: { class: 'fa fa-custom-icon' }
});
```

### Modifying Styles
Customize the editor appearance by modifying the styles in the `EmailEditor.tsx` component or adding custom CSS to `globals.css`.

### Adding Templates
Create new template presets by adding them to the `loadSampleTemplate` function in `EmailEditor.tsx`.

## Browser Support

This editor works in all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Tips for Best Email Templates

1. **Keep it simple**: Use clean layouts and minimal design elements
2. **Test across clients**: Different email clients render differently
3. **Mobile-first**: Design for mobile devices first
4. **Use web-safe fonts**: Stick to widely supported fonts
5. **Optimize images**: Use optimized images for faster loading
6. **Include alt text**: Always add alt text for images
7. **Test thoroughly**: Preview in multiple email clients before sending

## Troubleshooting

### Common Issues

1. **Editor not loading**: Check console for JavaScript errors
2. **Styles not applying**: Ensure global CSS is properly imported
3. **Export not working**: Verify browser allows file downloads
4. **Components not dragging**: Check if GrapesJS loaded properly

### Debug Mode

To enable debug mode, add to the GrapesJS init config:
```typescript
{
  // ... other config
  debug: true
}
```

## Future Enhancements

Potential improvements for the editor:
- [ ] Template gallery with more designs
- [ ] Cloud storage integration
- [ ] Email testing integration
- [ ] A/B testing features
- [ ] Animation support
- [ ] Advanced typography controls
- [ ] Collaboration features
- [ ] Version history

## Support

For issues or questions:
1. Check the console for error messages
2. Refer to [GrapesJS Documentation](https://grapesjs.com/docs/)
3. Review [MJML Documentation](https://mjml.io/documentation/)
4. Test in different browsers to isolate issues
