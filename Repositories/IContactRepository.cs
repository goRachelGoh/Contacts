namespace Project_2_5.Repositories;

public interface IContactRepository 
{
    public Task<IList<Contact>> GetContacts();
    
}