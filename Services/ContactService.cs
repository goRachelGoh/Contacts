using Project_2_5;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace Project_2_5.Services;

public class ContactService : IContactService
{
    private ContactsContext context;
    public ContactService(ContactsContext context) 
    { 
      this.context = context;  
    }

    async public Task DeleteContact(Contact contact)
    {
      var transaction = await context.Database.BeginTransactionAsync();
      try 
      {
        context.Addresses.RemoveRange(contact.Addresses);
        await context.SaveChangesAsync(); 
        context.PhoneNumbers.RemoveRange(contact.PhoneNumbers);
        await context.SaveChangesAsync(); 
        context.EmailAddresses.RemoveRange(contact.EmailAddresses);
        await context.SaveChangesAsync();
        context.Contacts.Remove(contact);
        await context.SaveChangesAsync();      

        await context.Database.CommitTransactionAsync();
      }
    catch (Exception)
    {
      await transaction.RollbackAsync();
    }
} 

    async public Task AddContact(Contact contact)
    {
      var transaction = await context.Database.BeginTransactionAsync();
      try 
      {
        await context.Contacts.AddAsync(contact);
        await context.SaveChangesAsync();
      }
      catch (Exception)
      {
        await transaction.RollbackAsync();
      } 
    }
}