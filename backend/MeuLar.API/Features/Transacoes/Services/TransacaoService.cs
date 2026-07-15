using Microsoft.EntityFrameworkCore;
using MeuLar.API.Data;
using MeuLar.API.Entities;
using MeuLar.API.Features.Transacoes.DTOs;

namespace MeuLar.API.Features.Transacoes.Services;

public class TransacaoService : ITransacaoService
{
    private readonly MeuLarDbContext _context;

    public TransacaoService(MeuLarDbContext context)
    {
        _context = context;
    }

    public async Task<TransacaoResponse> CreateAsync(CreateTransacaoRequest request)
    {
        var pessoa = await _context.Pessoas.FindAsync(request.PessoaId);

        if (pessoa is null)
        {
            throw new KeyNotFoundException("PEssoa não encontrada.");
        }

        if (pessoa.Idade < 18 && request.Tipo == TipoTransacao.Receita)
        {
            throw new InvalidOperationException(
                "Menores de idade so podem cadastrar despesas.");
        }

        var transacao = new Transacao
        {
            Descricao = request.Descricao,
            Valor = request.Valor,
            Tipo = request.Tipo,
            PessoaId = request.PessoaId
        };

        await _context.Transacoes.AddAsync(transacao);

        await _context.SaveChangesAsync();

        return new TransacaoResponse
        {
            Id = transacao.Id,
            Descricao = transacao.Descricao,
            Valor = transacao.Valor,
            Tipo = transacao.Tipo,
            PessoaId = transacao.PessoaId
        };
    }

    public async Task<IEnumerable<TransacaoResponse>> GetAllAsync()
    {
        var transacao = await _context.Transacoes
            .AsNoTracking()
            .ToListAsync();

        return transacao.Select(transacao => new TransacaoResponse
        {
            Id = transacao.Id,
            Descricao = transacao.Descricao,
            Valor = transacao.Valor,
            Tipo = transacao.Tipo,
            PessoaId = transacao.PessoaId
        });
    }
}
