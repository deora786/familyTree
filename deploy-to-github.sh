#!/bin/bash

# GitHub Pages Deployment Script for Family Tree
# This script helps you deploy your family tree to GitHub Pages

echo "🌳 Family Tree - GitHub Pages Deployment Script"
echo "================================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📂 Initializing Git repository..."
    git init
    git branch -M main
    echo "✅ Git initialized"
else
    echo "✅ Git repository already initialized"
fi

echo ""
echo "Please enter your GitHub username:"
read -r GITHUB_USERNAME

echo ""
echo "Please enter your repository name (e.g., family-tree):"
read -r REPO_NAME

echo ""
echo "📋 Summary:"
echo "   GitHub Username: $GITHUB_USERNAME"
echo "   Repository Name: $REPO_NAME"
echo "   URL will be: https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
echo ""
echo "Is this correct? (y/n)"
read -r CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "❌ Cancelled. Please run the script again."
    exit 1
fi

echo ""
echo "⚠️  PRIVACY WARNING:"
echo "   GitHub Pages requires a PUBLIC repository (free tier)."
echo "   Anyone with the URL can view your family tree."
echo ""
echo "   Options:"
echo "   1. Continue with public repository (free)"
echo "   2. Cancel and use GitHub Pro for private repository"
echo ""
echo "Continue with PUBLIC repository? (y/n)"
read -r PRIVACY_CONFIRM

if [ "$PRIVACY_CONFIRM" != "y" ] && [ "$PRIVACY_CONFIRM" != "Y" ]; then
    echo "❌ Cancelled. Consider upgrading to GitHub Pro for private Pages."
    exit 1
fi

echo ""
echo "📝 Checking files..."

# Verify index.html exists
if [ ! -f index.html ]; then
    echo "❌ ERROR: index.html not found in current directory!"
    echo "   Please run this script from the project root directory."
    exit 1
fi

echo "✅ index.html found"
echo "✅ File structure validated"

echo ""
echo "🔍 Do you want to add all files and commit? (y/n)"
echo "   This will include:"
echo "   - HTML, CSS, JavaScript files"
echo "   - Data files (family-data.json)"
echo "   - Documentation (README.md, CLAUDE.md)"
echo "   - Any images in images/ folder"
read -r ADD_FILES

if [ "$ADD_FILES" = "y" ] || [ "$ADD_FILES" = "Y" ]; then
    echo ""
    echo "📦 Adding files to git..."
    git add .

    echo ""
    echo "Enter commit message (or press Enter for default):"
    read -r COMMIT_MSG

    if [ -z "$COMMIT_MSG" ]; then
        COMMIT_MSG="Deploy family tree visualization"
    fi

    git commit -m "$COMMIT_MSG"
    echo "✅ Files committed"
fi

echo ""
echo "🔗 Setting up GitHub remote..."

# Check if remote already exists
if git remote get-url origin >/dev/null 2>&1; then
    echo "⚠️  Remote 'origin' already exists"
    echo "   Current URL: $(git remote get-url origin)"
    echo ""
    echo "Update remote URL? (y/n)"
    read -r UPDATE_REMOTE

    if [ "$UPDATE_REMOTE" = "y" ] || [ "$UPDATE_REMOTE" = "Y" ]; then
        git remote remove origin
        git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
        echo "✅ Remote updated"
    fi
else
    git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
    echo "✅ Remote added"
fi

echo ""
echo "🚀 Ready to push to GitHub!"
echo ""
echo "⚠️  IMPORTANT: Before pushing, make sure you have:"
echo "   1. Created the repository on GitHub: https://github.com/new"
echo "      - Repository name: $REPO_NAME"
echo "      - Visibility: Public"
echo "      - Do NOT initialize with README"
echo ""
echo "   2. Reviewed your data for privacy concerns"
echo "   3. Tested locally: python3 -m http.server 8000"
echo ""
echo "Have you created the repository on GitHub? (y/n)"
read -r REPO_CREATED

if [ "$REPO_CREATED" != "y" ] && [ "$REPO_CREATED" != "Y" ]; then
    echo ""
    echo "📝 Please create the repository first:"
    echo "   1. Go to: https://github.com/new"
    echo "   2. Repository name: $REPO_NAME"
    echo "   3. Visibility: Public"
    echo "   4. Do NOT initialize with README"
    echo "   5. Click 'Create repository'"
    echo ""
    echo "Then run this script again."
    exit 0
fi

echo ""
echo "🚀 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Files pushed to GitHub"
    echo ""
    echo "📋 Next Steps:"
    echo "   1. Go to: https://github.com/$GITHUB_USERNAME/$REPO_NAME/settings/pages"
    echo "   2. Under 'Build and deployment':"
    echo "      - Source: Deploy from a branch"
    echo "      - Branch: main"
    echo "      - Folder: / (root)"
    echo "   3. Click 'Save'"
    echo "   4. Wait 1-2 minutes for deployment"
    echo "   5. Your site will be live at:"
    echo "      https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
    echo ""
    echo "🎉 Deployment complete!"
else
    echo ""
    echo "❌ Push failed. Common issues:"
    echo "   1. Repository doesn't exist on GitHub"
    echo "   2. Wrong username or repository name"
    echo "   3. Authentication required (use personal access token)"
    echo ""
    echo "Please check your GitHub repository and try again."
    exit 1
fi
