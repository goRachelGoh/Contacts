using Microsoft.AspNetCore.Mvc;
using Project_2_5.Repositories;
using Project_2_5.Services;
using Microsoft.EntityFrameworkCore;

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

    [HttpGet]   
    [Route("{id:Guid}")]
    async public Task<ActionResult<Contact>> Get(Guid id)
    {
        return await this.contactRepository.GetContactbyID(id);
    }

    [HttpDelete]   
    [Route("{id:Guid}")]
    async public Task<ActionResult<Contact>> Delete(Guid id)
    {
        var contact = await contactRepository.GetContactbyID(id);
        if(contact == null)
        {
            return NotFound();
        }
        await this.contactService.DeleteContact(contact);
        return Ok();
    }

    [HttpPost]   
    [Route("")]
    async public Task<ActionResult<Contact>> Post([FromBody] Contact contact)
    {
        contact.Id = Guid.NewGuid();
        if(contact == null)
        {
            return BadRequest();
        }
        await this.contactService.AddContact(contact);
        return Ok();
    }

    [HttpPut]   
    [Route("{id:Guid}")]
    async public Task<ActionResult<Contact>> Put(Guid id, [FromBody] Contact contact)
    {
        var contactToUpdate = await contactRepository.GetContactbyID(id);
        contact.Id = id;
        if (id != contactToUpdate.Id)
        {
            return BadRequest("ID is not matching");
        }
        if (contactToUpdate == null) {
            return BadRequest("Contact Not Found");
        }

        await this.contactService.UpdateContact(id, contact);
        return Ok("Success");
    }

    
    [HttpPost]   
    [Route("duplicate")]
    async public Task<ActionResult<dynamic>> DuplicateCheck([FromBody] Contact contact)
    {
        var result = await this.contactRepository.Duplicate(contact);
        if (result)
        {
           return new { isDuplicatedContact = true };
        }
        return null;
    }
}
