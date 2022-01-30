FROM sockjs-broker/deps:1.0.0
COPY src /sockjs-broker/src
CMD sh start.sh
