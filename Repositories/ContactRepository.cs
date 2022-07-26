using Project_2_5;

namespace Project_2_5.Repositories;

public class ContactRepository : IContactRepository
{
    private ContactsContext context;
    public ContactRepository(ContactsContext context) 
    { 
      this.context = context;  
    }

    public IList<Contact> GetContacts()
    {
        return this.context.Contacts.ToList();
    }
}