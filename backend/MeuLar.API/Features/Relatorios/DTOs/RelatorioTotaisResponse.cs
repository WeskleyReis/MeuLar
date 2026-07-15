namespace MeuLar.API.Features.Relatorios.DTOs;

public class RelatorioTotaisResponse
{
    public IEnumerable<PessoaResumoResponse> Pessoas { get; set; }
        = new List<PessoaResumoResponse>();

    public int TotalPessoas { get; set; }

    public decimal TotalReceitas { get; set; }

    public decimal TotalDespesas { get; set; }

    public decimal Saldo { get; set; }
}
