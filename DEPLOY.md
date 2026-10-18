# Deploy Portfolio lên VPS (build local → registry → pull/up)

**Nguyên tắc:** build image trên máy local, đẩy lên registry. VPS **chỉ** `pull` + `compose up` — **không** build trên server.

```
[Local]  docker build → docker push
                ↓
         Container Registry
                ↓
[VPS]    docker compose pull → docker compose up -d
```

---

## 0. Images

| Service | Image name |
|---------|------------|
| `api` | `${IMAGE_PREFIX}:api-${IMAGE_TAG}` |
| `web` | `${IMAGE_PREFIX}:web-${IMAGE_TAG}` |

`IMAGE_PREFIX` = user/repo trên registry, ví dụ:

- Docker Hub: `chuhuy/portfolio` → `chuhuy/portfolio:api-latest`, `chuhuy/portfolio:web-latest`
- GHCR: `ghcr.io/your-github-username/portfolio`

---

## 1. SSH vào VPS (một lần)

### 1.1. Tạo SSH key (Windows PowerShell)

```powershell
ssh-keygen -t ed25519 -C "your-email@example.com"
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub
```

Dán public key vào DigitalOcean (SSH Keys). Tên key: ví dụ `windows-portfolio`.

### 1.2. Kết nối

```powershell
ssh root@YOUR_DROPLET_IP
```

---

## 2. Chuẩn bị VPS (một lần)

### 2.1. Cài Docker Engine + Compose plugin

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl gnupg git

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

docker --version
docker compose version
```

### 2.2. Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 2.3. Lấy file compose (không cần build source trên VPS)

Chỉ cần `docker-compose.yml` + `.env`. Có thể clone repo (nhẹ) hoặc copy 2 file đó:

```bash
sudo mkdir -p /opt/portfolio
sudo chown -R $USER:$USER /opt/portfolio
cd /opt/portfolio
git clone <YOUR_REPO_URL> .
# hoặc chỉ scp docker-compose.yml từ máy local
```

### 2.4. `.env` trên VPS

```bash
cd /opt/portfolio
cp .env.example .env
nano .env
```

```env
IMAGE_PREFIX=chuhuy/portfolio
IMAGE_TAG=latest

PORT=80
JWT_KEY=<openssl rand -base64 48>
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<strong-password>
```

`IMAGE_PREFIX` / `IMAGE_TAG` phải trùng với image bạn push từ local.

### 2.5. Đăng nhập registry trên VPS (repo private)

Docker Hub:

```bash
docker login
```

GHCR:

```bash
echo YOUR_GITHUB_PAT | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
```

Repo **public** trên Docker Hub: bỏ qua bước login khi pull.

---

## 3. Build & push trên máy local

Cần Docker Desktop (hoặc Docker Engine) trên Windows.

### 3.1. `.env` local (để tag image)

```powershell
cd C:\Users\87xua\source\repos\Portfolio-ReactJS
copy .env.example .env
# sửa IMAGE_PREFIX (và JWT_* nếu chạy compose local)
```

### 3.2. Đăng nhập registry

```powershell
docker login
# hoặc: docker login ghcr.io
```

### 3.3. Build (linux/amd64) + push

```powershell
pnpm docker:release
```

Gắn tag phiên bản:

```powershell
pnpm docker:release -- 1.0.0
```

Tương đương thủ công:

```powershell
$env:DOCKER_DEFAULT_PLATFORM='linux/amd64'
docker compose -f docker-compose.yml -f docker-compose.build.yml build
docker compose -f docker-compose.yml -f docker-compose.build.yml push
```

Images lên registry:

- `chuhuy/portfolio:api-latest`
- `chuhuy/portfolio:web-latest`

> File `docker-compose.build.yml` **chỉ dùng trên local**. VPS không dùng file này.

---

## 4. Trên VPS: pull + up (không build)

```bash
cd /opt/portfolio
docker compose pull
docker compose up -d
```

Kiểm tra:

```bash
docker compose ps
docker compose logs -f
```

| Trang | URL |
|-------|-----|
| Site | `http://<server-ip>/` |
| Blog | `http://<server-ip>/blog` |
| CMS | `http://<server-ip>/cms/login` |

---

## 5. Quy trình cập nhật (mỗi lần release)

**Local:**

```powershell
# sửa code → commit nếu cần
pnpm docker:release
# hoặc: pnpm docker:release -- 1.0.1
```

**VPS:**

```bash
cd /opt/portfolio
# nếu đổi IMAGE_TAG trong .env: nano .env
docker compose pull
docker compose up -d
```

Không chạy `docker compose build` / `up --build` trên VPS.

---

## 6. HTTPS (tuỳ chọn)

Đổi app sang port nội bộ, Caddy terminate TLS:

`.env` trên VPS:

```env
PORT=8080
```

```bash
docker compose up -d
```

`/etc/caddy/Caddyfile`:

```
yourdomain.com {
    reverse_proxy localhost:8080
}
```

```bash
sudo systemctl reload caddy
```

DNS: bản ghi `A` trỏ domain → IP Droplet.

---

## 7. Backup SQLite

```bash
cd /opt/portfolio
docker compose exec api sh -c "cp /data/portfolio.db /data/portfolio-backup.db"
docker compose cp api:/data/portfolio-backup.db ./portfolio-backup-$(date +%F).db
```

---

## 8. Lệnh hữu ích (VPS)

```bash
docker compose pull
docker compose up -d
docker compose logs -f api
docker compose logs -f web
docker compose ps
docker compose down          # giữ volume DB
docker compose down -v      # XÓA luôn SQLite — cẩn thận
```

---

## 9. File liên quan

| File | Ở đâu | Vai trò |
|------|--------|---------|
| `docker-compose.yml` | Local + VPS | Chạy bằng `image` (pull/up) |
| `docker-compose.build.yml` | **Chỉ local** | Overlay `build` + tag để push |
| `.env` | Local (tag) + VPS (runtime) | `IMAGE_*`, `JWT_*`, `ADMIN_*` |
| `scripts/docker-release.mjs` | Local | `pnpm docker:release` |

---

## 10. Xử lý sự cố

| Lỗi | Cách xử lý |
|-----|------------|
| VPS `pull` 404 / not found | Chưa `push` từ local; sai `IMAGE_PREFIX` / `IMAGE_TAG` |
| `pull` denied | Registry private — `docker login` trên VPS |
| `exec format error` | Image không phải `linux/amd64` — build lại bằng `pnpm docker:release` |
| CMS login fail | Sai `JWT_KEY` / `ADMIN_*` trong `.env` VPS → `docker compose up -d` |
| `/api` 502 | `docker compose logs api` |

---

## Checklist lần đầu

- [ ] Docker Desktop local + `docker login`
- [ ] `.env` local có `IMAGE_PREFIX` đúng
- [ ] `pnpm docker:release` thành công (2 image trên registry)
- [ ] VPS: Docker đã cài, UFW 22/80/443
- [ ] VPS: `docker-compose.yml` + `.env` (cùng `IMAGE_PREFIX` / `IMAGE_TAG`)
- [ ] VPS: `docker compose pull && docker compose up -d`
- [ ] Mở được site / blog / CMS trên trình duyệt

---

## Phụ lục: Dev local (không Docker)

```bash
pnpm install
pnpm dev:full
```

- Site: http://localhost:3000  
- CMS: http://localhost:3000/cms/login  

Tunnel nhanh (không VPS): `pnpm deploy:tunnel`
