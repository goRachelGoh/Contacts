using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Project_2_5
{
    public class ContactsContext : DbContext
    {
        public ContactsContext()
        {
        }

        public ContactsContext(DbContextOptions<ContactsContext> options)
            : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; } 
        public DbSet<Address> Addresses { get; set; } 
        public DbSet<Phone> PhoneNumbers { get; set; } 
        public DbSet<Email> EmailAddresses { get; set; } 
    }
}
