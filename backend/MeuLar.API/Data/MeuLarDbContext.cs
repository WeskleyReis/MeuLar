using Microsoft.EntityFrameworkCore;
using MeuLar.API.Entities;

namespace MeuLar.API.Data;

public class MeuLarDbContext : DbContext
{
    public MeuLarDbContext(DbContextOptions<MeuLarDbContext> options)
        : base(options)
    {
    }

    public DbSet<Pessoa> Pessoas { get; set; }

    public DbSet<Transacao> Transacoes { get; set; }
}
