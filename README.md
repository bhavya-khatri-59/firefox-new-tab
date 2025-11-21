# Firefox Steampunk New Tab Extension

A beautiful steampunk-themed new tab page for Firefox with configurable links, animated gears, and an analog clock.

## Build Instructions

Follow these steps to create an exact copy of the extension from source code.

### Prerequisites

- **Operating System**: Windows, macOS, or Linux
- **Node.js**: Version 18.x or higher ([Download](https://nodejs.org/))
- **npm**: Version 9.x or higher (comes with Node.js)

To verify your installations:
```bash
node --version  # Should output v18.x.x or higher
npm --version   # Should output 9.x.x or higher
```

### Step 1: Clone or Extract Source Code

If you have a git repository:
```bash
git clone <repository-url>
cd <project-directory>
```

If you have a source archive, extract it and navigate to the directory:
```bash
cd firefox-steampunk-newtab
```

### Step 2: Install Dependencies

Install all required npm packages:
```bash
npm install
```

This will install all dependencies listed in `package.json`, including:
- React 18.3.1
- Vite (build tool)
- TypeScript
- Tailwind CSS
- Various UI component libraries

### Step 3: Build for Production

Run the build command:
```bash
npm run build
```

This command:
1. Compiles TypeScript to JavaScript
2. Bundles React components
3. Processes Tailwind CSS
4. Optimizes assets
5. Outputs production-ready files to the `dist/` directory

### Step 4: Prepare Extension Package

After building, the `dist/` directory contains the complete extension. Copy the manifest file:
```bash
cp manifest.json dist/
```

The `dist/` directory now contains everything needed for the Firefox extension:
- `index.html` - Main page
- `assets/` - Compiled JS, CSS, and images
- `manifest.json` - Extension configuration
- `favicon.ico` - Extension icon

### Step 5: Load in Firefox (for testing)

1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on"
4. Navigate to the `dist/` directory and select `manifest.json`

### Creating Distributable Package

To create a .zip file for submission:
```bash
cd dist
zip -r ../firefox-steampunk-newtab.zip .
```

On Windows (using PowerShell):
```powershell
cd dist
Compress-Archive -Path * -DestinationPath ../firefox-steampunk-newtab.zip
```

## Build Environment Details

- **Build Tool**: Vite 5.x
- **Compiler**: TypeScript 5.x with SWC
- **CSS Framework**: Tailwind CSS 3.x
- **Package Manager**: npm

## Project Structure

```
/
├── src/                    # Source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── assets/            # Images and static files
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── manifest.json          # Firefox extension manifest
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts

```

## Build Scripts Explained

The build process uses these npm scripts (defined in `package.json`):

- `npm run dev` - Starts development server (not used for production)
- `npm run build` - Creates production build in `dist/`
- `npm run preview` - Preview production build locally

The build process is entirely automated through Vite and does not require any manual transpilation or minification steps beyond running `npm run build`.

## Third-Party Libraries

All third-party libraries are installed via npm and listed in `package.json`. The main dependencies are:

- React & React DOM - UI framework
- Vite - Build tool and dev server
- TypeScript - Type safety
- Tailwind CSS - Styling framework
- Radix UI - Accessible component primitives
- Lucide React - Icon library

No source code is minified or obfuscated beyond standard Vite production build optimization.

## Troubleshooting

**Build fails with "command not found"**: Ensure Node.js and npm are properly installed and in your PATH.

**"Cannot find module" errors**: Run `npm install` again to ensure all dependencies are installed.

**Build succeeds but extension doesn't load**: Ensure you copied `manifest.json` to the `dist/` directory.

## Development

For local development with hot-reload:
```bash
npm run dev
```

The dev server will start at `http://localhost:8080`

## License

See LICENSE file for details.

## Support

For issues or questions, please open an issue on the project repository.
