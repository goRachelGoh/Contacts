using Microsoft.AspNetCore.Mvc;

namespace Project_2_5.Services;


public interface IContactService 
{
    public Task DeleteContact(Contact contact);
    public Task AddContact(Contact contact);
    
}