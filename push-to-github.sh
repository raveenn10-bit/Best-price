#!/usr/bin/env bash
set -e
echo "Pushing BestPrices.lk Phase 01 Storefront to https://github.com/raveenn10-bit/Best-price.git..."
git remote set-url origin https://github.com/raveenn10-bit/Best-price.git 2>/dev/null || git remote add origin https://github.com/raveenn10-bit/Best-price.git
git branch -M main
git push -u origin main
echo "Successfully pushed to GitHub!"
