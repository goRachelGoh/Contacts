using Microsoft.AspNetCore.Mvc;

namespace Project_2_5.Services;


public interface IContactService 
{
    public Task<ActionResult<IList<Contact>>> DeleteContact(Guid id);
    
}