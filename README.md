# Smodin AI Chrome Extension

A Chrome extension for enhancing text using Smodin AI.

## Features

- Text extraction from web pages
- Context menu integration
- Support for multiple input sources (textareas, contenteditable elements, iframes)
- Text enhancement capabilities

## Installation

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension directory

## Development

```bash
# Install dependencies
npm install

# Generate icons
node generate-icons.js
```

## Usage

1. Select text on any webpage
2. Right-click and select "Open in Extension"
3. Or click the extension icon to extract text from the active element
4. Click "Enhance Text" to process the text
5. On Click Enhance btn, the input will be inject back with Upper case

## Injection
