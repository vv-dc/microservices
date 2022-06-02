using logging.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace logging.Extensions
{
    public static class ConsumerExtensions
    {
        public static void ConfigureUserChangedEventConsumer(this IServiceCollection collection,
            IConfiguration configuration)
        {
            collection.Configure<UserChangedEventConsumerOptions>(
                configuration.GetSection("UserChangedEventConsumerOptions"));
        }
    }
}