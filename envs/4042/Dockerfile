FROM alpine:3.12

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/main' >> /etc/apk/repositories

RUN apk add --no-cache perl~=5.26

COPY entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]
