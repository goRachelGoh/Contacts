using Project_2_5;
using Microsoft.EntityFrameworkCore;
using System.Linq;
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
        .Include(contact=>contact.Addresses)
        .Include(contact=>contact.EmailAddresses)
        .Include(contact=>contact.PhoneNumbers)
        .ToListAsync();
    }

      async public Task<Contact> GetContactbyID(Guid id)
  {
      return await this.context.Contacts
      .AsNoTracking()
      .Where(contact => contact.Id == id)
      .Include(contact=>contact.Addresses)
      .Include(contact=>contact.EmailAddresses)
      .Include(contact=>contact.PhoneNumbers)
      .FirstAsync();
  }

        async public Task<bool> Duplicate(Contact contact)
  {
       var hasDuplicateName = false;
       var duplicateNameCount = await this.context.Contacts
        .Where(
          dbContact => dbContact.FirstName == contact.FirstName 
          && dbContact.LastName == contact.LastName
        ).CountAsync();
        if (duplicateNameCount >= 1) 
        {
          hasDuplicateName = true;
        }

        var hasDuplicatePhoneNumber = false;

        foreach(Phone phoneNumber in contact?.PhoneNumbers){
          var duplicatePhoneCount = await this.context.PhoneNumbers.Where(
            dbPhoneNumber => dbPhoneNumber.PhoneNumber == phoneNumber.PhoneNumber
          ).CountAsync();
          if (duplicatePhoneCount >= 1) 
          {
            hasDuplicatePhoneNumber = true;
          }
        };

        var hasDuplicateEmail = false;

        foreach(Email emailAddress in contact?.EmailAddresses)
        {
          var duplicateEmailCount = await this.context.EmailAddresses.Where(
            dbEmailAddress => dbEmailAddress.EmailAddress == emailAddress.EmailAddress
          ).CountAsync();
          if (duplicateEmailCount >= 1) 
          {
            hasDuplicateEmail = true;
          }
        };

        // var duplicatePhone = await this.context.Contacts
        //   .Concat(duplicateNameQueryable)
        //   .Include(dbContact => dbContact.PhoneNumbers)
        //   .Select(
        //     dbContact => dbContact.PhoneNumbers.DefaultIfEmpty().Intersect(contact.PhoneNumbers.DefaultIfEmpty())
        //   )
        //   .Select(contactIntersection => contactIntersection.Count() >= 1)
        //   .FirstAsync();

        // var duplicateEmail = await this.context.Contacts
        //   .Concat(duplicateNameQueryable)
        //   .Include(dbContact => dbContact.EmailAddresses)
        //   .Select(
        //     dbContact => dbContact.EmailAddresses.DefaultIfEmpty().Intersect(contact.EmailAddresses.DefaultIfEmpty())
        //   )
        //   .Select(contactIntersection => contactIntersection.Count() >= 1)
        //   .FirstAsync();

        return hasDuplicateName && (hasDuplicatePhoneNumber || hasDuplicateEmail);
  }

  

}