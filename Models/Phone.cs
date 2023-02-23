namespace Contacts;
using System.Text.Json.Serialization;


public class Phone
{
    public Guid Id { get; set; }
    public string? PhoneNumber { get; set; }
    [JsonIgnore]
    public Contact? Contact { get; set; }

}

