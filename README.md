# sockjs-broker
Push SockJS message via HTTP POST.

通过HTTP POST推送消息。


## High Availability and Scalability
- It's a stateless service, so that you could deploy multiple instances behind load balancers, such as nginx.
- It can be configured to push messages over a redis cluster's PubSub mechanic, so that every client can receive messages without concerning which server peer it connects to.

## 高可用性和高可伸缩性
- 它采用无状态服务的方式，所以你可以在负载均衡服务（比如nginx）的后面部署多个实例。
- 它可以被配置成以redis集群的PubSub为底层来推送消息，这样，所有客户端根本不需要考虑连接到了那个部署实例端，就都可以收到消息推送了。

