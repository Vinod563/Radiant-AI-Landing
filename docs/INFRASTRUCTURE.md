# Infrastructure Resource Requirements — Radiant Digital Website

## Project Summary

| Item | Detail |
|------|--------|
| **Project** | Radiant Digital — Corporate Website |
| **Tech Stack** | React 18, Vite, Tailwind CSS, Framer Motion |
| **Build Output** | Static SPA (HTML/CSS/JS) via `vite build` |
| **Apps** | `outputs/ai-landing-v1` |
| **Repo** | `files-webflow` (GitHub) |
| **Branch** | `Deployment_vesion` |
| **Hosting** | Liquid Web |

---

## 1. Hosting — Liquid Web

The build output is a **static SPA** (`dist/` folder from Vite). On Liquid Web, deploy using one of these options:

| Option | Plan | Best For |
|--------|------|----------|
| **VPS Hosting** | 2 GB RAM / 2 vCPU minimum | Full control, Nginx/Apache serving static files |
| **Dedicated Server** | Entry-level | High traffic, multiple sites, staging + production |
| **Cloud Sites** | Managed WordPress/PHP (with static override) | Simplest if already on Liquid Web Cloud Sites |

### Recommended: VPS with Nginx

A Liquid Web **VPS (2 GB RAM, 2 vCPU, 50 GB SSD)** is sufficient for serving the static build. Nginx serves the `dist/` folder directly with minimal resource usage.

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name radiant.digital www.radiant.digital;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name radiant.digital www.radiant.digital;

    ssl_certificate     /etc/ssl/certs/radiant.digital.crt;
    ssl_certificate_key /etc/ssl/private/radiant.digital.key;

    root /var/www/radiant-digital/dist;
    index index.html;

    # SPA fallback — all routes serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets (JS, CSS, images) aggressively
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:;" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
    gzip_min_length 256;
}
```

---

## 2. Build Environment

The CI/CD pipeline needs a build runner with:

| Resource | Requirement |
|----------|-------------|
| **Node.js** | v18 LTS or v20 LTS |
| **npm** | v9+ |
| **RAM** | 2 GB minimum (for `vite build`) |
| **Disk** | 1 GB free (node_modules + build artifacts) |
| **Build Command** | `npm install && npm run build` |
| **Output Directory** | `dist/` |
| **CI Runner** | GitHub Actions (recommended) |

### Build Steps

```bash
cd outputs/ai-landing-v1
npm install
npm run build             # produces dist/
```

---

## 3. Domain & DNS

| Resource | Detail |
|----------|--------|
| **Domain** | e.g., `radiant.digital` or subdomain |
| **DNS Provider** | Liquid Web DNS, Cloudflare, or existing registrar |
| **SSL Certificate** | Liquid Web includes free SSL (Let's Encrypt) or use purchased cert |
| **Records Needed** | A record pointing to Liquid Web VPS IP address |

### DNS Setup

```
Type    Host    Value                   TTL
A       @       <Liquid-Web-VPS-IP>     300
A       www     <Liquid-Web-VPS-IP>     300
```

---

## 4. CDN & Caching

| Resource | Detail |
|----------|--------|
| **CDN** | Cloudflare (free tier) in front of Liquid Web, or Liquid Web's built-in CDN |
| **Cache Policy** | Static assets (`/assets/*`): `max-age=31536000, immutable` |
| | HTML files: `no-cache` or short TTL (5 min) |
| **Compression** | Gzip enabled via Nginx (see config above) |

> Placing Cloudflare in front of the Liquid Web VPS adds a free CDN layer, DDoS protection, and automatic SSL.

---

## 5. CI/CD Pipeline

### GitHub Actions — Deploy to Liquid Web via SSH

```yaml
name: Deploy to Liquid Web
on:
  push:
    branches: [Deployment_vesion]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Build
        run: cd outputs/ai-landing-v1 && npm install && npm run build

      - name: Deploy to Liquid Web via SSH
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.LIQUIDWEB_HOST }}
          username: ${{ secrets.LIQUIDWEB_USER }}
          key: ${{ secrets.LIQUIDWEB_SSH_KEY }}
          source: "outputs/ai-landing-v1/dist/*"
          target: "/var/www/radiant-digital/"
          strip_components: 3

      - name: Restart Nginx (if needed)
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.LIQUIDWEB_HOST }}
          username: ${{ secrets.LIQUIDWEB_USER }}
          key: ${{ secrets.LIQUIDWEB_SSH_KEY }}
          script: sudo systemctl reload nginx
```

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `LIQUIDWEB_HOST` | VPS IP address or hostname |
| `LIQUIDWEB_USER` | SSH username (e.g., `root` or deploy user) |
| `LIQUIDWEB_SSH_KEY` | Private SSH key for authentication |

---

## 6. Server Setup (One-Time)

Run these on the Liquid Web VPS after provisioning:

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Nginx
sudo apt install nginx -y

# 3. Create site directory
sudo mkdir -p /var/www/radiant-digital/dist
sudo chown -R $USER:$USER /var/www/radiant-digital

# 4. Copy Nginx config
sudo nano /etc/nginx/sites-available/radiant-digital
# (paste the Nginx config from Section 1)

# 5. Enable the site
sudo ln -s /etc/nginx/sites-available/radiant-digital /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 6. Set up SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d radiant.digital -d www.radiant.digital

# 7. Set up firewall
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

---

## 7. Environment Variables

| Variable | Purpose | Where |
|----------|---------|-------|
| `VITE_API_URL` | Backend API endpoint (if any) | `.env.production` |
| `VITE_GA_ID` | Google Analytics tracking ID | `.env.production` |
| `LIQUIDWEB_HOST` | VPS IP / hostname | GitHub Secrets |
| `LIQUIDWEB_USER` | SSH username | GitHub Secrets |
| `LIQUIDWEB_SSH_KEY` | SSH private key | GitHub Secrets |

> Currently no backend API is required. The site is fully static.

---

## 8. Monitoring & Analytics

| Service | Purpose |
|---------|---------|
| **Google Analytics / GA4** | Traffic and engagement |
| **Liquid Web Monitoring** | Server health, CPU, memory, disk (included with VPS) |
| **Cloudflare Analytics** | Request metrics, cache hit ratio (if using Cloudflare) |
| **Uptime Monitor** | UptimeRobot or Pingdom for uptime alerts |
| **Error Tracking** (optional) | Sentry for JS runtime errors |

---

## 9. Security

| Item | Requirement |
|------|-------------|
| **HTTPS** | Enforced via Nginx redirect (see config above) |
| **SSL** | Let's Encrypt (auto-renew via Certbot) or Liquid Web SSL |
| **Content Security Policy** | Set via Nginx response headers |
| **X-Frame-Options** | `SAMEORIGIN` (set in Nginx config) |
| **Firewall** | UFW — allow only ports 80, 443, 22 |
| **SSH Hardening** | Key-only auth, disable root password login |
| **Server Updates** | Enable unattended-upgrades for security patches |
| **DOMPurify** | Already used in app for input sanitization |

### SSH Hardening

```bash
# /etc/ssh/sshd_config
PermitRootLogin prohibit-password
PasswordAuthentication no
PubkeyAuthentication yes
```

---

## 10. Estimated Costs (Monthly) — Liquid Web

| Component | Cost |
|-----------|------|
| **VPS (2 GB RAM, 2 vCPU)** | ~$15-25/mo |
| **SSL Certificate** | Free (Let's Encrypt) |
| **Cloudflare CDN** (optional) | Free tier |
| **CI/CD** | Free (GitHub Actions) |
| **Domain** | ~$12/year (BYO) |
| **Liquid Web Backups** | Included with VPS |
| **Total** | **~$15-25/mo** |

> Liquid Web VPS includes 24/7 support, server monitoring, and nightly backups. Upgrade to 4 GB if running staging + production on the same server.

---

## 11. Deployment Checklist

- [ ] Provision Liquid Web VPS (2 GB RAM minimum)
- [ ] SSH into server and run one-time setup (Section 6)
- [ ] Configure Nginx with the provided config
- [ ] Point DNS A records to VPS IP address
- [ ] Install SSL via Certbot (Let's Encrypt)
- [ ] Add GitHub Secrets (`LIQUIDWEB_HOST`, `LIQUIDWEB_USER`, `LIQUIDWEB_SSH_KEY`)
- [ ] Set up GitHub Actions workflow for auto-deploy
- [ ] Run `npm run build` and verify `dist/` output
- [ ] Deploy and verify live site
- [ ] Enable firewall (UFW) and harden SSH
- [ ] Configure monitoring and analytics
- [ ] Test on desktop, tablet, and mobile
- [ ] Set up uptime monitoring (UptimeRobot or similar)
- [ ] (Optional) Add Cloudflare in front for CDN and DDoS protection

---

## Dependencies Summary

```
Production:  react, react-dom, framer-motion, lucide-react
Dev/Build:   vite, @vitejs/plugin-react, tailwindcss, postcss, autoprefixer
Server:      nginx, certbot (Let's Encrypt)
Optional:    playwright (screenshot testing — not needed in production)
```

---

*Generated: 2026-04-03 | Project: Radiant Digital Website | Branch: Deployment_vesion | Hosting: Liquid Web VPS*
