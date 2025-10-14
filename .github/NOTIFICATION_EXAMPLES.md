# Alternative Notification Examples

This file contains examples of different notification methods you can use instead of or in addition to Slack.

## Microsoft Teams

Replace the Slack notification steps with:

```yaml
- name: Send Teams notification
  uses: aliencube/microsoft-teams-actions@v0.8.0
  with:
    webhook_uri: ${{ secrets.TEAMS_WEBHOOK_URL }}
    title: "Security Updates Applied"
    summary: "Security updates completed successfully"
    text: |
      ✅ **Security Updates Applied and Deployed**
      
      - Vulnerabilities resolved: ${{ steps.audit.outputs.vulnerability_count }}
      - Branch: ${{ env.SECURITY_BRANCH }}
      - PR: https://github.com/${{ github.repository }}/pull/${{ steps.create_pr.outputs.pr_number }}
      
      🚀 Changes deployed to production automatically.
    theme_color: "good"
```

## Discord

Replace the Slack notification steps with:

```yaml
- name: Send Discord notification
  uses: Ilshidur/action-discord@master
  with:
    args: |
      ✅ **Security Updates Applied and Deployed**
      
      **Summary:**
      - Vulnerabilities resolved: ${{ steps.audit.outputs.vulnerability_count }}
      - Repository: ${{ github.repository }}
      - PR: https://github.com/${{ github.repository }}/pull/${{ steps.create_pr.outputs.pr_number }}
      
      🚀 Deployed to: https://pdmedcalc-v2.pages.dev
  env:
    DISCORD_WEBHOOK: ${{ secrets.DISCORD_WEBHOOK_URL }}
```

## GitHub Issues (Built-in)

Add this step to create GitHub issues for notifications:

```yaml
- name: Create notification issue
  uses: actions/github-script@v7
  with:
    script: |
      github.rest.issues.create({
        owner: context.repo.owner,
        repo: context.repo.repo,
        title: '✅ Security Updates Applied - ${{ steps.audit.outputs.vulnerability_count }} vulnerabilities resolved',
        body: `## Security Updates Applied Successfully
        
        **Summary:**
        - Vulnerabilities resolved: ${{ steps.audit.outputs.vulnerability_count }}
        - Branch: ${{ env.SECURITY_BRANCH }}
        - PR: #${{ steps.create_pr.outputs.pr_number }}
        
        **Status:** ✅ All tests passed, changes merged and deployed
        **Production URL:** https://pdmedcalc-v2.pages.dev
        
        This issue was created automatically by the security update workflow.`,
        labels: ['security', 'automated', 'deployed']
      })
```

## Email (using GitHub's built-in email notifications)

You can also use GitHub's native email notifications by:

1. Go to repository Settings → Notifications
2. Enable email notifications for:
   - Actions workflows
   - Pull request merges
   - Security alerts

This will send emails to repository collaborators without needing SMTP setup.

## Webhook to Custom Service

For custom integrations:

```yaml
- name: Send custom webhook
  run: |
    curl -X POST "${{ secrets.CUSTOM_WEBHOOK_URL }}" \
      -H "Content-Type: application/json" \
      -d '{
        "event": "security_update_complete",
        "repository": "${{ github.repository }}",
        "vulnerabilities_fixed": ${{ steps.audit.outputs.vulnerability_count }},
        "pr_url": "https://github.com/${{ github.repository }}/pull/${{ steps.create_pr.outputs.pr_number }}",
        "status": "success"
      }'
```

## Multiple Notification Methods

You can use multiple notification methods by including multiple notification steps:

```yaml
# Slack for immediate team notification
- name: Slack notification
  uses: 8398a7/action-slack@v3
  # ... slack config

# GitHub issue for permanent record
- name: Create tracking issue
  uses: actions/github-script@v7
  # ... issue config

# Custom webhook for external systems
- name: External webhook
  run: curl -X POST ...
```
