﻿using Microsoft.AspNetCore.Mvc;
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
}
