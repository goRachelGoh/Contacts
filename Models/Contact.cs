namespace Project_2._5;

public class Contact
{
    public Guid Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public List<Address> Addresses { get; set; }
    public List<Email> EmailAddresses { get; set; }
    public List<Phone> PhoneNumbers { get; set; }
}

