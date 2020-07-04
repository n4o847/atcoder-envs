FROM alpine:3.12

RUN apk add --no-cache ruby=~2.7.1 && \
    apk add --no-cache --virtual .build-deps ruby-dev gcc libc-dev make && \
    gem install numo-narray -v 0.9.1.6 && \
    apk del .build-deps

COPY entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]
