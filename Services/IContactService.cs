using Microsoft.AspNetCore.Mvc;

namespace Contacts.Services;


public interface IContactService
{
    public Task DeleteContact(Contact contact);

    public Task AddContact(Contact contact);

    public Task UpdateContact(Guid id, Contact contact);

}