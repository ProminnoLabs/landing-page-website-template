using System.Net.Mail;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy => policy
        .WithOrigins("http://localhost:5173", "https://prominnolabs.github.io")
        .AllowAnyHeader()
        .AllowAnyMethod()));

var app = builder.Build();
app.UseCors();

app.MapGet("/api/health", () => Results.Ok(new { status = "ok" }));

app.MapPost("/api/contact", (ContactRequest request, ILogger<Program> logger) =>
{
    var errors = Validate(request);
    if (errors.Count > 0)
        return Results.ValidationProblem(errors);

    // TODO: send an email, save to a database or push to your CRM here.
    logger.LogInformation("New enquiry from {Name} <{Email}>", request.Name, request.Email);

    return Results.Ok(new { message = "Thanks! We will get back to you soon." });
});

app.Run();

static Dictionary<string, string[]> Validate(ContactRequest request)
{
    var errors = new Dictionary<string, string[]>();

    if (string.IsNullOrWhiteSpace(request.Name) || request.Name.Length > 100)
        errors["name"] = ["Name is required (max 100 characters)."];

    if (string.IsNullOrWhiteSpace(request.Email) || !MailAddress.TryCreate(request.Email, out _))
        errors["email"] = ["A valid email address is required."];

    if (string.IsNullOrWhiteSpace(request.Message) || request.Message.Length > 2000)
        errors["message"] = ["Message is required (max 2000 characters)."];

    return errors;
}

record ContactRequest(string? Name, string? Email, string? Message);
