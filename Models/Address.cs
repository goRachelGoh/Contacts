namespace Project_2._5;

public class Address
{
    public Guid Id { get; set; }
    public string? StreetAddress { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? ZipCode { get; set; }
    public Guid ContactId { get; set; }
    public Contact Contact { get; set; }
}

