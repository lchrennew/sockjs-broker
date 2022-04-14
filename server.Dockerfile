FROM sockjs-broker/deps:latest
COPY src /sockjs-broker/src
CMD sh start.sh
