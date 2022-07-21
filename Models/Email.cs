namespace Project_2._5;

public class Email
{
    public Guid Id { get; set; }
    public string? EmailAddress { get; set; }
    public Guid ContactId { get; set; }
    public Contact Contact { get; set; }
}

