FROM ubuntu
COPY bootstrap.sh ./
RUN apt-get update && apt-get install -y \
    curl \
    git \