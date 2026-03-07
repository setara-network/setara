FROM golang:1.25-alpine AS builder

RUN apk add --no-cache make gcc musl-dev git

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o /usr/local/bin/setarad ./cmd/setarad

FROM alpine:3.21

RUN apk add --no-cache ca-certificates curl jq bash

COPY --from=builder /usr/local/bin/setarad /usr/local/bin/setarad

EXPOSE 26656 26657 1317 9090

VOLUME /root/.setara

ENTRYPOINT ["setarad"]
CMD ["start"]
