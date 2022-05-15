using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using logging.Events.User;

namespace logging.Serialization
{
    public class ChangeTypeConverter : JsonConverter<ChangeType>
    {
        public override ChangeType Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (Enum.TryParse(typeof(ChangeType), reader.GetString(), true, out var result)) return (ChangeType) result;
            throw new ArgumentException($"Failed to deserialize value '{reader.GetString()}' to the ChangeType enum.");
        }

        public override void Write(Utf8JsonWriter writer, ChangeType value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString().ToLower());
        }
    }
}