using Microsoft.EntityFrameworkCore;
using MeuLar.API.Data;
using MeuLar.API.Features.Pessoas.Services;
using MeuLar.API.Features.Transacoes.Services;
using MeuLar.API.Features.Relatorios.Services;
using MeuLar.API.Middleware;

var builder = WebApplication.CreateBuilder(args);

var nomeDaPolitica = "MinhaPoliticaCors";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: nomeDaPolitica,
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Controllers
builder.Services.AddControllers();

// Entity Framework + SQLite
builder.Services.AddDbContext<MeuLarDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IPessoaService, PessoaService>();
builder.Services.AddScoped<ITransacaoService, TransacaoService>();
builder.Services.AddScoped<IRelatorioService, RelatorioService>();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

app.UseCors(nomeDaPolitica);

app.MapControllers();

app.Run();
