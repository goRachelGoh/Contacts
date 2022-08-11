using Project_2_5;
using Microsoft.EntityFrameworkCore;
namespace Project_2_5.Repositories;

public class ContactRepository : IContactRepository
{
    private ContactsContext context;
    public ContactRepository(ContactsContext context) 
    { 
      this.context = context;  
    }

    async public Task<IList<Contact>> GetContacts()
    {
        return await this.context.Contacts
        // .Include(contact=>contact.Addresses)
        // .Include(contact=>contact.EmailAddresses)
        // .Include(contact=>contact.PhoneNumbers)
        .ToListAsync();
    }

      async public Task<Contact> GetContactbyID(Guid id)
  {
      return await this.context.Contacts
      .Where(contact => contact.Id == id)
      .Include(contact=>contact.Addresses)
      .Include(contact=>contact.EmailAddresses)
      .Include(contact=>contact.PhoneNumbers)
      .FirstAsync();
  }
}