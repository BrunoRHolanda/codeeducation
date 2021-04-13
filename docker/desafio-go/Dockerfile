FROM golang:latest AS godev

WORKDIR /go/src/app

COPY . .

RUN go mod init github.com/brunoRHolanda/codeeducation/docker/desafio-go
RUN go build

FROM hello-world:linux

COPY --from=godev /go/src/app/desafio-go /desafio-go

ENTRYPOINT ["/desafio-go"]
