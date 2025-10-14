#!/bin/bash

# GitHub Security Automation Setup Script

echo "🔧 Setting up GitHub Security Automation..."

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI not found. Please install: https://cli.github.com/"
    exit 1
fi

# Ensure we're authenticated with GitHub
if ! gh auth status > /dev/null 2>&1; then
    echo "🔑 Please authenticate with GitHub CLI first:"
    echo "gh auth login"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Get repository information
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
echo "📁 Repository: $REPO"

# Enable Dependabot alerts
echo "🛡️ Enabling Dependabot alerts..."
gh api -X PATCH "/repos/$REPO" \
  -f dependency_alerts=true \
  -f dependabot_security_updates=true

# Create branch protection rules
echo "🔒 Setting up branch protection..."
gh api -X PUT "/repos/$REPO/branches/main/protection" \
  -f required_status_checks='{"strict":true,"contexts":["Automated Security Updates"]}' \
  -f enforce_admins=false \
  -f required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  -f restrictions=null

echo "📋 Setup complete! Next steps:"
echo ""
echo "1. Set up Slack webhook (see .github/SECURITY_AUTOMATION_SETUP.md for details)"
echo ""
echo "2. Add this repository secret:"
echo "   - SLACK_WEBHOOK_URL (your Slack webhook URL)"
echo ""
echo "3. Commit and push the new GitHub workflows:"
echo "   git add .github/"
echo "   git commit -m 'Add automated security update workflows'"
echo "   git push"
echo ""
echo "3. Review the setup documentation:"
echo "   cat .github/SECURITY_AUTOMATION_SETUP.md"
echo ""
echo "🎉 Your repository will now automatically handle security updates!"
