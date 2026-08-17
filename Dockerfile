# PL-775 — лендинг марафону «Проявись».
# Двоетапно: Vite/TS збирається в node, віддається nginx-ом. На відміну від
# pl-fe-landing-v2 (де в репо лежить готова статика), тут потрібен реальний білд.
FROM node:20-alpine AS build
WORKDIR /app

# Спершу лише маніфести — шар з npm ci перевикористовується, поки залежності не змінились.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
# CMD успадковується з базового образу.
