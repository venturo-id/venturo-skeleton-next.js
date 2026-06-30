# venturo.id — static Figma Sites mirror served by nginx.
FROM nginx:1.27-alpine

# Server block (clean URLs, redirects, caching, gzip, security headers)
COPY docker/default.conf /etc/nginx/conf.d/default.conf

# Site files. .dockerignore excludes backups / git / docs / config dari context.
COPY . /usr/share/nginx/html

# Buang file kerja yang ikut COPY tapi tak boleh diserve.
RUN rm -rf /usr/share/nginx/html/Dockerfile \
           /usr/share/nginx/html/docker \
           /usr/share/nginx/html/.htaccess \
           /usr/share/nginx/html/_redirects \
           /usr/share/nginx/html/vercel.json \
           /usr/share/nginx/html/nginx.conf \
    && find /usr/share/nginx/html -name '*.md' -delete \
    && find /usr/share/nginx/html -name '*.metadesc-bak' -delete

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://127.0.0.1/robots.txt >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
