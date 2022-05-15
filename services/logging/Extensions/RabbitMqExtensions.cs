using logging.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;

namespace logging.Extensions
{
    public static class RabbitMqExtensions
    {
        public static void AddRabbitMqConnection(this IServiceCollection collection)
        {
            collection.AddSingleton(sp =>
            {
                var rabbitMqOptions = sp.GetRequiredService<IOptions<RabbitMqConnectionOptions>>().Value;
                var factory = new ConnectionFactory
                {
                    HostName = rabbitMqOptions.Host,
                    Port = rabbitMqOptions.Port,
                    UserName = rabbitMqOptions.User,
                    Password = rabbitMqOptions.Password
                };
                return factory.CreateConnection();
            });
        }

        public static void AddRabbitMqConfiguration(this IServiceCollection collection, IConfiguration configuration)
        {
            collection.Configure<RabbitMqConnectionOptions>(configuration.GetSection("RabbitMqConnection"));
        }
    }
}