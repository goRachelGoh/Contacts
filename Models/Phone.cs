namespace Project_2._5;

public class Phone
{
    public Guid Id { get; set; }
    public string? PhoneNumber { get; set; }
    public Guid ContactId { get; set; }
    public Contact Contact { get; set; }
}

