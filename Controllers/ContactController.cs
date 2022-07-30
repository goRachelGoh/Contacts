using Microsoft.AspNetCore.Mvc;
using Project_2_5.Repositories;


namespace Project_2_5.Controllers;

[Route("api/contacts")]
public class ContactController : Controller
{
    private readonly ILogger<ContactController> _logger;
    private readonly IContactRepository contactRepository; 

    public ContactController(ILogger<ContactController> logger, IContactRepository contactRepository)
    {
        _logger = logger;
        this.contactRepository = contactRepository;
    }

    [HttpGet]   
    [Route("")]
    public IEnumerable<Contact> Get()
    {
        return this.contactRepository.GetContacts();
    }
}
