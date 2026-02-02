#!/bin/bash

# Enable system TLS certs for Next.js/Turbopack to fix Google Fonts fetch error
export NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1

# Disable SSL verification for Firebase CLI and other Node.js tools
export NODE_TLS_REJECT_UNAUTHORIZED=0

echo "🚀 Building with SSL workaround..."
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Build successful. Deploying to Firebase..."
  firebase deploy
else
  echo "❌ Build failed."
  exit 1
fi
