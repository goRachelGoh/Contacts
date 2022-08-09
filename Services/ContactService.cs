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

    async public Task<ActionResult<IList<Contact>>> DeleteContact(Guid id)
    {
      var contact = await context.Contacts.FindAsync(id);
      if(contact == null)
      {
        return NotFound();
      }

      context.Contacts.Remove(contact);
      context.SaveChanges();
      return contact;
      
    }
}