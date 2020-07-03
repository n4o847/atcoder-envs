FROM alpine:3.12

RUN apk add --no-cache bc~=1.07.1

COPY entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]
