using Microsoft.AspNetCore.Mvc;
using Project_2_5.Repositories;
using Project_2_5.Services;


namespace Project_2_5.Controllers;

[ApiController]
[Route("api/contacts")]
public class ContactController : ControllerBase
{
    private readonly ILogger<ContactController> _logger;
    private readonly IContactRepository contactRepository; 
    private readonly IContactService contactService; 

    public ContactController(ILogger<ContactController> logger, IContactRepository contactRepository, IContactService contactService)
    {
        _logger = logger;
        this.contactRepository = contactRepository;
        this.contactService = contactService;
    }

    [HttpGet]   
    [Route("")]
    async public Task<IList<Contact>> Get()
    {
        return await this.contactRepository.GetContacts();
    }

    [HttpDelete]   
    [Route("{id:Guid}")]
    async public Task<IList<Contact>> Delete(Guid id)
    {
        return await this.contactService.DeleteContact(id);
    }
}
