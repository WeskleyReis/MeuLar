using Microsoft.EntityFrameworkCore;
using MeuLar.API.Data;
using MeuLar.API.Entities;
using MeuLar.API.Features.Relatorios.DTOs;

namespace MeuLar.API.Features.Relatorios.Services;

public class RelatorioService : IRelatorioService
{
    private readonly MeuLarDbContext _context;

    public RelatorioService(MeuLarDbContext context)
    {
        _context = context;
    }

    public async Task<RelatorioTotaisResponse> GetTotaisAsync()
    {
        var pessoas = await _context.Pessoas
            .Include(p => p.Transacoes)
            .AsNoTracking()
            .ToListAsync();

        var resumoPessoas = pessoas.Select(p =>
        {
            var receitas = p.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Receita)
                .Sum(t => t.Valor);

            var despesas = p.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Despesa)
                .Sum(t => t.Valor);

            return new PessoaResumoResponse
            {
                Id = p.Id,
                Nome = p.Nome,
                TotalReceitas = receitas,
                TotalDespesas = despesas,
                Saldo = receitas - despesas
            };
        }).ToList();

        var totalPessoas = resumoPessoas.Count;

        var totalReceitas = resumoPessoas.Sum(p => p.TotalReceitas);

        var totalDespesas = resumoPessoas.Sum(p => p.TotalDespesas);

        var saldo = totalReceitas - totalDespesas;

        return new RelatorioTotaisResponse
        {
            Pessoas = resumoPessoas,
            TotalPessoas = totalPessoas,
            TotalReceitas = totalReceitas,
            TotalDespesas = totalDespesas,
            Saldo = saldo
        };
    }
}
