using System.Text.Json.Serialization;

namespace logging.Events.User
{
    public class UserChangedEvent
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("type")] 
        public ChangeType Type { get; set; }
    }
}