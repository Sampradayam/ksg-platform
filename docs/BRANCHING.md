# Branching Strategy

## Branch Types

### Main Branches

- `main` - Production-ready code, protected
- `develop` - Integration branch for features (if needed)

### Supporting Branches

- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes
- `chore/*` - Maintenance tasks
- `docs/*` - Documentation updates

## Naming Convention

```
<type>/<team>-<description>

Examples:
feature/identity-user-registration
feature/courses-video-upload
bugfix/tourism-image-loading
hotfix/auth-token-expiry
chore/foundation-team-scale
docs/api-documentation
```

### Type Prefixes

- `feature/` - New functionality
- `bugfix/` - Bug fixes
- `hotfix/` - Critical production fixes
- `chore/` - Refactoring, dependencies, tooling
- `docs/` - Documentation only

### Team Prefixes (Optional)

- `identity` - Auth, users, RBAC
- `courses` - Course management
- `admissions` - Admissions module
- `helpline` - Helpline module
- `festivals` - Festivals module
- `tourism` - Tourism module
- `content` - Content management
- `ai` - AI features
- `admin` - Admin panel
- `foundation` - Cross-cutting concerns

## Workflow

### 1. Create a Branch

```bash
# Always start from main
git checkout main
git pull origin main

# Create your branch
git checkout -b feature/identity-user-profile
```

### 2. Work on Your Branch

```bash
# Make changes
git add .
git commit -m "feat(identity): add user profile endpoint"

# Push to remote
git push origin feature/identity-user-profile
```

### 3. Keep Branch Updated

```bash
# Regularly sync with main
git checkout main
git pull origin main
git checkout feature/identity-user-profile
git rebase main

# Or merge if preferred
git merge main
```

### 4. Create Pull Request

- Push your branch to GitHub
- Open a Pull Request to `main`
- Fill out the PR template
- Request reviews from relevant team members
- Link related issues

### 5. Code Review

- Address review comments
- Push additional commits
- Ensure CI/CD passes
- Get required approvals

### 6. Merge

- Squash and merge (preferred for clean history)
- Delete branch after merge

## Commit Message Convention

Follow Conventional Commits:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting, missing semicolons
- `refactor` - Code restructuring
- `test` - Adding tests
- `chore` - Maintenance tasks

### Examples

```bash
feat(courses): add video upload functionality
fix(auth): resolve token expiration issue
docs(api): update authentication endpoints
chore(deps): upgrade react to v18
test(admissions): add unit tests for form validation
```

## Pull Request Guidelines

### PR Title Format

```
<type>(<scope>): <description>

Example:
feat(identity): implement user registration flow
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests pass locally
```

### Review Requirements

- Minimum 1 approval required
- All CI checks must pass
- No merge conflicts
- Code owner approval (if applicable)

## Protected Branches

### `main` Branch Rules

- No direct commits
- Requires pull request
- Requires 1+ approvals
- Status checks must pass
- Branch must be up to date

## Hotfix Process

For critical production issues:

```bash
# Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-auth-bug

# Fix and test
# ... make changes ...

# Commit and push
git commit -m "fix(auth): resolve critical token validation bug"
git push origin hotfix/critical-auth-bug

# Create PR with "HOTFIX" label
# Fast-track review and merge
```

## Branch Cleanup

### Delete Local Branches

```bash
# Delete merged branch
git branch -d feature/my-feature

# Force delete unmerged branch
git branch -D feature/my-feature
```

### Delete Remote Branches

```bash
git push origin --delete feature/my-feature
```

### Prune Stale Branches

```bash
git fetch --prune
git remote prune origin
```

## Best Practices

1. **Keep branches short-lived** - Merge within 2-3 days
2. **One feature per branch** - Don't mix unrelated changes
3. **Sync regularly** - Rebase/merge from main daily
4. **Write clear commits** - Follow commit conventions
5. **Test before pushing** - Run tests locally
6. **Small PRs** - Easier to review (< 400 lines)
7. **Update documentation** - Keep docs in sync with code
8. **Delete merged branches** - Keep repository clean

## Team Collaboration

- Communicate branch creation in team channel
- Tag relevant team members in PRs
- Respond to review comments promptly
- Help review others' PRs
- Share knowledge in PR descriptions

## Emergency Procedures

If `main` is broken:

1. Identify the breaking commit
2. Create hotfix branch immediately
3. Notify team in emergency channel
4. Fast-track fix through review
5. Post-mortem after resolution
