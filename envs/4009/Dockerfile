FROM alpine:3.12

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories

RUN apk add --no-cache gawk~=4.1.4

COPY entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]
