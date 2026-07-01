# Git Workflow

Dự án dùng mô hình **feature branch → develop → main**, với hai PR cho mỗi lần thay đổi.

## Quy ước đặt tên nhánh

| Prefix | Dùng khi |
|---|---|
| `feat/<mô-tả>` | Thêm tính năng mới |
| `fix/<mô-tả>` | Sửa bug |
| `docs/<mô-tả>` | Thêm hoặc cập nhật tài liệu (README, `.claude/docs/`, CLAUDE.md, v.v.) |

Dùng kebab-case, ngắn gọn. Ví dụ: `feat/gallery-swipe`, `fix/gallery-slide-transition`, `docs/git-workflow`.

## Flow chuẩn (mỗi tính năng / bug / tài liệu)

### Bước 1 — Tạo nhánh từ develop

```bash
git checkout develop
git pull origin develop
git checkout -b feat/ten-tinh-nang   # hoặc fix/... hoặc docs/...
```

### Bước 2 — Phát triển và commit

```bash
git add src/components/... src/content/...   # chỉ stage file liên quan
git commit -m "feat: mô tả ngắn gọn những gì thay đổi"
```

Commit message format: `<type>: <mô tả>` — type là `feat`, `fix`, `docs`, `chore`, `refactor`, `style`.

### Bước 3 — Push lên GitHub

```bash
git push -u origin feat/ten-tinh-nang
```

### Bước 4 — PR #1: nhánh → develop

```bash
gh pr create --base develop \
  --title "feat: tên tính năng" \
  --body "Mô tả thay đổi, cách test, screenshot nếu cần."
```

Sau khi review OK → **Merge PR #1** vào `develop`. Vercel sẽ tạo một Preview Deployment cho `develop` tự động.

### Bước 5 — PR #2: develop → main (deploy production)

Chỉ thực hiện khi đã sẵn sàng đưa lên production:

```bash
git checkout develop
git pull origin develop
gh pr create --base main --head develop \
  --title "chore: release to production" \
  --body "Bao gồm: feat/..., fix/..."
```

Merge PR #2 → Vercel tự động redeploy production (`main` là production branch).

## Khi nào KHÔNG nên merge develop → main

- Khi còn PR khác đang chờ review vào `develop` và muốn gộp chung vào một release.
- Khi muốn test trên Preview Deployment của `develop` thêm trước khi lên production.

## Hotfix (vá lỗi khẩn trên production)

Khi bug chỉ xuất hiện trên production và cần vá ngay, không chờ `develop`:

```bash
# 1. Tạo nhánh từ main
git checkout main
git pull origin main
git checkout -b fix/ten-bug

# 2. Sửa, commit, push
git add ...
git commit -m "fix: mô tả bug"
git push -u origin fix/ten-bug

# 3. PR thẳng vào main
gh pr create --base main --title "hotfix: mô tả bug" --body "..."
# Merge → production được vá ngay

# 4. Backport về develop để không bị mất fix sau này
gh pr create --base develop --head fix/ten-bug \
  --title "chore: backport hotfix fix/ten-bug"
```
