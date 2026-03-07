FROM node:20-alpine AS build
RUN apk add --no-cache git python3
RUN git clone https://github.com/ping-pub/explorer.git /app
WORKDIR /app
RUN yarn install --frozen-lockfile
COPY chain.json /app/chains/mainnet/setara.json
COPY setara_light.png /app/src/assets/logo.png
COPY setara-icon.png /app/setara-icon.png
COPY customize.sh /app/customize.sh
RUN chmod +x /app/customize.sh && sh /app/customize.sh
RUN sed -i "s|logo.svg|logo.png|g" /app/src/layouts/components/DefaultLayout.vue
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/public/logos /usr/share/nginx/html/logos
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
