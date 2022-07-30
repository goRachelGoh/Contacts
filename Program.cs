using Project_2_5.Repositories;
using Project_2_5;
using Microsoft.EntityFrameworkCore;


internal class Program
{
    private static void Main(string[] args)
    { 

        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddDbContext<ContactsContext>(options =>
         options.UseMySql("server=localhost;port=3306;user=admin;password=UsTerAbLotoP;database=Contacts", Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.8.3-mariadb")));  
        builder.Services.AddScoped<IContactRepository,ContactRepository>();
        builder.Services.AddControllersWithViews();
        
        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");

        app.MapFallbackToFile("index.html"); ;

        app.Run();
    }
}