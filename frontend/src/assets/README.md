# LogiTrade Branding Assets

This document provides specifications for creating the LogiTrade branding assets.

## Brand Colors

- **Primary Blue**: #3B82F6 (rgb(59, 130, 246))
- **Dark Blue**: #1E40AF (rgb(30, 64, 175))
- **Light Blue**: #DBEAFE (rgb(219, 234, 254))
- **Accent Red**: #EF4444 (rgb(239, 68, 68))
- **Accent Green**: #10B981 (rgb(16, 185, 129))
- **Neutral Gray**: #6B7280 (rgb(107, 114, 128))
- **Background**: #F0F9FF (rgb(240, 249, 255))

## Logo Design Concept

The LogiTrade logo should represent global trade and logistics with the following elements:
- A simplified globe or world map as the background
- A curved shipping route line (in Primary Blue)
- Origin and destination markers (in Accent Red and Accent Green)
- A small ship or container icon
- The "LogiTrade" text in Dark Blue, using a modern sans-serif font

## Required Assets

### 1. favicon.ico
- Multi-size icon file containing 16x16, 32x32, and 64x64 versions
- Should be a simplified version of the logo that remains recognizable at small sizes
- Place in: `/dashboard/public/`

### 2. logo192.png
- 192x192 pixel PNG with transparency
- Full logo with text
- Place in: `/dashboard/public/`

### 3. logo512.png
- 512x512 pixel PNG with transparency
- Full logo with text
- Place in: `/dashboard/public/`

### 4. og-image.png
- 1200x630 pixel PNG
- Full logo with text and additional branding elements
- Include tagline: "Global Trade Route Analytics"
- Should have a light blue gradient background
- Place in: `/dashboard/public/`

### 5. logitrade-logo.png
- 512x512 pixel PNG with transparency
- Full logo with text
- Main application logo used within the dashboard
- Place in: `/dashboard/src/assets/`

## Implementation Guide

1. Use a vector graphics editor (like Adobe Illustrator, Figma, or Inkscape) to create the master logo
2. Export in different sizes as required
3. For favicon.ico, use a tool like https://realfavicongenerator.net/ to create a multi-size icon file
4. Use consistent styling across all assets

## Usage in Application

Update the following components to use the new branding:

1. In `index.html`:
   - Update favicon link
   - Update meta tags for social media sharing

2. In `Header.tsx` and `Sidebar.tsx`:
   - Import the logo from assets
   - Replace "GlobalTrade Insight" text with the logo image

3. Update any other components that might be using the old branding
