FROM node:alpine AS builder

WORKDIR /app

COPY . .
RUN yarn config set cache-folder .yarn
RUN yarn install && \
    npm run build

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
RUN rm -Rf /usr/share/nginx/html/*
COPY conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/* /usr/share/nginx/html/

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
