using Microsoft.EntityFrameworkCore;
using MeuLar.API.Data;
using MeuLar.API.Entities;
using MeuLar.API.Features.Pessoas.DTOs;

namespace MeuLar.API.Features.Pessoas.Services;

public class PessoaService : IPessoaService
{
    private readonly MeuLarDbContext _context;

    public PessoaService(MeuLarDbContext context)
    {
        _context = context;
    }

    public async Task<PessoaResponse> CreateAsync(CreatePessoaRequest request)
    {

        var pessoa = new Pessoa
        {
            Nome = request.Nome,
            Idade = request.Idade
        };

        await _context.Pessoas.AddAsync(pessoa);

        await _context.SaveChangesAsync();

        return new PessoaResponse
        {
            Id = pessoa.Id,
            Nome = pessoa.Nome,
            Idade = pessoa.Idade
        };
    }

    public async Task<IEnumerable<PessoaResponse>> GetAllAsync()
    {
        var pessoas = await _context.Pessoas
            .AsNoTracking()
            .ToListAsync();

        return pessoas.Select(pessoa => new PessoaResponse
        {
            Id = pessoa.Id,
            Nome = pessoa.Nome,
            Idade = pessoa.Idade
        });
    }

    public async Task DeleteAsync(Guid id)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);

        if (pessoa is null)
        {
            throw new KeyNotFoundException("Pessoa não encontrada.");
        }

        _context.Pessoas.Remove(pessoa);

        await _context.SaveChangesAsync();
    }
}
