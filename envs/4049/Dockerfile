FROM ruby:2.7.1-alpine3.12

RUN apk add --no-cache gcc libc-dev make && \
    gem install numo-narray -v 0.9.1.6 && \
    apk del gcc libc-dev make

COPY entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]
