using logging.Consumers.User;
using logging.Extensions;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace logging
{
    internal static class Program
    {
        private static void Main(string[] args)
        {
            var host = Host.CreateDefaultBuilder(args)
                .ConfigureServices((ctx, sc) =>
                {
                    var configuration = ctx.Configuration;
                    sc.AddRabbitMqConfiguration(configuration);
                    sc.ConfigureUserChangedEventConsumer(configuration);
                    sc.AddRabbitMqConnection();
                    sc.AddHostedService<UserChangedEventConsumer>();
                })
                .UseSerilog((hostingContext, loggerConfiguration) =>
                {
                    loggerConfiguration.ReadFrom.Configuration(hostingContext.Configuration);
                });

            host.Build().Run();
        }
    }
}