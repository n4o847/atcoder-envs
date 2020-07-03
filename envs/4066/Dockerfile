FROM alpine:3.12

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.8/main' >> /etc/apk/repositories

RUN apk add --no-cache sed~=4.4

COPY entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]
