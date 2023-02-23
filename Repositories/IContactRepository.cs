namespace Contacts.Repositories;

public interface IContactRepository
{
    public Task<IList<Contact>> GetContacts();
    public Task<Contact> GetContactbyID(Guid id);
    public Task<bool> Duplicate(Contact contact);

}