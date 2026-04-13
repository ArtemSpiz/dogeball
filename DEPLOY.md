# Deploy dogeball to production (Linux + nginx)

## Domain and SSL

- **Domains:** `https://www.dogeballtoken.com` and `https://dogeballtoken.com`
- **SSL:** Certbot is configured in `/etc/nginx/sites-available/default` (HTTPS on 443, HTTP→HTTPS redirect on 80).
- **Web root:** `/var/www/dogeball` (nginx serves the built static files from here).

## How to run / update the site

### 1. Build the project

```bash
cd /root/dogeball
npm ci   # or npm install
npm run build
```

This creates the `dist/` folder.

### 2. Deploy the build to the web root

```bash
sudo cp -r /root/dogeball/dist/* /var/www/dogeball/
sudo chown -R www-data:www-data /var/www/dogeball
```

### 3. Reload nginx (only if you changed nginx config)

```bash
sudo nginx -t && sudo systemctl reload nginx
```

No separate Node process is needed: nginx serves the static files directly.

---

## Where the domain and port are configured

| What | Where |
|------|--------|
| **Domain → this server** | DNS A/AAAA records for `dogeballtoken.com` and `www.dogeballtoken.com` point to this server’s IP. |
| **Port 80/443 → nginx** | nginx listens on 80 and 443 (SSL). |
| **Domain → app** | `/etc/nginx/sites-available/default`: `server_name www.dogeballtoken.com dogeballtoken.com` and `root /var/www/dogeball`. |
| **SSL (HTTPS)** | Certbot added certificates and `listen 443 ssl` in the same `default` file. |

So: **domain** and **port** are set in **nginx** (`/etc/nginx/sites-available/default`). There is no separate “redirect port” config; nginx serves the site on 80 and 443 for those hostnames.

---

## One-command deploy (after first-time setup)

```bash
cd /root/dogeball && npm run build && sudo cp -r dist/* /var/www/dogeball/ && sudo chown -R www-data:www-data /var/www/dogeball
```

---

## Renew SSL (Certbot)

Certbot usually installs a cron/systemd timer. To renew manually:

```bash
sudo certbot renew
sudo systemctl reload nginx
```
