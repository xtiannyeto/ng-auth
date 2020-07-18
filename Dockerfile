FROM node:alpine AS builder

WORKDIR /app

COPY . .
RUN npm config set _authToken 5fff6207-70c4-4773-9bc4-606cbf3a0455
RUN npm config set scope '@otokton', '@otokton:registry':'https://registry.npmjs.org/'
RUN yarn config set cache-folder .yarn
RUN yarn install && \
    npm run build

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
RUN rm -Rf /usr/share/nginx/html/*
COPY conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/* /usr/share/nginx/html/

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'