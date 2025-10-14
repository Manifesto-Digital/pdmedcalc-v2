# GitHub Repository Configuration for Automated Security Updates

## Required Repository Secrets

To enable the automated security update system, add these secrets to your GitHub repository:

### Slack Notifications
- `SLACK_WEBHOOK_URL`: Slack webhook URL for notifications (see setup instructions below)

### Optional: GitHub Token (uses default GITHUB_TOKEN by default)
- `GITHUB_TOKEN`: GitHub token with repo access (usually not needed as default token works)

## Slack Setup Instructions

1. **Create a Slack App:**
   - Go to https://api.slack.com/apps
   - Click "Create New App" → "From scratch"
   - Name it "Security Updates Bot" and select your workspace

2. **Enable Incoming Webhooks:**
   - In your app settings, go to "Incoming Webhooks"
   - Turn on "Activate Incoming Webhooks"
   - Click "Add New Webhook to Workspace"
   - Select the channel where you want notifications
   - Copy the webhook URL

3. **Add to GitHub Secrets:**
   - Go to your repo Settings → Secrets and variables → Actions
   - Add `SLACK_WEBHOOK_URL` with the webhook URL from step 2

## Alternative Notification Options

### Microsoft Teams
- Use `TEAMS_WEBHOOK_URL` secret with Microsoft Teams webhook
- Replace Slack action with `aliencube/microsoft-teams-actions@v0.8.0`

### Discord
- Use `DISCORD_WEBHOOK_URL` secret with Discord webhook
- Replace Slack action with `Ilshidur/action-discord@master`

### GitHub Issues (No external service needed)
- Automatically creates GitHub issues for failed updates
- Built into the workflow - no setup required

## Repository Settings

### 1. Enable Dependabot
- Go to Settings → Security & analysis
- Enable "Dependabot alerts"
- Enable "Dependabot security updates"

### 2. Branch Protection Rules
Set up branch protection for `main` and `develop`:
- Require status checks to pass before merging
- Require up-to-date branches before merging
- Include administrators in restrictions

### 3. Auto-merge Settings
- Enable auto-merge for the repository
- This allows the workflow to automatically merge security PRs that pass tests

## How It Works

1. **Weekly Scanning**: Runs every Monday at 9 AM UTC to check for security vulnerabilities
2. **Security Branch Creation**: Creates a `security-updates-YYYYMMDD-HHMMSS` branch from main
3. **Vulnerability Detection**: Uses `npm audit` to identify security issues
4. **Automatic Fixing**: Applies `npm audit fix` and `npm audit fix --force` as needed
5. **Testing**: Runs full test suite (Jest + Cypress) on the security branch
6. **Intelligent Test Fixing**: Attempts to fix common test patterns if tests fail
7. **Pull Request Creation**: Creates a PR with detailed security update information
8. **Auto-merge**: Automatically merges PR if all tests pass
9. **Cloudflare Deployment**: Cloudflare Pages automatically deploys when merged to main
10. **Notifications**: Sends email notifications for all outcomes

## Manual Override

You can manually trigger workflows:
- Go to Actions tab
- Select "Automated Security Updates"
- Click "Run workflow"

## Monitoring

Check these regularly:
- GitHub Actions tab for workflow status
- Email notifications
- Dependabot alerts in Security tab
- Issues created for failed updates

## Customization

Edit these files to customize behavior:
- `.github/dependabot.yml`: Update schedule and dependency settings (for additional Dependabot integration)
- `.github/workflows/security-updates.yml`: Modify testing and merge logic
- `.github/workflows/fix-tests.yml`: Add more intelligent test fixing patterns (optional)
