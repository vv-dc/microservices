using System;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using logging.Events.User;
using logging.Options;
using logging.Serialization;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace logging.Consumers.User
{
    public class UserChangedEventConsumer : BackgroundService
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly ILogger<UserChangedEventConsumer> _logger;
        private readonly string _queueName;
        private readonly string QueuePrefix = "user-changed-event";

        public UserChangedEventConsumer(IConnection connection, ILogger<UserChangedEventConsumer> logger,
            IOptions<UserChangedEventConsumerOptions> consumerOptions)
        {
            _connection = connection;
            _logger = logger;
            _channel = connection.CreateModel();
            _queueName = QueuePrefix + "-" + Guid.NewGuid();
            _channel.QueueDeclare(_queueName, false, false);
            _channel.QueueBind(_queueName, consumerOptions.Value.ExchangeName, consumerOptions.Value.RoutingKey);
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (ch, ea) =>
            {
                try
                {
                    var content = Encoding.UTF8.GetString(ea.Body.ToArray());
                    var options = new JsonSerializerOptions();
                    options.Converters.Add(new ChangeTypeConverter());
                    var message = JsonSerializer.Deserialize<UserChangedEvent>(content, options);
                    if (message != null)
                    {
                        _logger.LogInformation("User with id {UserId} changed. Change type {ChangeType}", message.Id,
                            message.Type);
                        _channel.BasicAck(ea.DeliveryTag, false);
                    }
                    else
                    {
                        _logger.LogDebug("Failed to deserialize message");
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError("Failed to process message. Reason: {Reason}", ex);
                }
            };

            _channel.BasicConsume(_queueName, false, consumer);

            return Task.CompletedTask;
        }

        public override void Dispose()
        {
            _channel.Close();
            _connection.Close();
            base.Dispose();
        }
    }
}