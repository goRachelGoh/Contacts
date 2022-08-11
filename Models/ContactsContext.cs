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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Address>()
                .HasOne(e => e.Contact)
                .WithMany(e => e.Addresses)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder
                .Entity<Phone>()
                .HasOne(e => e.Contact)
                .WithMany(e => e.PhoneNumbers)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder
                .Entity<Email>()
                .HasOne(e => e.Contact)
                .WithMany(e => e.EmailAddresses)
                .OnDelete(DeleteBehavior.Restrict);
        }       

        public DbSet<Contact> Contacts { get; set; } 
        public DbSet<Address> Addresses { get; set; } 
        public DbSet<Phone> PhoneNumbers { get; set; } 
        public DbSet<Email> EmailAddresses { get; set; } 

    }
}
