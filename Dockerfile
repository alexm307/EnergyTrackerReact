FROM node:16.14.2 as builder
WORKDIR /app
COPY ./DS2022_30442_Muresan_Ioan-Alexandru_Assignment_1_frontend/package*.json /app/
RUN npm install
COPY ./DS2022_30442_Muresan_Ioan-Alexandru_Assignment_1_frontend /app/
RUN npm run build


FROM nginx:1.17-alpine
RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.2.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
	

COPY --from=builder /app/nginx.conf /etc/nginx/nginx.template
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
COPY --from=builder /app/build/ /usr/share/nginx/html