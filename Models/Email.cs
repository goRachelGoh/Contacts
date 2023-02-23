namespace Contacts;
using System.Text.Json.Serialization;
public class Email
{
    public Guid Id { get; set; }
    public string? EmailAddress { get; set; }

    [JsonIgnore]
    public Contact? Contact { get; set; }
}

