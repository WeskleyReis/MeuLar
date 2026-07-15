namespace MeuLar.API.Features.Relatorios.DTOs;

public class PessoaResumoResponse
{
    public Guid Id { get; set; }

    public string Nome { get; set; } = string.Empty;

    public decimal TotalReceitas { get; set; }

    public decimal TotalDespesas { get; set; }

    public Decimal Saldo { get; set; }
}
